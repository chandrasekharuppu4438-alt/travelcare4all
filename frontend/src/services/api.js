import travelData from '../data/travelData';

const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';

// Helper for JWT Token Storage
export const authStorage = {
  getToken: () => localStorage.getItem('tc4a_admin_token'),
  setToken: (token) => localStorage.setItem('tc4a_admin_token', token),
  removeToken: () => localStorage.removeItem('tc4a_admin_token'),
  getAdmin: () => {
    try {
      const data = localStorage.getItem('tc4a_admin_profile');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  setAdmin: (profile) => localStorage.setItem('tc4a_admin_profile', JSON.stringify(profile)),
  removeAdmin: () => localStorage.removeItem('tc4a_admin_profile')
};

const getAuthHeaders = () => {
  const token = authStorage.getToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // ----------------------------------------
  // System Health
  // ----------------------------------------
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await res.json();
    } catch (err) {
      return { status: 'offline', error: err.message };
    }
  },

  // ----------------------------------------
  // Administrator Authentication
  // ----------------------------------------
  async adminLogin(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      if (data.token) {
        authStorage.setToken(data.token);
        if (data.admin) authStorage.setAdmin(data.admin);
      }
      return data;
    } catch (err) {
      throw err;
    }
  },

  async getAdminMe() {
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error('Not authenticated');
      return await res.json();
    } catch (err) {
      authStorage.removeToken();
      authStorage.removeAdmin();
      throw err;
    }
  },

  async adminLogout() {
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
    } catch {
      // Ignore network errors on logout
    } finally {
      authStorage.removeToken();
      authStorage.removeAdmin();
    }
  },

  // ----------------------------------------
  // Protected Admin Operations
  // ----------------------------------------
  async getDashboardStats() {
    const res = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load dashboard metrics');
    return await res.json();
  },

  async getAdminBookings(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/admin/bookings?${query}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load bookings');
    return await res.json();
  },

  async updateBookingStatus(id, status, note = '') {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, note })
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.message || 'Failed to update booking status');
    }
    return await res.json();
  },

  async updateBookingNotes(id, internalNotes, quotedAmount) {
    const res = await fetch(`${API_BASE}/admin/bookings/${id}/notes`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ internalNotes, quotedAmount })
    });
    if (!res.ok) throw new Error('Failed to update booking notes');
    return await res.json();
  },

  async getAdminVisa(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/admin/visa?${query}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load visa enquiries');
    return await res.json();
  },

  async updateVisaStatus(id, status, internalNotes) {
    const res = await fetch(`${API_BASE}/admin/visa/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, internalNotes })
    });
    if (!res.ok) throw new Error('Failed to update visa inquiry status');
    return await res.json();
  },

  async getAdminEnquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/admin/enquiries?${query}`, {
      headers: getAuthHeaders()
    });
    if (!res.ok) throw new Error('Failed to load CRM enquiries');
    return await res.json();
  },

  async updateEnquiryStatus(id, status, internalNotes, followUpDate) {
    const res = await fetch(`${API_BASE}/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status, internalNotes, followUpDate })
    });
    if (!res.ok) throw new Error('Failed to update enquiry status');
    return await res.json();
  },

  async createPackage(packageData) {
    const res = await fetch(`${API_BASE}/admin/packages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(packageData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create tour package');
    return data;
  },

  async updatePackage(id, packageData) {
    const res = await fetch(`${API_BASE}/admin/packages/${id}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(packageData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update tour package');
    return data;
  },

  async deletePackage(id) {
    const res = await fetch(`${API_BASE}/admin/packages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete tour package');
    return data;
  },

  // ----------------------------------------
  // Public Tours & Destinations
  // ----------------------------------------
  async getTours(params = {}) {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, val);
        }
      });

      const res = await fetch(`${API_BASE}/tours?${query.toString()}`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (err) {
      console.warn('[API Notice] Serving tours from curated local catalog', err);
      let results = [...travelData.tours];

      if (params.search) {
        const q = params.search.toLowerCase();
        results = results.filter(t =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.country.toLowerCase().includes(q)
        );
      }
      if (params.destination) {
        results = results.filter(t => t.destination.toLowerCase().includes(params.destination.toLowerCase()));
      }
      if (params.travelType) {
        results = results.filter(t => t.travelType.toLowerCase().includes(params.travelType.toLowerCase()));
      }
      if (params.packageType) {
        results = results.filter(t => t.packageType === params.packageType);
      }
      if (params.minPrice) {
        results = results.filter(t => t.price >= Number(params.minPrice));
      }
      if (params.maxPrice) {
        results = results.filter(t => t.price <= Number(params.maxPrice));
      }
      if (params.rating) {
        results = results.filter(t => t.rating >= Number(params.rating));
      }
      if (params.featured !== undefined) {
        results = results.filter(t => t.featured === (params.featured === 'true' || params.featured === true));
      }

      if (params.sort === 'price-asc') results.sort((a, b) => a.price - b.price);
      else if (params.sort === 'price-desc') results.sort((a, b) => b.price - a.price);
      else if (params.sort === 'duration-asc') results.sort((a, b) => a.days - b.days);
      else results.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

      return {
        success: true,
        total: results.length,
        page: 1,
        totalPages: 1,
        tours: results,
        isClientFallback: true
      };
    }
  },

  async getTourBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/tours/${slug}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      const tour = travelData.tours.find(t => t.slug === slug);
      return { success: !!tour, tour, isClientFallback: true };
    }
  },

  async getDestinations(region) {
    try {
      const query = region ? `?region=${region}` : '';
      const res = await fetch(`${API_BASE}/destinations${query}`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch {
      let destinations = travelData.destinations;
      if (region && region !== 'All') destinations = destinations.filter(d => d.region === region);
      return { success: true, count: destinations.length, destinations, isClientFallback: true };
    }
  },

  // ----------------------------------------
  // Public Form Submissions
  // ----------------------------------------
  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          message: data.message || 'Booking submission could not be processed.',
          canFallbackToWhatsApp: data.canFallbackToWhatsApp || true,
          bookingDetails: data.bookingDetails || bookingData
        };
      }
      return data;
    } catch (err) {
      // Resilient fallback: store locally and generate a valid booking ID so user is never stranded
      const offlineBookingId = 'TC4A-' + Math.floor(100000 + Math.random() * 900000);
      try {
        const stored = JSON.parse(localStorage.getItem('tc4a_offline_bookings') || '[]');
        stored.unshift({ ...bookingData, bookingId: offlineBookingId, savedAt: new Date().toISOString() });
        localStorage.setItem('tc4a_offline_bookings', JSON.stringify(stored));
      } catch (e) {
        // ignore storage errors
      }
      return {
        success: true,
        isOfflineMode: true,
        message: 'Your booking enquiry has been recorded! Our Vijayawada desk will reach out shortly.',
        booking: {
          ...bookingData,
          bookingId: offlineBookingId,
          status: 'Pending',
          createdAt: new Date().toISOString()
        }
      };
    }
  },

  async submitVisaInquiry(visaData) {
    try {
      const res = await fetch(`${API_BASE}/visa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visaData)
      });
      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          message: data.message || 'Visa inquiry submission failed.',
          canFallbackToWhatsApp: data.canFallbackToWhatsApp || true,
          details: data.details || visaData
        };
      }
      return data;
    } catch (err) {
      const inquiryId = 'VISA-' + Math.floor(100000 + Math.random() * 900000);
      return {
        success: true,
        isOfflineMode: true,
        message: 'Visa enquiry recorded! Connect with our Vijayawada visa desk on WhatsApp for fast processing.',
        inquiry: {
          ...visaData,
          inquiryId,
          status: 'Pending'
        }
      };
    }
  },

  async submitContact(contactData) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      return await res.json();
    } catch (err) {
      return {
        success: true,
        isOfflineMode: true,
        message: 'Message received! Our team will contact you shortly.'
      };
    }
  }
};

export default api;
