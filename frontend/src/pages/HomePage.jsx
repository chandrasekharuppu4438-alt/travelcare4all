import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import QuickSearch from '../components/QuickSearch';
import DestinationsSection from '../components/DestinationsSection';
import FeaturedTours from '../components/FeaturedTours';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsSection from '../components/StatsSection';
import VisaDesk from '../components/VisaDesk';
import Testimonials from '../components/Testimonials';
import GallerySection from '../components/GallerySection';
import FaqSection from '../components/FaqSection';

export default function HomePage({ onSelectTour, onBookTour, onOpenCustomTrip }) {
  const navigate = useNavigate();

  // Quick search navigation with query parameters
  const handleQuickSearch = (criteria) => {
    const params = new URLSearchParams();
    if (criteria.destination) params.set('destination', criteria.destination);
    if (criteria.travelType) params.set('travelType', criteria.travelType);
    if (criteria.from) params.set('from', criteria.from);
    if (criteria.to) params.set('to', criteria.to);
    if (criteria.travellers) params.set('travellers', criteria.travellers);

    navigate(`/tours?${params.toString()}`);
  };

  // Click destination card -> navigate to /tours with filter
  const handleSelectDestination = (destinationName) => {
    navigate(`/tours?destination=${encodeURIComponent(destinationName)}`);
  };

  // Handle service click
  const handleSelectService = (service) => {
    if (service.section) {
      const el = document.getElementById(service.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (service.travelType) {
      navigate(`/tours?travelType=${encodeURIComponent(service.travelType)}`);
    } else {
      onOpenCustomTrip();
    }
  };

  return (
    <div>
      {/* Cinematic Hero */}
      <Hero />

      {/* Interactive Quick Search Bar */}
      <QuickSearch onSearch={handleQuickSearch} />

      {/* Bento Grid Popular Destinations */}
      <DestinationsSection onSelectDestination={handleSelectDestination} />

      {/* 6 Flagship Featured Tours */}
      <FeaturedTours onSelectTour={onSelectTour} onBookTour={onBookTour} />

      {/* Core Services Showcase */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* Why Choose Us & Honeymoon Spotlight */}
      <WhyChooseUs onOpenCustomTrip={onOpenCustomTrip} />

      {/* Verified Stats Bar */}
      <StatsSection />

      {/* Fast Track Visa Desk */}
      <VisaDesk />

      {/* Verified Reviews */}
      <Testimonials />

      {/* Moments from the Road Photo Gallery */}
      <GallerySection />

      {/* FAQs */}
      <FaqSection />
    </div>
  );
}
