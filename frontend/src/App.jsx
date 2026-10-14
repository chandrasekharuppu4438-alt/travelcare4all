import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import LiveBookingSocialProof from './components/LiveBookingSocialProof';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import TourDetailsModal from './components/TourDetailsModal';
import BookingModal from './components/BookingModal';
import BookingsAdminModal from './components/BookingsAdminModal';

// Dedicated Standalone Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import VisaPage from './pages/VisaPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [selectedTourForDetails, setSelectedTourForDetails] = useState(null);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCustomTripOpen, setIsCustomTripOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${isAdminRoute ? 'bg-[#070e17] text-[#f7f9f7]' : 'bg-[#fafbf9] text-[#17231d]'}`}>
      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Global Navbar (Only on Public Pages) */}
      {!isAdminRoute && (
        <Navbar
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenCustomTrip={() => setIsCustomTripOpen(true)}
        />
      )}

      {/* Main Routed Page Content */}
      <main id="main" className="flex-1 flex flex-col w-full">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                onSelectTour={(tour) => setSelectedTourForDetails(tour)}
                onBookTour={(tour) => setSelectedTourForBooking(tour)}
                onOpenCustomTrip={() => setIsCustomTripOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onOpenCustomTrip={() => setIsCustomTripOpen(true)}
              />
            }
          />
          <Route
            path="/services"
            element={
              <ServicesPage
                onOpenCustomTrip={() => setIsCustomTripOpen(true)}
              />
            }
          />
          <Route
            path="/tours"
            element={
              <ToursPage
                onSelectTour={(tour) => setSelectedTourForDetails(tour)}
                onBookTour={(tour) => setSelectedTourForBooking(tour)}
              />
            }
          />
          <Route
            path="/tours/:slug"
            element={
              <TourDetailPage
                onBookTour={(tour) => setSelectedTourForBooking(tour)}
              />
            }
          />
          <Route
            path="/destinations"
            element={<DestinationsPage />}
          />
          <Route
            path="/visa"
            element={<VisaPage />}
          />
          <Route
            path="/gallery"
            element={<GalleryPage />}
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />

          {/* Secure Admin Portal Routes */}
          <Route
            path="/admin/login"
            element={<AdminLoginPage />}
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          {/* Backward compatibility for /admin */}
          <Route
            path="/admin"
            element={<Navigate to="/admin/dashboard" replace />}
          />

          {/* Branded 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Global Footer (Only on Public Pages) */}
      {!isAdminRoute && <Footer onOpenAdmin={() => setIsAdminOpen(true)} />}

      {/* Floating WhatsApp Action Button (Only on Public Pages) */}
      {!isAdminRoute && <WhatsAppFloating />}

      {/* Live Social Proof Notification Toast (Only on Public Pages) */}
      {!isAdminRoute && <LiveBookingSocialProof />}

      {/* Tour Itinerary Details Modal */}
      {selectedTourForDetails && (
        <TourDetailsModal
          tour={selectedTourForDetails}
          onClose={() => setSelectedTourForDetails(null)}
          onBookTour={(tour) => {
            setSelectedTourForDetails(null);
            setSelectedTourForBooking(tour);
          }}
        />
      )}

      {/* Booking Modal */}
      {(selectedTourForBooking || isCustomTripOpen) && (
        <BookingModal
          tour={selectedTourForBooking}
          isOpen={true}
          onClose={() => {
            setSelectedTourForBooking(null);
            setIsCustomTripOpen(false);
          }}
        />
      )}

      {/* Admin Bookings Desk Quick Modal */}
      {isAdminOpen && (
        <BookingsAdminModal
          isOpen={true}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
