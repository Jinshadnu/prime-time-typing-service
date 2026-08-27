import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import FeeEstimator from './components/FeeEstimator';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedServiceForInquiry, setPreselectedServiceForInquiry] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const lenisRef = useRef(null);

  // Initialize Lenis Kinetic Smooth Scroll Engine (Enrico Deiana style fluid momentum)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential weightless easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      lerp: 0.09, // Fluid kinetic inertia
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Sync document title and direction (RTL for Arabic, LTR for English)
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.title = lang === 'ar' 
      ? 'برايم تايم للطباعة | خدمات الطباعة والمعاملات الحكومية - أبوظبي' 
      : 'Prime Time Typing | Professional Typing & Document Clearing - Abu Dhabi';
  }, [lang]);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(elem, { offset: -70, duration: 1.4 });
      } else {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSelectServiceForInquiry = (service) => {
    setPreselectedServiceForInquiry(service);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-[#D4AF37] selection:text-slate-900">
      
      {/* Brand Luxury Splash Screen */}
      {showSplash && (
        <SplashScreen 
          lang={lang} 
          onComplete={() => setShowSplash(false)} 
        />
      )}

      {/* Sticky Header & Navbar */}
      <Navbar 
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenContactModal={() => handleNavigate('contact')}
      />

      {/* Main Website Content Sections */}
      <main className="flex-grow">
        
        {/* Hero Slider with Quick Action Cards */}
        <HeroSlider 
          lang={lang}
          onNavigateSection={handleNavigate}
        />

        {/* About Company & Key Milestones */}
        <AboutSection 
          lang={lang}
        />

        {/* Complete Categorized Services Catalog */}
        <ServicesSection 
          lang={lang}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Interactive Fee & Time Estimator */}
        <FeeEstimator 
          lang={lang}
          onSelectServiceForInquiry={handleSelectServiceForInquiry}
        />

        {/* Client Endorsements & Testimonials */}
        <Testimonials 
          lang={lang}
        />

        {/* Frequently Asked Questions (FAQ) */}
        <FaqSection 
          lang={lang}
        />

        {/* Contact Form, Office Location & Embedded Map */}
        <ContactSection 
          lang={lang}
          preselectedService={preselectedServiceForInquiry}
        />

      </main>

      {/* Footer with Contact Info & Social Links */}
      <Footer 
        lang={lang}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
