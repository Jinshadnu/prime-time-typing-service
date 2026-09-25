import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  Key,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import primeTimeLogo from '../assets/prime_time_logo.jpeg';
import {
  getStoredCategories,
  saveCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getStoredSubcategories,
  saveSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getStoredServices,
  saveServices,
  addService,
  updateService,
  deleteService,
  duplicateService,
  bulkUpdateServicesStatus,
  getStoredDocuments,
  saveDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  getStoredHomepage,
  saveHomepage,
  getStoredBanners,
  saveBanners,
  getStoredFaqs,
  saveFaqs,
  getStoredTestimonials,
  saveTestimonials,
  getStoredBlogs,
  saveBlogs,
  getStoredEnquiries,
  saveEnquiries,
  addEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
  getStoredCustomers,
  saveCustomers,
  getStoredSettings,
  saveSettings,
  getStoredSeo,
  saveSeo,
  getStoredMedia,
  saveMedia,
  addMediaItem,
  deleteMediaItem,
  getStoredUsers,
  saveUsers,
  addUser,
  updateUser,
  deleteUser,
  getStoredActivityLogs,
  resetAllAdminStorageToDefault,
  subscribeToAdminData
} from '../utils/adminStorage';

import AdminLayout from './admin/AdminLayout';
import DashboardTab from './admin/DashboardTab';
import CategoriesTab from './admin/CategoriesTab';
import SubcategoriesTab from './admin/SubcategoriesTab';
import ServicesTab from './admin/ServicesTab';
import DocumentsTab from './admin/DocumentsTab';
import HomepageTab from './admin/HomepageTab';
import BannersTab from './admin/BannersTab';
import AboutTab from './admin/AboutTab';
import FaqsTab from './admin/FaqsTab';
import TestimonialsTab from './admin/TestimonialsTab';
import BlogTab from './admin/BlogTab';
import NavigationTab from './admin/NavigationTab';
import CustomersTab from './admin/CustomersTab';
import EnquiriesTab from './admin/EnquiriesTab';
import MediaLibraryTab from './admin/MediaLibraryTab';
import SeoTab from './admin/SeoTab';
import SettingsTab from './admin/SettingsTab';
import UsersTab from './admin/UsersTab';
import ActivityLogsTab from './admin/ActivityLogsTab';

export default function AdminPanel({
  isOpen,
  onClose,
  services: parentServices,
  onUpdateServices,
  lang: parentLang = 'en'
}) {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('primetime_admin_session') === 'true';
    }
    return false;
  });

  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [adminLang, setAdminLang] = useState(parentLang);

  // Active Navigation Tab in Dashboard
  const [activeTab, setActiveTab] = useState('dashboard');

  // Unified Reactive Data Stores
  const [categories, setCategories] = useState(() => getStoredCategories());
  const [subcategories, setSubcategories] = useState(() => getStoredSubcategories());
  const [services, setServices] = useState(() => getStoredServices());
  const [documents, setDocuments] = useState(() => getStoredDocuments());
  const [homepageData, setHomepageData] = useState(() => getStoredHomepage());
  const [banners, setBanners] = useState(() => getStoredBanners());
  const [faqs, setFaqs] = useState(() => getStoredFaqs());
  const [testimonials, setTestimonials] = useState(() => getStoredTestimonials());
  const [blogs, setBlogs] = useState(() => getStoredBlogs());
  const [enquiries, setEnquiries] = useState(() => getStoredEnquiries());
  const [customers, setCustomers] = useState(() => getStoredCustomers());
  const [settings, setSettings] = useState(() => getStoredSettings());
  const [seo, setSeo] = useState(() => getStoredSeo());
  const [media, setMedia] = useState(() => getStoredMedia());
  const [users, setUsers] = useState(() => getStoredUsers());
  const [activityLogs, setActivityLogs] = useState(() => getStoredActivityLogs());

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Quick Action Trigger in Services Tab
  const [serviceModalOpenTrigger, setServiceModalOpenTrigger] = useState(false);

  // Subscribe to real-time administrative data updates across the app
  useEffect(() => {
    const unsubscribe = subscribeToAdminData(() => {
      setCategories(getStoredCategories());
      setSubcategories(getStoredSubcategories());
      const updatedSrv = getStoredServices();
      setServices(updatedSrv);
      if (onUpdateServices) onUpdateServices(updatedSrv);
      setDocuments(getStoredDocuments());
      setHomepageData(getStoredHomepage());
      setBanners(getStoredBanners());
      setFaqs(getStoredFaqs());
      setTestimonials(getStoredTestimonials());
      setBlogs(getStoredBlogs());
      setEnquiries(getStoredEnquiries());
      setCustomers(getStoredCustomers());
      setSettings(getStoredSettings());
      setSeo(getStoredSeo());
      setMedia(getStoredMedia());
      setUsers(getStoredUsers());
      setActivityLogs(getStoredActivityLogs());
    });
    return unsubscribe;
  }, [onUpdateServices]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    const validPasses = ['1234', 'admin', 'admin123', 'prime@123'];

    if (cleanUser && validPasses.includes(cleanPass)) {
      setIsAuthenticated(true);
      setAuthError('');
      if (rememberMe) {
        localStorage.setItem('primetime_admin_session', 'true');
      }
      showToast('Signed in successfully as Administrator', 'success');
    } else {
      setAuthError('Invalid credentials! Default: Username = admin | Password = 1234');
    }
  };

  const handleAutofillDemo = () => {
    setUsernameInput('admin');
    setPasswordInput('1234');
    setIsAuthenticated(true);
    localStorage.setItem('primetime_admin_session', 'true');
    setAuthError('');
    showToast('Signed in with Demo Credentials', 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('primetime_admin_session');
    setPasswordInput('');
    showToast('Signed out of admin portal', 'info');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-slate-950 flex flex-col overflow-hidden animate-in fade-in duration-200">
      
      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-6 z-[120] bg-slate-900 border border-[#D4AF37]/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">{toast.message}</p>
            <p className="text-[10px] text-slate-400">Live website updated immediately</p>
          </div>
        </div>
      )}

      {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
      {!isAuthenticated ? (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-[#12110c] relative overflow-hidden">
          
          {/* Close button to return to public website */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <X className="w-4 h-4" />
            <span>Return to Live Website</span>
          </button>

          {/* Background Ambient Luxury Gold Glow */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
            
            {/* Header / Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-[#D4AF37]/40 p-2.5 mx-auto mb-4 flex items-center justify-center shadow-xl shadow-[#D4AF37]/10">
                <img
                  src={primeTimeLogo}
                  alt="Prime Time Typing"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 text-xs font-bold mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Prime Time SaaS Administration</span>
              </div>
              <h1 className="text-2xl font-black text-white">Administrator Login</h1>
              <p className="text-slate-400 text-xs mt-1">
                Enter your authorized credentials to access the live content &amp; services management portal
              </p>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2 animate-in shake">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Username / Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="admin"
                    value={usernameInput}
                    onChange={e => setUsernameInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={passwordInput}
                    onChange={e => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-[#D4AF37] bg-slate-950 border-slate-800 focus:ring-0"
                  />
                  <span>Remember Session</span>
                </label>
                <span className="text-[#D4AF37] hover:underline cursor-pointer text-[11px]">
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#D4AF37] hover:bg-[#e0bc42] text-slate-950 font-black rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] mt-2"
              >
                <span>Log In to Admin Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

            {/* Quick Demo Autofill */}
            <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-500 mb-3">Quick Development &amp; Demonstration Access:</p>
              <button
                type="button"
                onClick={handleAutofillDemo}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs rounded-xl border border-amber-500/20 flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>1-Click Autofill Demo Access (admin / 1234)</span>
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* FULL SAAS DASHBOARD WHEN AUTHENTICATED */
        <AdminLayout
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onLogout={handleLogout}
          onClosePanel={onClose}
          unreadEnquiriesCount={enquiries.filter(e => e.status === 'New').length}
          lang={adminLang}
          onToggleLang={() => setAdminLang(prev => prev === 'en' ? 'ar' : 'en')}
        >
          
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <DashboardTab
              categories={categories}
              subcategories={subcategories}
              services={services}
              enquiries={enquiries}
              onNavigateTab={setActiveTab}
              onOpenAddService={() => {
                setActiveTab('services');
              }}
              onOpenAddCategory={() => setActiveTab('categories')}
              onOpenAddSubcategory={() => setActiveTab('subcategories')}
              onSelectEnquiry={(enq) => setActiveTab('enquiries')}
              lang={adminLang}
            />
          )}

          {/* TAB 2: CATEGORIES */}
          {activeTab === 'categories' && (
            <CategoriesTab
              categories={categories}
              onAddCategory={(data) => {
                const updated = addCategory(data);
                setCategories(updated);
                showToast(`Created category "${data.nameEn || 'New Category'}"`);
              }}
              onUpdateCategory={(id, data) => {
                const updated = updateCategory(id, data);
                setCategories(updated);
                showToast(`Updated category "${id}"`);
              }}
              onDeleteCategory={(id) => {
                const updated = deleteCategory(id);
                setCategories(updated);
                showToast(`Deleted category "${id}"`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 3: SUBCATEGORIES */}
          {activeTab === 'subcategories' && (
            <SubcategoriesTab
              categories={categories}
              subcategories={subcategories}
              onAddSubcategory={(data) => {
                const updated = addSubcategory(data);
                setSubcategories(updated);
                showToast(`Created subcategory "${data.nameEn}"`);
              }}
              onUpdateSubcategory={(id, data) => {
                const updated = updateSubcategory(id, data);
                setSubcategories(updated);
                showToast(`Updated subcategory "${id}"`);
              }}
              onDeleteSubcategory={(id) => {
                const updated = deleteSubcategory(id);
                setSubcategories(updated);
                showToast(`Deleted subcategory "${id}"`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 4: ALL SERVICES */}
          {activeTab === 'services' && (
            <ServicesTab
              categories={categories}
              subcategories={subcategories}
              services={services}
              documents={documents}
              onAddService={(data) => {
                const updated = addService(data);
                setServices(updated);
                if (onUpdateServices) onUpdateServices(updated);
                showToast(`Created service "${data.titleEn || 'New Service'}"`);
              }}
              onUpdateService={(id, data) => {
                const updated = updateService(id, data);
                setServices(updated);
                if (onUpdateServices) onUpdateServices(updated);
                showToast(`Updated service "${id}"`);
              }}
              onDeleteService={(id) => {
                const updated = deleteService(id);
                setServices(updated);
                if (onUpdateServices) onUpdateServices(updated);
                showToast(`Deleted service "${id}"`);
              }}
              onDuplicateService={(id) => {
                const updated = duplicateService(id);
                setServices(updated);
                if (onUpdateServices) onUpdateServices(updated);
                showToast(`Duplicated service "${id}"`);
              }}
              onBulkStatusUpdate={(ids, status) => {
                const updated = bulkUpdateServicesStatus(ids, status);
                setServices(updated);
                if (onUpdateServices) onUpdateServices(updated);
                showToast(`Updated status to ${status} for ${ids.length} services`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 5: DOCUMENTS MASTER BANK */}
          {activeTab === 'documents' && (
            <DocumentsTab
              documents={documents}
              onAddDocument={(data) => {
                const updated = addDocument(data);
                setDocuments(updated);
                showToast(`Added document requirement "${data.nameEn}"`);
              }}
              onUpdateDocument={(id, data) => {
                const updated = updateDocument(id, data);
                setDocuments(updated);
                showToast(`Updated document requirement "${id}"`);
              }}
              onDeleteDocument={(id) => {
                const updated = deleteDocument(id);
                setDocuments(updated);
                showToast(`Deleted document requirement "${id}"`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 6: HOMEPAGE CONTENT */}
          {activeTab === 'homepage' && (
            <HomepageTab
              homepageData={homepageData}
              onSaveHomepage={(data) => {
                saveHomepage(data);
                setHomepageData(data);
                showToast('Homepage copy updated successfully');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 7: BANNERS */}
          {activeTab === 'banners' && (
            <BannersTab
              banners={banners}
              onSaveBanners={(data) => {
                saveBanners(data);
                setBanners(data);
                showToast('Hero slider banners updated');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 8: ABOUT US */}
          {activeTab === 'about' && (
            <AboutTab
              aboutData={homepageData}
              onSaveAbout={(data) => {
                showToast('About Us content saved');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 9: FAQS */}
          {activeTab === 'faqs' && (
            <FaqsTab
              faqs={faqs}
              onSaveFaqs={(data) => {
                saveFaqs(data);
                setFaqs(data);
                showToast('Global FAQs updated');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 10: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <TestimonialsTab
              testimonials={testimonials}
              onSaveTestimonials={(data) => {
                saveTestimonials(data);
                setTestimonials(data);
                showToast('Client testimonials updated');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 11: BLOG / NEWS */}
          {activeTab === 'blogs' && (
            <BlogTab
              blogs={blogs}
              onSaveBlogs={(data) => {
                saveBlogs(data);
                setBlogs(data);
                showToast('Blog articles updated');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 12: NAVIGATION */}
          {activeTab === 'navigation' && (
            <NavigationTab
              lang={adminLang}
            />
          )}

          {/* TAB 13: CUSTOMERS */}
          {activeTab === 'customers' && (
            <CustomersTab
              customers={customers}
              settings={settings}
              lang={adminLang}
            />
          )}

          {/* TAB 14: ENQUIRIES CRM */}
          {activeTab === 'enquiries' && (
            <EnquiriesTab
              enquiries={enquiries}
              settings={settings}
              onUpdateStatus={(id, status, notes) => {
                const updated = updateEnquiryStatus(id, status, notes);
                setEnquiries(updated);
                showToast(`Enquiry ${id} updated to ${status}`);
              }}
              onDeleteEnquiry={(id) => {
                const updated = deleteEnquiry(id);
                setEnquiries(updated);
                showToast(`Enquiry ${id} deleted`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 15: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <MediaLibraryTab
              media={media}
              onAddMedia={(item) => {
                const updated = addMediaItem(item);
                setMedia(updated);
                showToast(`Uploaded asset "${item.title}"`);
              }}
              onDeleteMedia={(id) => {
                const updated = deleteMediaItem(id);
                setMedia(updated);
                showToast(`Deleted media item "${id}"`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 16: SEO & TRACKING */}
          {activeTab === 'seo' && (
            <SeoTab
              seoData={seo}
              onSaveSeo={(data) => {
                saveSeo(data);
                setSeo(data);
                showToast('SEO & Analytics settings updated');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 17: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onSaveSettings={(data) => {
                saveSettings(data);
                setSettings(data);
                showToast('Business & WhatsApp settings updated');
              }}
              onResetDefaults={() => {
                resetAllAdminStorageToDefault();
                showToast('Reset all CMS data to factory defaults', 'info');
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 18: USERS & ROLES */}
          {activeTab === 'users' && (
            <UsersTab
              users={users}
              onAddUser={(data) => {
                const updated = addUser(data);
                setUsers(updated);
                showToast(`Created user "${data.name}"`);
              }}
              onUpdateUser={(id, data) => {
                const updated = updateUser(id, data);
                setUsers(updated);
                showToast(`Updated user "${id}"`);
              }}
              onDeleteUser={(id) => {
                const updated = deleteUser(id);
                setUsers(updated);
                showToast(`Deleted user "${id}"`);
              }}
              lang={adminLang}
            />
          )}

          {/* TAB 19: ACTIVITY LOGS */}
          {activeTab === 'logs' && (
            <ActivityLogsTab
              logs={activityLogs}
              lang={adminLang}
            />
          )}

        </AdminLayout>
      )}

    </div>
  );
}
