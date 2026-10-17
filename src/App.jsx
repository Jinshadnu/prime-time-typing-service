import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import {
  getStoredServices,
  getStoredCategories,
  getStoredBanners,
  getStoredAbout,
  getStoredSeo,
  subscribeToAdminData
} from './utils/adminStorage';

export default function App() {
  const [lang, setLang] = useState('en');
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedServiceForInquiry, setPreselectedServiceForInquiry] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  // URL route & hash checker to auto-open Admin Panel on /admin, /login, #admin, ?admin
  const checkIsAdminUrl = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path.includes('/admin') ||
      path.includes('/login') ||
      hash.includes('admin') ||
      hash.includes('login') ||
      search.includes('admin') ||
      search.includes('login')
    );
  };

  // Dynamic Services & Admin Portal state
  const [services, setServices] = useState(() => getStoredServices());
  const [categories, setCategories] = useState(() => getStoredCategories());
  const [banners, setBanners] = useState(() => getStoredBanners());
  const [aboutData, setAboutData] = useState(() => getStoredAbout());
  const [seoData, setSeoData] = useState(() => getStoredSeo());
  const [isAdminOpen, setIsAdminOpen] = useState(() => checkIsAdminUrl());

  useEffect(() => {
    const unsubscribe = subscribeToAdminData(() => {
      setServices(getStoredServices());
      setCategories(getStoredCategories());
      setBanners(getStoredBanners());
      setAboutData(getStoredAbout());
      setSeoData(getStoredSeo());
    });
    return unsubscribe;
  }, []);

  const lenisRef = useRef(null);

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  // Listen to URL changes (history popstate / hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      if (checkIsAdminUrl()) {
        setIsAdminOpen(true);
        setShowSplash(false);
      }
    };

    if (checkIsAdminUrl()) {
      setShowSplash(false);
    }

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleOpenAdmin = () => {
    setIsAdminOpen(true);
    setShowSplash(false);
    if (!window.location.hash.includes('admin') && !window.location.pathname.includes('/admin')) {
      try {
        window.history.pushState({}, '', '#admin');
      } catch (err) {
        // Fallback for strict browser origins
      }
    }
  };

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash.includes('admin') || window.location.hash.includes('login')) {
      try {
        window.history.pushState({}, '', window.location.pathname);
      } catch (err) { }
    } else if (window.location.pathname.includes('/admin') || window.location.pathname.includes('/login')) {
      try {
        window.history.pushState({}, '', '/');
      } catch (err) { }
    }
  };

  // Manage body scroll & Lenis when Admin Panel is open to prevent background bleed/scroll
  useEffect(() => {
    if (isAdminOpen) {
      document.body.style.overflow = 'hidden';
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = '';
      if (lenisRef.current) lenisRef.current.start();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isAdminOpen]);

  // Initialize Lenis Smooth Scroll Engine (Only on desktop to prevent mobile touch scrolling freeze)
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) {
      return; // Use native browser smooth scrolling on mobile
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      lerp: 0.09,
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

  // Sync SEO metadata, document title, and direction (RTL for Arabic, LTR for English)
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    const defaultArTitle = 'برايم تايم للطباعة | خدمات الطباعة والمعاملات الحكومية - أبوظبي';
    const defaultEnTitle = 'Prime Time Typing Services | Professional Typing & Document Clearing - Abu Dhabi';
    const defaultArDesc = 'مركز طباعة وتخليص معاملات حكومية معتمد في أبوظبي. إنجاز فوري لمعاملات تسهيل، وزارة الموارد البشرية، الهيئة الاتحادية للهوية والجنسية، تم، والتوثيق.';
    const defaultEnDesc = 'Authorized UAE government typing and corporate document clearance center in Abu Dhabi. Fast processing for Tasheel, MOHRE Labour Permits, ICP Residency Visas, Emirates ID, Tamm Portal, ADJD, Medical Fitness & MOFA Attestation.';

    const pageTitle = lang === 'ar' ? defaultArTitle : (seoData?.globalTitle || defaultEnTitle);
    const metaDesc = lang === 'ar' ? defaultArDesc : (seoData?.globalDescription || defaultEnDesc);
    const keywords = seoData?.keywords || 'typing center abu dhabi, prime time typing, tasheel abu dhabi, mohre labour card, emirates id typing, icp visa residency, tamm services, medical fitness typing, document clearing uae, madinat zayed typing center';
    const ogImage = seoData?.ogImage || 'https://primetimetypingservice.com/prime_time_logo.jpeg';

    document.title = pageTitle;

    const updateMetaTag = (selector, content) => {
      if (!content) return;
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMetaTag('meta[name="description"]', metaDesc);
    updateMetaTag('meta[id="seo-meta-desc"]', metaDesc);
    updateMetaTag('meta[name="keywords"]', keywords);
    updateMetaTag('meta[id="seo-meta-keywords"]', keywords);
    updateMetaTag('meta[property="og:title"]', pageTitle);
    updateMetaTag('meta[id="seo-og-title"]', pageTitle);
    updateMetaTag('meta[property="og:description"]', metaDesc);
    updateMetaTag('meta[id="seo-og-desc"]', metaDesc);
    updateMetaTag('meta[property="og:image"]', ogImage);
    updateMetaTag('meta[id="seo-og-image"]', ogImage);
    updateMetaTag('meta[name="twitter:title"]', pageTitle);
    updateMetaTag('meta[id="seo-twitter-title"]', pageTitle);
    updateMetaTag('meta[name="twitter:description"]', metaDesc);
    updateMetaTag('meta[id="seo-twitter-desc"]', metaDesc);
    updateMetaTag('meta[name="twitter:image"]', ogImage);
    updateMetaTag('meta[id="seo-twitter-image"]', ogImage);

    if (seoData?.googleSearchConsole) {
      updateMetaTag('meta[name="google-site-verification"]', seoData.googleSearchConsole);
      updateMetaTag('meta[id="seo-google-verification"]', seoData.googleSearchConsole);
    }

    // Google Analytics 4 Script Injection if Measurement ID configured
    if (seoData?.googleAnalyticsId && typeof window !== 'undefined') {
      const gaId = seoData.googleAnalyticsId.trim();
      if (/^G-[A-Z0-9]+$/i.test(gaId) && !document.getElementById('google-analytics-script')) {
        const script = document.createElement('script');
        script.id = 'google-analytics-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
        document.head.appendChild(script);

        const inlineScript = document.createElement('script');
        inlineScript.id = 'google-analytics-config';
        inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}');
        `;
        document.head.appendChild(inlineScript);
      }
    }
  }, [lang, seoData]);

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
      {showSplash && !isAdminOpen && (
        <SplashScreen
          lang={lang}
          onComplete={handleSplashComplete}
        />
      )}

      {/* Sticky Header & Navbar (Hidden when Admin Panel is open) */}
      {!isAdminOpen && (
        <Navbar
          lang={lang}
          setLang={setLang}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onOpenContactModal={() => handleNavigate('contact')}
          onOpenAdmin={handleOpenAdmin}
        />
      )}

      {/* Main Website Content Sections */}
      <main className="flex-grow">

        {/* Hero Slider with Quick Action Cards */}
        <HeroSlider
          lang={lang}
          banners={banners}
          onNavigateSection={handleNavigate}
        />

        {/* About Company & Key Milestones */}
        <AboutSection
          lang={lang}
          aboutData={aboutData}
        />

        {/* Complete Categorized Services Catalog */}
        <ServicesSection
          lang={lang}
          services={services}
          categories={categories}
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
          services={services}
          categories={categories}
          preselectedService={preselectedServiceForInquiry}
        />

      </main>

      {/* Footer with Contact Info & Social Links */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Admin Panel Modal Overlay */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={handleCloseAdmin}
        services={services}
        onUpdateServices={(newServices) => setServices(newServices)}
        lang={lang}
      />


    </div>
  );
}


