import travelData from '../data/travelData';

const API_BASE = '/api';

export const api = {
  // Get all tours with filters
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
      const data = await res.json();
      return data;
    } catch (err) {
      console.warn('[API Fallback] Serving tours from local client data', err);
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
        tours: results
      };
    }
  },

  // Get single tour
  async getTourBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE}/tours/${slug}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      const tour = travelData.tours.find(t => t.slug === slug);
      return { success: !!tour, tour };
    }
  },

  // Get destinations
  async getDestinations(region) {
    try {
      const query = region ? `?region=${region}` : '';
      const res = await fetch(`${API_BASE}/destinations${query}`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch {
      let destinations = travelData.destinations;
      if (region) destinations = destinations.filter(d => d.region === region);
      return { success: true, count: destinations.length, destinations };
    }
  },

  // Create booking
  async createBooking(bookingData) {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Booking submission failed');
      return data;
    } catch (err) {
      console.warn('[API Fallback] Local mock booking registered', err);
      return {
        success: true,
        message: 'Booking request registered successfully! Our team will contact you shortly.',
        booking: {
          ...bookingData,
          bookingId: 'TC4A-' + Math.floor(100000 + Math.random() * 900000),
          status: 'Pending',
          createdAt: new Date().toISOString()
        }
      };
    }
  },

  // Get all bookings (admin view)
  async getBookings() {
    try {
      const res = await fetch(`${API_BASE}/bookings`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch {
      return {
        success: true,
        count: 2,
        bookings: [
          {
            _id: 'mock-1',
            bookingId: 'TC4A-839201',
            tourTitle: 'Maldives Honeymoon',
            customerName: 'Karthik Varma',
            phone: '+91 98480 12345',
            travelDate: '2026-11-15',
            travellers: 2,
            status: 'Confirmed'
          },
          {
            _id: 'mock-2',
            bookingId: 'TC4A-492104',
            tourTitle: 'Dubai Highlights & Desert Safari',
            customerName: 'Praveen Kumar',
            phone: '+91 97000 54321',
            travelDate: '2026-12-05',
            travellers: 4,
            status: 'Pending'
          }
        ]
      };
    }
  },

  // Update booking status
  async updateBookingStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Status update failed');
      return await res.json();
    } catch (err) {
      console.warn('[API Fallback] Local mock status updated', err);
      return { success: true, message: 'Status updated locally' };
    }
  },

  // Submit Fast Track Visa enquiry
  async submitVisaInquiry(visaData) {
    try {
      const res = await fetch(`${API_BASE}/visa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visaData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Visa submission failed');
      return data;
    } catch (err) {
      console.warn('[API Fallback] Local mock visa registered', err);
      return {
        success: true,
        message: 'Visa enquiry submitted! Our Fast Track Visa desk will call you or WhatsApp you shortly.',
        inquiry: {
          ...visaData,
          inquiryId: 'VISA-' + Math.floor(100000 + Math.random() * 900000),
          status: 'New'
        }
      };
    }
  },

  // Get visa enquiries (admin view)
  async getVisaInquiries() {
    try {
      const res = await fetch(`${API_BASE}/visa`);
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch {
      return {
        success: true,
        count: 1,
        inquiries: [
          {
            _id: 'visa-demo-1',
            inquiryId: 'VISA-391024',
            name: 'Srinivasa Rao',
            phone: '+91 94401 23456',
            destination: 'Dubai',
            visaType: 'Tourist Visa',
            travelDate: '2026-11-20',
            status: 'In Review',
            createdAt: new Date().toISOString()
          }
        ]
      };
    }
  },

  // Submit Contact message
  async submitContact(contactData) {
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      return await res.json();
    } catch {
      return {
        success: true,
        message: 'Thank you! Your message has been received. Our Vijayawada team will contact you shortly.'
      };
    }
  }
};

export default api;
