import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloating from './components/WhatsAppFloating';
import ScrollToTop from './components/ScrollToTop';
import TourDetailsModal from './components/TourDetailsModal';
import BookingModal from './components/BookingModal';
import BookingsAdminModal from './components/BookingsAdminModal';

// Dedicated Separate Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ToursPage from './pages/ToursPage';
import TourDetailPage from './pages/TourDetailPage';
import DestinationsPage from './pages/DestinationsPage';
import VisaPage from './pages/VisaPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const [selectedTourForDetails, setSelectedTourForDetails] = useState(null);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isCustomTripOpen, setIsCustomTripOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1612] text-[#17231d]">
      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Global Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenCustomTrip={() => setIsCustomTripOpen(true)}
      />

      {/* Main Routed Page Content */}
      <main id="main" className="flex-1">
        <Routes>
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
          <Route
            path="/admin"
            element={<AdminPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloating />

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

      {/* Admin Bookings Desk Modal */}
      {isAdminOpen && (
        <BookingsAdminModal
          isOpen={true}
          onClose={() => setIsAdminOpen(false)}
        />
      )}
    </div>
  );
}
