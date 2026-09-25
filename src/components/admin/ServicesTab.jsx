import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  Star,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  FolderTree,
  Layers,
  Sparkles,
  ArrowUpDown,
  Filter,
  Eye,
  Check,
  X,
  ExternalLink,
  HelpCircle,
  FileCheck2,
  DollarSign,
  Clock,
  ChevronDown,
  LayoutGrid,
  List
} from 'lucide-react';
import MediaPickerModal from './MediaPickerModal';
import DeleteConfirmModal from './DeleteConfirmModal';

const AVAILABLE_ICONS = [
  'Briefcase', 'CreditCard', 'FileCheck2', 'Home', 'Users', 'Plane',
  'ShieldCheck', 'Globe', 'Building2', 'Crown', 'Car', 'Sparkles',
  'FileBadge', 'BadgeCheck', 'IdCard', 'Languages', 'MapPin', 'Clock',
  'FileSpreadsheet', 'Activity', 'Award', 'FileText'
];

export default function ServicesTab({
  categories,
  subcategories,
  services,
  documents,
  onAddService,
  onUpdateService,
  onDeleteService,
  onDuplicateService,
  onBulkStatusUpdate,
  lang = 'en'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Selection for Bulk Actions
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('basic'); // 'basic' | 'pricing' | 'documents' | 'faqs' | 'display'
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Form Initial State
  const initialFormState = {
    categoryId: categories[0]?.id || 'tasheel',
    subcategoryId: '',
    titleEn: '',
    titleAr: '',
    slug: '',
    shortDescEn: '',
    shortDescAr: '',
    descEn: '',
    descAr: '',
    detailedDescEn: '',
    detailedDescAr: '',
    icon: 'Briefcase',
    image: '',
    govtFee: 200,
    typingFee: 50,
    estimatedCostStandard: 250,
    estimatedCostExpress: 350,
    govtFeeRangeEn: 'AED 200 - 450',
    govtFeeRangeAr: '200 - 450 درهم',
    processingTimeEn: '24-48 Hours',
    processingTimeAr: '24 - 48 ساعة',
    eligibilityEn: 'Valid UAE Resident or Registered Entity',
    eligibilityAr: 'مقيم داخل الدولة أو منشأة مسجلة أصولاً',
    procedureEn: '1. Document submission\n2. Portal application typing\n3. Government fee payment\n4. Official approval and issuance',
    procedureAr: '1. استلام المستندات\n2. الطباعة الإلكترونية\n3. سداد الرسوم الحكومية\n4. اعتماد وإصدار المعاملة',
    importantNotesEn: 'All passport copies must be valid for at least 6 months.',
    importantNotesAr: 'يجب أن تكون صور جواز السفر سارية لمدة 6 أشهر على الأقل.',
    requirementsEn: ['Passport Copy (Valid 6+ Months)', 'Personal Photograph (White Background)', 'Emirates ID Copy'],
    requirementsAr: ['صورة جواز السفر (ساري 6 أشهر)', 'صورة شخصية بخلفية بيضاء', 'صورة بطاقة الهوية'],
    faqs: [
      {
        question: { en: 'What documents are required for this service?', ar: 'ما هي المستندات المطلوبة لهذه المعاملة؟' },
        answer: { en: 'Valid Emirates ID and clear passport copy with 6+ months validity.', ar: 'صورة الهوية الإماراتية وجواز السفر ساري لمدة 6 أشهر على الأقل.' }
      },
      {
        question: { en: 'How long does the process take?', ar: 'كم يستغرق إنجاز المعاملة؟' },
        answer: { en: 'Standard processing takes 24 to 48 business hours.', ar: 'يستغرق الإنجاز العادي من 24 إلى 48 ساعة عمل.' }
      }
    ],
    featured: false,
    popular: false,
    displayOrder: services.length + 1,
    status: 'active'
  };

  const [formData, setFormData] = useState(initialFormState);

  // Subcategories filtered by selected Category in Form
  const formAvailableSubcategories = subcategories.filter(s => s.categoryId === formData.categoryId);

  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      ...initialFormState,
      categoryId: categoryFilter !== 'all' ? categoryFilter : (categories[0]?.id || 'tasheel'),
      displayOrder: services.length + 1
    });
    setActiveFormTab('basic');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (service) => {
    const stdCost = Number(service.estimatedCostStandard) || (Number(service.govtFee || 0) + Number(service.typingFee || 0)) || 250;
    const gFee = service.govtFee !== undefined ? Number(service.govtFee) : Math.round(stdCost * 0.7);
    const tFee = service.typingFee !== undefined ? Number(service.typingFee) : Math.round(stdCost * 0.3);
    const expCost = Number(service.estimatedCostExpress) || (stdCost + 100);

    setEditingService(service);
    setFormData({
      categoryId: service.categoryId || categories[0]?.id || 'tasheel',
      subcategoryId: service.subcategoryId || '',
      titleEn: service.title?.en || '',
      titleAr: service.title?.ar || '',
      slug: service.slug || service.id,
      shortDescEn: service.shortDesc?.en || service.desc?.en || '',
      shortDescAr: service.shortDesc?.ar || service.desc?.ar || '',
      descEn: service.desc?.en || '',
      descAr: service.desc?.ar || '',
      detailedDescEn: service.detailedDesc?.en || service.desc?.en || '',
      detailedDescAr: service.detailedDesc?.ar || service.desc?.ar || '',
      icon: service.icon || 'Briefcase',
      image: service.image || '',
      govtFee: gFee,
      typingFee: tFee,
      estimatedCostStandard: stdCost,
      estimatedCostExpress: expCost,
      govtFeeRangeEn: service.govtFeeRange?.en || `AED ${stdCost}`,
      govtFeeRangeAr: service.govtFeeRange?.ar || `${stdCost} درهم`,
      processingTimeEn: service.processingTime?.en || '24-48 Hours',
      processingTimeAr: service.processingTime?.ar || '24 - 48 ساعة',
      eligibilityEn: service.eligibility?.en || '',
      eligibilityAr: service.eligibility?.ar || '',
      procedureEn: service.procedure?.en || '',
      procedureAr: service.procedure?.ar || '',
      importantNotesEn: service.importantNotes?.en || '',
      importantNotesAr: service.importantNotes?.ar || '',
      requirementsEn: Array.isArray(service.requirements?.en)
        ? service.requirements.en
        : (service.requirements?.en ? service.requirements.en.split('\n') : []),
      requirementsAr: Array.isArray(service.requirements?.ar)
        ? service.requirements.ar
        : (service.requirements?.ar ? service.requirements.ar.split('\n') : []),
      faqs: Array.isArray(service.faqs) ? service.faqs : [],
      featured: Boolean(service.featured),
      popular: Boolean(service.popular),
      displayOrder: service.displayOrder || 1,
      status: service.status || 'active'
    });
    setActiveFormTab('basic');
    setIsFormOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.titleEn && !formData.titleAr) return;

    if (editingService) {
      onUpdateService(editingService.id, formData);
    } else {
      onAddService(formData);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (service) => {
    setServiceToDelete(service);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      onDeleteService(serviceToDelete.id);
      setIsDeleteOpen(false);
      setServiceToDelete(null);
    }
  };

  const handleToggleStatus = (service) => {
    const nextStatus = service.status === 'active' ? 'inactive' : 'active';
    onUpdateService(service.id, { status: nextStatus });
  };

  const handleToggleFeatured = (service) => {
    onUpdateService(service.id, { featured: !service.featured });
  };

  // Bulk Actions
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedServiceIds(filteredServices.map(s => s.id));
    } else {
      setSelectedServiceIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedServiceIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Helper for Category and Subcategory labels
  const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name?.en : catId;
  };

  const getSubcategoryName = (subId) => {
    const sub = subcategories.find(s => s.id === subId);
    return sub ? sub.name?.en : null;
  };

  // Filter Services
  const filteredServices = services.filter(srv => {
    const matchesSearch =
      srv.title?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.title?.ar?.includes(searchTerm) ||
      srv.desc?.en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.slug?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = categoryFilter === 'all' || srv.categoryId === categoryFilter;
    const matchesSub = subcategoryFilter === 'all' || srv.subcategoryId === subcategoryFilter;
    const matchesStatus = statusFilter === 'all' || srv.status === statusFilter;
    const matchesFeatured = featuredFilter === 'all' || 
      (featuredFilter === 'featured' ? srv.featured : !srv.featured);

    return matchesSearch && matchesCat && matchesSub && matchesStatus && matchesFeatured;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#D4AF37]" />
            <span>All Services Management ({services.length})</span>
          </h2>
          <p className="text-xs text-slate-400">
            Create, update fees, documents checklist, service FAQs, and manage live website visibility
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 text-xs font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services (e.g. Work Permit, Golden Visa)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            <select
              value={categoryFilter}
              onChange={e => {
                setCategoryFilter(e.target.value);
                setSubcategoryFilter('all');
              }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Departments ({categories.length})</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name?.en}</option>
              ))}
            </select>

            {categoryFilter !== 'all' && (
              <select
                value={subcategoryFilter}
                onChange={e => setSubcategoryFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="all">All Subcategories</option>
                {subcategories.filter(s => s.categoryId === categoryFilter).map(s => (
                  <option key={s.id} value={s.id}>{s.name?.en}</option>
                ))}
              </select>
            )}

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>

            <select
              value={featuredFilter}
              onChange={e => setFeaturedFilter(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Visibility</option>
              <option value="featured">Featured On Home</option>
              <option value="standard">Standard</option>
            </select>
          </div>

        </div>

        {/* Bulk Actions Row */}
        {selectedServiceIds.length > 0 && (
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between text-xs animate-in fade-in">
            <span className="font-semibold text-amber-300">
              {selectedServiceIds.length} service(s) selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onBulkStatusUpdate(selectedServiceIds, 'active');
                  setSelectedServiceIds([]);
                }}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold"
              >
                Set Active
              </button>
              <button
                onClick={() => {
                  onBulkStatusUpdate(selectedServiceIds, 'inactive');
                  setSelectedServiceIds([]);
                }}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold"
              >
                Set Inactive
              </button>
              <button
                onClick={() => setSelectedServiceIds([])}
                className="px-2 py-1 text-slate-400 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Services Table or Grid */}
      {viewMode === 'table' ? (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs">
              <thead>
                <tr className="bg-slate-950/80 text-slate-400 border-b border-slate-800">
                  <th className="py-3 px-3 text-center">
                    <input
                      type="checkbox"
                      checked={filteredServices.length > 0 && selectedServiceIds.length === filteredServices.length}
                      onChange={handleSelectAll}
                      className="w-3.5 h-3.5 rounded text-[#D4AF37] bg-slate-950 border-slate-800"
                    />
                  </th>
                  <th className="py-3 px-3 text-start font-semibold">Service Name (EN / AR)</th>
                  <th className="py-3 px-3 text-start font-semibold">Hierarchy (Category &gt; Sub)</th>
                  <th className="py-3 px-3 text-start font-semibold">Standard Fee</th>
                  <th className="py-3 px-3 text-start font-semibold">Processing</th>
                  <th className="py-3 px-3 text-center font-semibold">Featured</th>
                  <th className="py-3 px-3 text-center font-semibold">Status</th>
                  <th className="py-3 px-3 text-end font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-12 text-center text-slate-500">
                      No services found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map(srv => {
                    const isSelected = selectedServiceIds.includes(srv.id);
                    const subName = getSubcategoryName(srv.subcategoryId);

                    return (
                      <tr key={srv.id} className={`hover:bg-slate-800/40 transition-colors group ${isSelected ? 'bg-amber-500/5' : ''}`}>
                        
                        <td className="py-3 px-3 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectOne(srv.id)}
                            className="w-3.5 h-3.5 rounded text-[#D4AF37] bg-slate-950 border-slate-800"
                          />
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#D4AF37] border border-amber-500/20 flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 max-w-xs">
                              <p className="font-bold text-white truncate">{srv.title?.en || srv.title}</p>
                              <p className="text-slate-400 text-[11px] font-arabic truncate">{srv.title?.ar || '—'}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-semibold text-amber-300 text-[11px] uppercase">
                              {getCategoryName(srv.categoryId)}
                            </span>
                            {subName && (
                              <span className="text-slate-400 text-[10px] flex items-center gap-1">
                                <FolderTree className="w-3 h-3 text-emerald-400" />
                                <span>{subName}</span>
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="font-mono font-bold text-white">
                            AED {srv.estimatedCostStandard || srv.govtFee || 250}
                          </span>
                        </td>

                        <td className="py-3 px-3 text-slate-300 text-[11px] whitespace-nowrap">
                          {srv.processingTime?.en || '24-48 Hours'}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleToggleFeatured(srv)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              srv.featured ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-600 hover:text-slate-400'
                            }`}
                            title={srv.featured ? 'Featured on Website' : 'Not Featured'}
                          >
                            <Star className={`w-3.5 h-3.5 ${srv.featured ? 'fill-amber-300' : ''}`} />
                          </button>
                        </td>

                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={() => handleToggleStatus(srv)}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors inline-flex items-center gap-1 ${
                              srv.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${srv.status === 'active' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                            <span>{srv.status === 'active' ? 'Active' : 'Inactive'}</span>
                          </button>
                        </td>

                        <td className="py-3 px-3 text-end">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => onDuplicateService(srv.id)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                              title="Duplicate Service"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(srv)}
                              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700"
                              title="Edit Service"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenDelete(srv)}
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300 hover:bg-red-500/20"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map(srv => (
            <div
              key={srv.id}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between shadow-lg group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-[#D4AF37] border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider truncate">
                    {getCategoryName(srv.categoryId)}
                  </span>
                  <div className="flex items-center gap-1">
                    {srv.featured && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                    <span className={`w-2 h-2 rounded-full ${srv.status === 'active' ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                  </div>
                </div>

                <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                  {srv.title?.en || srv.title}
                </h3>
                <p className="text-slate-400 text-xs font-arabic mb-3 line-clamp-1">
                  {srv.title?.ar}
                </p>

                <p className="text-slate-400 text-xs line-clamp-2 mb-4">
                  {srv.shortDesc?.en || srv.desc?.en}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block">Fee Range</span>
                  <span className="text-xs font-mono font-bold text-white">
                    AED {srv.estimatedCostStandard || srv.govtFee || 250}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDuplicateService(srv.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(srv)}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Comprehensive Add/Edit Service Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 text-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#D4AF37] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {editingService ? 'Edit Government Service' : 'Add New Government Service'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Configure service details, fees, requirements checklist, and service FAQs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Section Tabs */}
            <div className="px-5 pt-3 pb-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
              {[
                { id: 'basic', label: '1. Basic Info' },
                { id: 'pricing', label: '2. Pricing & Speed' },
                { id: 'documents', label: `3. Documents (${formData.requirementsEn.length})` },
                { id: 'faqs', label: `4. Service FAQs (${formData.faqs.length})` },
                { id: 'display', label: '5. Display & Status' }
              ].map(t => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveFormTab(t.id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                    activeFormTab === t.id
                      ? 'bg-[#D4AF37] text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Form Body */}
            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              
              {/* TAB 1: BASIC INFO */}
              {activeFormTab === 'basic' && (
                <div className="space-y-4 animate-in fade-in">
                  
                  {/* Category & Subcategory Select */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Main Government Department *</label>
                      <select
                        required
                        value={formData.categoryId}
                        onChange={e => setFormData({ ...formData, categoryId: e.target.value, subcategoryId: '' })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name?.en} ({c.name?.ar})</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Subcategory (Optional)</label>
                      <select
                        value={formData.subcategoryId}
                        onChange={e => setFormData({ ...formData, subcategoryId: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="">None / General Department Service</option>
                        {formAvailableSubcategories.map(s => (
                          <option key={s.id} value={s.id}>{s.name?.en} ({s.name?.ar})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Title EN & AR */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Service Title (English) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Work Permit & Labour Card Renewal"
                        value={formData.titleEn}
                        onChange={e => {
                          const val = e.target.value;
                          setFormData(prev => ({
                            ...prev,
                            titleEn: val,
                            slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Service Title (Arabic) *</label>
                      <input
                        type="text"
                        required
                        dir="rtl"
                        placeholder="مثال: تجديد تصريح وبطاقة العمل"
                        value={formData.titleAr}
                        onChange={e => setFormData({ ...formData, titleAr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                      />
                    </div>
                  </div>

                  {/* Slug & Icon */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">URL Slug</label>
                      <input
                        type="text"
                        placeholder="e.g. work-permit-renewal"
                        value={formData.slug}
                        onChange={e => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Icon Style</label>
                      <select
                        value={formData.icon}
                        onChange={e => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        {AVAILABLE_ICONS.map(ic => (
                          <option key={ic} value={ic}>{ic}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Short Descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Short Description (English)</label>
                      <textarea
                        rows="2"
                        placeholder="Brief summary for service cards..."
                        value={formData.shortDescEn}
                        onChange={e => setFormData({ ...formData, shortDescEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Short Description (Arabic)</label>
                      <textarea
                        rows="2"
                        dir="rtl"
                        placeholder="نبذة موجزة للبطاقة..."
                        value={formData.shortDescAr}
                        onChange={e => setFormData({ ...formData, shortDescAr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                      />
                    </div>
                  </div>

                  {/* Detailed Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Detailed Description (English)</label>
                      <textarea
                        rows="3"
                        placeholder="Comprehensive service description..."
                        value={formData.descEn}
                        onChange={e => setFormData({ ...formData, descEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Detailed Description (Arabic)</label>
                      <textarea
                        rows="3"
                        dir="rtl"
                        placeholder="شرح وتفاصيل المعاملة..."
                        value={formData.descAr}
                        onChange={e => setFormData({ ...formData, descAr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                      />
                    </div>
                  </div>

                  {/* Image Picker */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Service Cover Image</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Image URL or choose from Media Library"
                        value={formData.image}
                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                      <button
                        type="button"
                        onClick={() => setIsMediaPickerOpen(true)}
                        className="px-3 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center gap-1.5 shrink-0"
                      >
                        <ImageIcon className="w-4 h-4 text-[#D4AF37]" />
                        <span>Media Library</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: PRICING & PROCESSING */}
              {activeFormTab === 'pricing' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Government Fee (AED)</label>
                      <input
                        type="number"
                        value={formData.govtFee}
                        onChange={e => {
                          const gFee = Number(e.target.value);
                          const total = gFee + (Number(formData.typingFee) || 0);
                          setFormData(prev => ({
                            ...prev,
                            govtFee: gFee,
                            estimatedCostStandard: total,
                            govtFeeRangeEn: `AED ${total}`,
                            govtFeeRangeAr: `${total} درهم`
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Typing / Processing Fee (AED)</label>
                      <input
                        type="number"
                        value={formData.typingFee}
                        onChange={e => {
                          const tFee = Number(e.target.value);
                          const total = (Number(formData.govtFee) || 0) + tFee;
                          setFormData(prev => ({
                            ...prev,
                            typingFee: tFee,
                            estimatedCostStandard: total,
                            govtFeeRangeEn: `AED ${total}`,
                            govtFeeRangeAr: `${total} درهم`
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Standard Total (AED) *</label>
                      <input
                        type="number"
                        value={formData.estimatedCostStandard}
                        onChange={e => {
                          const val = Number(e.target.value);
                          const gFee = Math.round(val * 0.7);
                          const tFee = val - gFee;
                          setFormData(prev => ({
                            ...prev,
                            estimatedCostStandard: val,
                            govtFee: gFee,
                            typingFee: tFee,
                            estimatedCostExpress: val + 100,
                            govtFeeRangeEn: `AED ${val}`,
                            govtFeeRangeAr: `${val} درهم`
                          }));
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">VIP Express (AED)</label>
                      <input
                        type="number"
                        value={formData.estimatedCostExpress}
                        onChange={e => setFormData({ ...formData, estimatedCostExpress: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  {/* Display Fee Range Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Display Fee Range (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. AED 222 or AED 200 - 450"
                        value={formData.govtFeeRangeEn}
                        onChange={e => setFormData({ ...formData, govtFeeRangeEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Display Fee Range (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        placeholder="مثال: 222 درهم"
                        value={formData.govtFeeRangeAr}
                        onChange={e => setFormData({ ...formData, govtFeeRangeAr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                      />
                    </div>
                  </div>

                  {/* Processing Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Processing Time (English)</label>
                      <input
                        type="text"
                        placeholder="e.g. 24-48 Hours"
                        value={formData.processingTimeEn}
                        onChange={e => setFormData({ ...formData, processingTimeEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Processing Time (Arabic)</label>
                      <input
                        type="text"
                        dir="rtl"
                        placeholder="مثال: 24 - 48 ساعة"
                        value={formData.processingTimeAr}
                        onChange={e => setFormData({ ...formData, processingTimeAr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                      />
                    </div>
                  </div>

                  {/* Procedure & Important Notes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Procedure Steps (English)</label>
                      <textarea
                        rows="3"
                        value={formData.procedureEn}
                        onChange={e => setFormData({ ...formData, procedureEn: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Procedure Steps (Arabic)</label>
                      <textarea
                        rows="3"
                        dir="rtl"
                        value={formData.procedureAr}
                        onChange={e => setFormData({ ...formData, procedureAr: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: REQUIRED DOCUMENTS */}
              {activeFormTab === 'documents' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Select reusable required documents from the Master Bank or customize below</span>
                  </div>

                  {/* Master Bank Quick Toggles */}
                  <div>
                    <label className="block font-semibold text-slate-300 mb-2">Master Bank Checklist:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-950 rounded-xl border border-slate-800">
                      {documents.map(doc => {
                        const docNameEn = doc.name?.en || doc.name;
                        const isIncluded = formData.requirementsEn.includes(docNameEn);

                        return (
                          <div
                            key={doc.id}
                            onClick={() => {
                              if (isIncluded) {
                                setFormData(prev => ({
                                  ...prev,
                                  requirementsEn: prev.requirementsEn.filter(i => i !== docNameEn),
                                  requirementsAr: prev.requirementsAr.filter(i => i !== (doc.name?.ar || ''))
                                }));
                              } else {
                                setFormData(prev => ({
                                  ...prev,
                                  requirementsEn: [...prev.requirementsEn, docNameEn],
                                  requirementsAr: [...prev.requirementsAr, doc.name?.ar || docNameEn]
                                }));
                              }
                            }}
                            className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                              isIncluded
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 font-semibold'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                          >
                            <span className="truncate">{docNameEn}</span>
                            {isIncluded ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Plus className="w-3.5 h-3.5 text-slate-600" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Manual Line by Line Textareas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Document List (English, one per line)</label>
                      <textarea
                        rows="5"
                        value={formData.requirementsEn.join('\n')}
                        onChange={e => setFormData({ ...formData, requirementsEn: e.target.value.split('\n') })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Document List (Arabic, one per line)</label>
                      <textarea
                        rows="5"
                        dir="rtl"
                        value={formData.requirementsAr.join('\n')}
                        onChange={e => setFormData({ ...formData, requirementsAr: e.target.value.split('\n') })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic font-mono"
                      />
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: SERVICE FAQS */}
              {activeFormTab === 'faqs' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-400">Questions specific to this government service</p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          faqs: [
                            ...prev.faqs,
                            {
                              question: { en: 'New Question?', ar: 'سؤال جديد؟' },
                              answer: { en: 'Answer details...', ar: 'تفاصيل الإجابة...' }
                            }
                          ]
                        }));
                      }}
                      className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-[#D4AF37] rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {formData.faqs.length === 0 ? (
                    <div className="text-center py-8 text-slate-500 text-xs">
                      No service-specific FAQs added yet. Click "+ Add FAQ" above.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.faqs.map((faq, fIdx) => (
                        <div key={fIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative">
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                faqs: prev.faqs.filter((_, idx) => idx !== fIdx)
                              }));
                            }}
                            className="absolute top-3 right-3 text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pr-8">
                            <input
                              type="text"
                              placeholder="Question (English)"
                              value={faq.question?.en || ''}
                              onChange={e => {
                                const val = e.target.value;
                                setFormData(prev => {
                                  const copy = [...prev.faqs];
                                  copy[fIdx] = { ...copy[fIdx], question: { ...copy[fIdx].question, en: val } };
                                  return { ...prev, faqs: copy };
                                });
                              }}
                              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                            <input
                              type="text"
                              dir="rtl"
                              placeholder="السؤال (بالعربية)"
                              value={faq.question?.ar || ''}
                              onChange={e => {
                                const val = e.target.value;
                                setFormData(prev => {
                                  const copy = [...prev.faqs];
                                  copy[fIdx] = { ...copy[fIdx], question: { ...copy[fIdx].question, ar: val } };
                                  return { ...prev, faqs: copy };
                                });
                              }}
                              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <textarea
                              rows="2"
                              placeholder="Answer (English)"
                              value={faq.answer?.en || ''}
                              onChange={e => {
                                const val = e.target.value;
                                setFormData(prev => {
                                  const copy = [...prev.faqs];
                                  copy[fIdx] = { ...copy[fIdx], answer: { ...copy[fIdx].answer, en: val } };
                                  return { ...prev, faqs: copy };
                                });
                              }}
                              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                            />
                            <textarea
                              rows="2"
                              dir="rtl"
                              placeholder="الإجابة (بالعربية)"
                              value={faq.answer?.ar || ''}
                              onChange={e => {
                                const val = e.target.value;
                                setFormData(prev => {
                                  const copy = [...prev.faqs];
                                  copy[fIdx] = { ...copy[fIdx], answer: { ...copy[fIdx].answer, ar: val } };
                                  return { ...prev, faqs: copy };
                                });
                              }}
                              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-[#D4AF37] font-arabic"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: DISPLAY & VISIBILITY */}
              {activeFormTab === 'display' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.displayOrder}
                        onChange={e => setFormData({ ...formData, displayOrder: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Status</label>
                      <select
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="active">Active (Visible on Website)</option>
                        <option value="inactive">Inactive (Hidden)</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="featuredSrv"
                        checked={formData.featured}
                        onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-[#D4AF37] bg-slate-900 border-slate-800"
                      />
                      <label htmlFor="featuredSrv" className="text-xs text-slate-300 font-semibold">
                        Feature this service on Homepage &amp; Quick Action Cards
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="popularSrv"
                        checked={formData.popular}
                        onChange={e => setFormData({ ...formData, popular: e.target.checked })}
                        className="w-4 h-4 rounded text-[#D4AF37] bg-slate-900 border-slate-800"
                      />
                      <label htmlFor="popularSrv" className="text-xs text-slate-300 font-semibold">
                        Highlight in Popular Typing Services Section
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Footer */}
              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 font-bold text-slate-950 bg-[#D4AF37] hover:bg-[#e0bc42] rounded-xl shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingService ? 'Save Service Changes' : 'Create Live Service'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelectImage={(url) => setFormData(prev => ({ ...prev, image: url }))}
        currentImage={formData.image}
      />

      {/* Delete Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        title="Delete Government Service"
        message="Are you sure you want to permanently delete this service from the live catalog?"
        itemName={serviceToDelete?.title?.en || serviceToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setServiceToDelete(null);
        }}
      />

    </div>
  );
}
