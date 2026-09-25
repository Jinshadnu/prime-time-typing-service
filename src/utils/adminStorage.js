import { siteData } from '../data/siteData';

// Unique storage keys
const STORAGE_KEYS = {
  CATEGORIES: 'primetime_categories_v5',
  SUBCATEGORIES: 'primetime_subcategories_v5',
  SERVICES: 'primetime_services_v5',
  DOCUMENTS: 'primetime_documents_v5',
  HOMEPAGE: 'primetime_homepage_v5',
  BANNERS: 'primetime_banners_v5',
  ABOUT: 'primetime_about_v5',
  FAQS: 'primetime_faqs_v5',
  TESTIMONIALS: 'primetime_testimonials_v5',
  BLOGS: 'primetime_blogs_v5',
  NAVIGATION: 'primetime_navigation_v5',
  CUSTOMERS: 'primetime_customers_v5',
  ENQUIRIES: 'primetime_enquiries_v5',
  MEDIA: 'primetime_media_v5',
  SEO: 'primetime_seo_v5',
  SETTINGS: 'primetime_settings_v5',
  USERS: 'primetime_users_v5',
  ACTIVITY_LOGS: 'primetime_activity_logs_v5'
};

const EVENT_DATA_UPDATED = 'primetime_admin_data_updated';

function broadcastChange(type, data) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT_DATA_UPDATED, { detail: { type, data } }));
  }
}

// -------------------------------------------------------------
// INITIAL SEED DATA
// -------------------------------------------------------------

const INITIAL_DOCUMENTS = [
  { id: 'doc-passport', name: { en: 'Passport Copy (Valid 6+ Months)', ar: 'صورة جواز السفر (ساري لمدة 6 أشهر على الأقل)' }, isRequired: true },
  { id: 'doc-eid', name: { en: 'Emirates ID Copy / Original', ar: 'صورة / أصل بطاقة الهوية الإماراتية' }, isRequired: true },
  { id: 'doc-photo', name: { en: 'Personal Photograph (White Background)', ar: 'صورة شخصية حديثة بخلفية بيضاء' }, isRequired: true },
  { id: 'doc-license', name: { en: 'Valid Trade License Copy', ar: 'نسخة سارية من الرخصة التجارية' }, isRequired: false },
  { id: 'doc-est-card', name: { en: 'Establishment Immigration & Labour Card', ar: 'بطاقة المنشأة (الهجرة والعمل)' }, isRequired: false },
  { id: 'doc-labour-contract', name: { en: 'Electronic Labour Contract Copy', ar: 'نسخة عقد العمل الإلكتروني' }, isRequired: false },
  { id: 'doc-degree', name: { en: 'MOFA Attested Educational Certificate', ar: 'مؤهل دراسي مصدق من وزارة الخارجية' }, isRequired: false },
  { id: 'doc-salary-cert', name: { en: 'Salary Certificate / WPS Statement', ar: 'شهادة راتب / كشف حساب حماية الأجور (WPS)' }, isRequired: false },
  { id: 'doc-tenancy', name: { en: 'Registered Tenancy Contract (Tawtheeq / Ejari)', ar: 'عقد إيجار موثق (توثيق / إيجاري)' }, isRequired: false },
  { id: 'doc-marriage-cert', name: { en: 'Attested Marriage Certificate', ar: 'عقد زواج مصدق رسمياً' }, isRequired: false },
  { id: 'doc-birth-cert', name: { en: 'Attested Birth Certificate', ar: 'شهادة ميلاد مصدقة رسمياً' }, isRequired: false },
  { id: 'doc-bank-statement', name: { en: 'Last 3-6 Months Bank Statement', ar: 'كشف حساب بنكي لآخر 3-6 أشهر' }, isRequired: false },
  { id: 'doc-medical', name: { en: 'Medical Fitness Certificate', ar: 'شهادة اللياقة الطبية المعتمدة' }, isRequired: false },
  { id: 'doc-insurance', name: { en: 'Valid Health Insurance Policy / Card', ar: 'وثيقة / بطاقة التأمين الصحي السارية' }, isRequired: false },
  { id: 'doc-mulkiya', name: { en: 'Vehicle Registration Card (Mulkiya)', ar: 'ملكية المركبة السارية' }, isRequired: false },
  { id: 'doc-police-clearance', name: { en: 'Police Good Conduct Certificate', ar: 'شهادة بحث الحالة الجنائية (حسن سيرة وسلوك)' }, isRequired: false }
];

const INITIAL_SUBCATEGORIES = [
  // Tasheel
  { id: 'sub-tasheel-labour', categoryId: 'tasheel', name: { en: 'Labour Services & Work Permits', ar: 'خدمات تصاريح وعقود العمل' }, slug: 'labour-services', displayOrder: 1, status: 'active' },
  { id: 'sub-tasheel-est', categoryId: 'tasheel', name: { en: 'Establishment & Quota Services', ar: 'خدمات المنشأة وتعديل الكوتا' }, slug: 'establishment-services', displayOrder: 2, status: 'active' },
  { id: 'sub-tasheel-wps', categoryId: 'tasheel', name: { en: 'WPS & Labor Complaints', ar: 'نظام حماية الأجور والشكاوى العمالية' }, slug: 'wps-complaints', displayOrder: 3, status: 'active' },

  // Tawjeeh
  { id: 'sub-tawjeeh-training', categoryId: 'tawjeeh', name: { en: 'Worker Awareness & Certificates', ar: 'التوعية العمالية وإصدار الشهادات' }, slug: 'worker-awareness', displayOrder: 1, status: 'active' },

  // Tadbeer
  { id: 'sub-tadbeer-sponsorship', categoryId: 'tadbeer', name: { en: 'Domestic Worker Visa & Sponsorship', ar: 'تأشيرات وإقامة العمالة المساعدة' }, slug: 'domestic-sponsorship', displayOrder: 1, status: 'active' },
  { id: 'sub-tadbeer-contracts', categoryId: 'tadbeer', name: { en: 'Tadbeer Contracts & Renewals', ar: 'عقود وتجديدات تدبير' }, slug: 'tadbeer-contracts', displayOrder: 2, status: 'active' },

  // Family Visa
  { id: 'sub-family-residency', categoryId: 'family-visa', name: { en: 'Spouse & Children Visa', ar: 'إقامة الزوجة والأبناء' }, slug: 'spouse-children-visa', displayOrder: 1, status: 'active' },
  { id: 'sub-family-parents', categoryId: 'family-visa', name: { en: 'Parents Visa Sponsorship', ar: 'إقامة الوالدين' }, slug: 'parents-visa', displayOrder: 2, status: 'active' },
  { id: 'sub-family-newborn', categoryId: 'family-visa', name: { en: 'Newborn Visa & Emirates ID', ar: 'إقامة وهوية المواليد الجدد' }, slug: 'newborn-visa', displayOrder: 3, status: 'active' },

  // Visit Visa
  { id: 'sub-visit-tourist', categoryId: 'visit-visa', name: { en: 'Tourist & Visit Permits (30/60 Days)', ar: 'تأشيرات السياحة والزيارة (30/60 يوماً)' }, slug: 'tourist-visas', displayOrder: 1, status: 'active' },
  { id: 'sub-visit-extension', categoryId: 'visit-visa', name: { en: 'Visa Extension & Status Change', ar: 'تمديد التأشيرات وتعديل الوضع' }, slug: 'visa-extensions', displayOrder: 2, status: 'active' },

  // Tamm
  { id: 'sub-tamm-driving', categoryId: 'tamm', name: { en: 'Driving & Transport Services', ar: 'خدمات رخص القيادة والنقل' }, slug: 'driving-services', displayOrder: 1, status: 'active' },
  { id: 'sub-tamm-housing', categoryId: 'tamm', name: { en: 'Municipality & Tawtheeq Contracts', ar: 'معاملات البلدية وعقود توثيق' }, slug: 'municipality-tawtheeq', displayOrder: 2, status: 'active' },

  // Emirates ID
  { id: 'sub-eid-issuance', categoryId: 'emirates-id', name: { en: 'New Issuance & Renewal', ar: 'إصدار جديد وتجديد الهوية' }, slug: 'id-issuance-renewal', displayOrder: 1, status: 'active' },
  { id: 'sub-eid-replacement', categoryId: 'emirates-id', name: { en: 'Lost / Damaged Replacement & Updates', ar: 'بدل فاقد/تالف وتحديث البيانات' }, slug: 'id-replacement', displayOrder: 2, status: 'active' },

  // Business Setup
  { id: 'sub-business-licensing', categoryId: 'business-setup', name: { en: 'Commercial License Issuance & Renewal', ar: 'إصدار وتجديد الرخص التجارية' }, slug: 'commercial-licenses', displayOrder: 1, status: 'active' },
  { id: 'sub-business-legal', categoryId: 'business-setup', name: { en: 'MOA & Trade Name Reservation', ar: 'عقود التأسيس وحجز الاسم التجاري' }, slug: 'moa-trade-name', displayOrder: 2, status: 'active' },

  // Certificate Attestation
  { id: 'sub-attest-educational', categoryId: 'certificate-attestation', name: { en: 'Educational & University Degrees', ar: 'تصديق المؤهلات والشهادات الجامعية' }, slug: 'educational-degrees', displayOrder: 1, status: 'active' },
  { id: 'sub-attest-personal', categoryId: 'certificate-attestation', name: { en: 'Marriage, Birth & Legal Certificates', ar: 'عقود الزواج والميلاد والتوثيقات' }, slug: 'personal-certificates', displayOrder: 2, status: 'active' },

  // Traffic Dept & Vehicles
  { id: 'sub-traffic-licensing', categoryId: 'traffic-dept', name: { en: 'Driving License Services & File Opening', ar: 'خدمات رخص القيادة وفتح الملف' }, slug: 'driving-license', displayOrder: 1, status: 'active' },
  { id: 'sub-vehicle-reg', categoryId: 'vehicle-registration', name: { en: 'Mulkiya Renewal & Transfer', ar: 'تجديد الملكية ونقل المركبات' }, slug: 'mulkiya-renewal', displayOrder: 1, status: 'active' }
];

const INITIAL_SETTINGS = {
  companyName: {
    en: "Prime Time Typing Services L.L.C - S.P.C.",
    ar: "برايم تايم لخدمات الطباعه ذ.م.م - ش.ش.و"
  },
  tagline: {
    en: "Professional UAE Government Typing & Corporate Documentation Center",
    ar: "المركز المعتمد لإنجاز المعاملات الحكومية وتخليص المستندات في أبوظبي"
  },
  phone: "02 8844202",
  phoneTel: "+97128844202",
  whatsapp: "050 760 2200",
  whatsappRaw: "971507602200",
  email: "primetimetyping@gmail.com",
  address: {
    en: "Near Meat Mart, Madinat Zayed, Abu Dhabi, UAE",
    ar: "بالقرب من ميت مارت، مدينة زايد، أبوظبي، الإمارات العربية المتحدة"
  },
  workingHours: {
    en: "Mon - Sat: 8:00 AM - 9:00 PM | Sunday: Closed",
    ar: "الإثنين - السبت: 8:00 صباحاً - 9:00 مساءً | الأحد: مغلق"
  },
  emergencyContact: "+971 50 760 2200",
  mapUrl: "https://maps.app.goo.gl/1G3BehJ8dzY6jU2H8?g_st=ac",
  gmapEmbed: "https://maps.google.com/maps?q=24.4811347,54.3629116&hl=en&z=17&output=embed",
  whatsappTemplate: "Hello Prime Time Typing Services,\nI am interested in:\nCategory: {category_name}\nService: {service_name}\nCustomer Name: {customer_name}\nPlease provide more information.",
  socials: {
    facebook: "https://www.facebook.com/share/1BKK9TWd9H/?mibextid=wwXIfr",
    facebookEnabled: true,
    instagram: "https://www.instagram.com/lalux_typing?igsh=a282bDZqdnh2bHVr",
    instagramEnabled: true,
    linkedin: "https://linkedin.com",
    linkedinEnabled: false,
    tiktok: "https://tiktok.com",
    tiktokEnabled: false,
    youtube: "https://youtube.com",
    youtubeEnabled: false
  },
  currency: "AED",
  timezone: "Asia/Dubai"
};

const INITIAL_USERS = [
  { id: 'user-1', name: 'Super Administrator', email: 'admin@primetimetyping.com', username: 'admin', role: 'Super Admin', status: 'active', avatar: '', createdDate: '2025-01-10' },
  { id: 'user-2', name: 'Zayed Al Mansoori', email: 'operations@primetimetyping.com', username: 'zayed_ops', role: 'Admin', status: 'active', avatar: '', createdDate: '2025-03-15' },
  { id: 'user-3', name: 'Sarah Ahmed', email: 'content@primetimetyping.com', username: 'sarah_content', role: 'Content Manager', status: 'active', avatar: '', createdDate: '2025-06-20' },
  { id: 'user-4', name: 'Rashid Khan', email: 'enquiries@primetimetyping.com', username: 'rashid_enq', role: 'Enquiry Manager', status: 'active', avatar: '', createdDate: '2025-08-01' }
];

const INITIAL_ENQUIRIES = [
  {
    id: 'ENQ-9042',
    name: 'Mohammed Al Mazrouei',
    phone: '+971 50 123 4567',
    email: 'm.almazrouei@gmail.com',
    categoryId: 'tasheel',
    serviceId: 'tasheel-new-permit',
    serviceName: 'New Electronic Work Permit Application',
    message: 'Need urgent processing for 3 incoming engineers with attested bachelor certificates.',
    status: 'New',
    source: 'Website Contact Form',
    notes: 'Called client once, scheduled callback at 2 PM.',
    date: '2026-09-22 08:30'
  },
  {
    id: 'ENQ-9041',
    name: 'Fatima Al Kaabi',
    phone: '+971 55 987 6543',
    email: 'fatima.alkaabi@outlook.com',
    categoryId: 'family-visa',
    serviceId: 'family-spouse-residence',
    serviceName: 'Family Visa - Spouse & Children Residence',
    message: 'Want to sponsor spouse and 2 kids under golden visa or standard employment sponsor.',
    status: 'In Progress',
    source: 'Fee Estimator Tool',
    notes: 'Documents received via WhatsApp. Medical test booked.',
    date: '2026-09-21 16:15'
  },
  {
    id: 'ENQ-9040',
    name: 'David Reynolds',
    phone: '+971 52 444 8899',
    email: 'd.reynolds@techflow.ae',
    categoryId: 'business-setup',
    serviceId: 'business-commercial-license',
    serviceName: 'Commercial License Issuance & Renewals',
    message: 'Looking to renew Abu Dhabi commercial license and add 2 new activity codes.',
    status: 'Contacted',
    source: 'WhatsApp Button',
    notes: 'Quotation sent via email.',
    date: '2026-09-21 11:45'
  },
  {
    id: 'ENQ-9039',
    name: 'Priya Sharma',
    phone: '+971 50 778 9900',
    email: 'priya.s@gmail.com',
    categoryId: 'certificate-attestation',
    serviceId: 'mofa-degree-attestation',
    serviceName: 'MOFA University Degree Attestation',
    message: 'Need UK degree attested with MOFA UAE stamp and MOJ Arabic translation.',
    status: 'Completed',
    source: 'Website Contact Form',
    notes: 'Delivered attested degree to client office.',
    date: '2026-09-20 09:20'
  }
];

const INITIAL_CUSTOMERS = [
  {
    id: 'cust-1',
    name: 'Mohammed Al Mazrouei',
    phone: '+971 50 123 4567',
    email: 'm.almazrouei@gmail.com',
    totalEnquiries: 3,
    lastEnquiryDate: '2026-09-22',
    servicesRequested: ['New Electronic Work Permit Application', 'WPS Clearance'],
    createdDate: '2026-01-14'
  },
  {
    id: 'cust-2',
    name: 'Fatima Al Kaabi',
    phone: '+971 55 987 6543',
    email: 'fatima.alkaabi@outlook.com',
    totalEnquiries: 2,
    lastEnquiryDate: '2026-09-21',
    servicesRequested: ['Family Visa - Spouse & Children Residence', 'Emirates ID Renewal'],
    createdDate: '2026-02-19'
  },
  {
    id: 'cust-3',
    name: 'David Reynolds',
    phone: '+971 52 444 8899',
    email: 'd.reynolds@techflow.ae',
    totalEnquiries: 4,
    lastEnquiryDate: '2026-09-21',
    servicesRequested: ['Commercial License Issuance & Renewals', 'Establishment Card'],
    createdDate: '2025-11-05'
  },
  {
    id: 'cust-4',
    name: 'Priya Sharma',
    phone: '+971 50 778 9900',
    email: 'priya.s@gmail.com',
    totalEnquiries: 1,
    lastEnquiryDate: '2026-09-20',
    servicesRequested: ['MOFA University Degree Attestation'],
    createdDate: '2026-09-20'
  }
];

const INITIAL_ACTIVITY_LOGS = [
  { id: 'act-1', admin: 'Super Administrator', action: 'Created Category', module: 'Categories', record: 'Tasheel Services', ip: '192.168.1.1', timestamp: '2026-09-22 08:45:10' },
  { id: 'act-2', admin: 'Zayed Al Mansoori', action: 'Updated Service Pricing', module: 'Services', record: 'Work Permit & Labour Card Renewal', ip: '192.168.1.14', timestamp: '2026-09-22 08:12:05' },
  { id: 'act-3', admin: 'Sarah Ahmed', action: 'Modified Hero Slider Banner', module: 'Website Content', record: 'Banner Slide 1', ip: '192.168.1.20', timestamp: '2026-09-21 17:30:00' },
  { id: 'act-4', admin: 'Rashid Khan', action: 'Updated Enquiry Status to In Progress', module: 'Enquiries', record: 'ENQ-9041 (Fatima Al Kaabi)', ip: '192.168.1.33', timestamp: '2026-09-21 16:20:15' }
];

const INITIAL_SEO = {
  globalTitle: "Prime Time Typing Services | Professional Typing & Document Clearing - Abu Dhabi",
  globalDescription: "Authorized UAE government typing and corporate document clearance center in Abu Dhabi. Fast processing for Tasheel, MOHRE, ICP Residency, Emirates ID, Tamm, ADJD, and MOFA Attestation.",
  keywords: "typing center abu dhabi, tasheel services abu dhabi, residency visa typing, emirates id center, tamm portal assistance, mofa attestation uae, prime time typing",
  ogImage: "https://primetimetypingservice.com/assets/prime_time_logo.jpeg",
  googleAnalyticsId: "G-PTT9042UAE",
  googleSearchConsole: "google-site-verification=ptt-adm-99214-verification",
  pages: {
    home: { title: "Home | Prime Time Typing Services", metaDesc: "Official typing center in Abu Dhabi offering comprehensive government application clearance.", slug: "/" },
    about: { title: "About Us | Prime Time Typing Services", metaDesc: "15+ years experience in UAE documentation and corporate clearance services.", slug: "/#about" },
    services: { title: "Government Services Catalog | Prime Time Typing", metaDesc: "Explore over 70+ UAE government typing services with fee estimates and document checklists.", slug: "/#services" },
    estimator: { title: "Interactive Fee Estimator | Prime Time Typing", metaDesc: "Calculate government fees and processing times for UAE visas, permits and licenses.", slug: "/#calculator" },
    contact: { title: "Contact & Location | Prime Time Typing Abu Dhabi", metaDesc: "Visit our office in Madinat Zayed Abu Dhabi or contact us via WhatsApp 050 760 2200.", slug: "/#contact" }
  }
};

const INITIAL_BLOGS = [
  {
    id: 'blog-1',
    title: {
      en: 'Complete Guide to UAE Golden Visa Requirements in 2026',
      ar: 'الدليل الشامل لشروط ومتطلبات الإقامة الذهبية في الإمارات 2026'
    },
    slug: 'uae-golden-visa-guide-2026',
    excerpt: {
      en: 'Key eligibility criteria, required documents, and step-by-step application workflow for investors, professionals, and outstanding students.',
      ar: 'أبرز معايير الأهلية، والمستندات المطلوبة، وخطوات التقديم خطوة بخطوة للمستثمرين والمتخصصين والطلبة المتميزين.'
    },
    content: {
      en: 'The UAE Golden Visa offers long-term residency (10 years) for investors, entrepreneurs, specialized talents, and researchers. Prime Time Typing assists in complete file preparation, qualification attestation, and ICP portal fast-track submissions.',
      ar: 'توفر الإقامة الذهبية في دولة الإمارات إقامة طويلة الأمد لمدة 10 سنوات للمستثمرين ورواد الأعمال وأصحاب المواهب التخصصية والباحثين. يقدم مركز برايم تايم دعماً متكاملاً لإعداد الملف وتصديق المؤهلات والتقديم الفوري عبر بوابة الهيئة الاتحادية.'
    },
    category: 'Residency Visas',
    author: 'Prime Time Editorial',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80',
    publishedDate: '2026-09-10',
    status: 'published'
  },
  {
    id: 'blog-2',
    title: {
      en: 'MOHRE Work Permit Renewal: How to Avoid Fines and Delay Penalties',
      ar: 'تجديد تصاريح العمل في وزارة الموارد البشرية: كيف تتجنب الغرامات والتأخير'
    },
    slug: 'mohre-work-permit-renewal-guide',
    excerpt: {
      en: 'Essential checklist for UAE employers and HR departments to ensure seamless labor card renewals within the 60-day renewal window.',
      ar: 'قائمة تحقق مهمة لأصحاب العمل وأقسام الموارد البشرية لضمان تجديد بطاقات العمل ضمن الفترة المسموحة وتفادي الغرامات.'
    },
    content: {
      en: 'Employers in the UAE must initiate labor contract and work permit renewals prior to expiry. Failure to renew on time results in monthly fines. Our Tasheel department ensures zero delay.',
      ar: 'يتوجب على المنشآت في الإمارات تجديد عقود وبطاقات العمل قبل انتهائها. التأخير يترتب عليه غرامات شهرية متراكمة. يتولى قسم تسهيل لدينا إنجاز التجديد الفوري خلال ساعات.'
    },
    category: 'Tasheel & MOHRE',
    author: 'Legal Documentation Team',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    publishedDate: '2026-09-15',
    status: 'published'
  }
];

const INITIAL_HOMEPAGE = {
  heroHeading: {
    en: "Fast & Accurate Typing Services in Abu Dhabi",
    ar: "خدمات الطباعة والمعاملات الحكومية الأسرع والأكثر دقة في أبوظبي"
  },
  heroSubheading: {
    en: "Official document clearance for ICP Residency, MOHRE Work Permits, TAMM Platform, Emirates ID, Court Documents, and Legal Attestation across Abu Dhabi.",
    ar: "إنجاز احترافي لكافة معاملات إقامات ICP، تصاريح العمل من وزارة الموارد البشرية، منصة تم TAMM، بطاقات الهوية، معاملات المحاكم وتصديق الشهادات في أبوظبي."
  },
  ctaPrimaryText: {
    en: "Explore Services",
    ar: "استكشف الخدمات"
  },
  ctaSecondaryText: {
    en: "Instant WhatsApp Inquiry",
    ar: "استفسار فوري عبر واتساب"
  },
  stats: [
    { id: 'stat-1', value: '15+', label: { en: 'Years Official Experience', ar: 'عاماً من الخبرة والاعتماد' } },
    { id: 'stat-2', value: '75,000+', label: { en: 'Applications Cleared', ar: 'معاملة حكومية منجزة' } },
    { id: 'stat-3', value: '99.8%', label: { en: 'Accuracy & Client Approval', ar: 'نسبة الدقة ورضا العملاء' } },
    { id: 'stat-4', value: '26+', label: { en: 'Govt. Portals Supported', ar: 'بوابة ودائرة حكومية معتمدة' } }
  ],
  whyChooseUs: [
    { id: 'why-1', title: { en: 'Official Govt Portals Authorization', ar: 'ربط مباشر بالبوابات الحكومية' }, desc: { en: 'Direct access to ICP, MOHRE, TAMM, and ADJD court portals for rapid clearance.', ar: 'وصول مباشر ومعتمد لكافة البوابات الرسمية لإنجاز المعاملات دون وسيط.' } },
    { id: 'why-2', title: { en: '100% Error-Free Guarantee', ar: 'ضمان الدقة وتفادي الرفض' }, desc: { en: 'Certified document specialists review all attachments to prevent government rejection or delays.', ar: 'مراجعة دقيقة لكافة المستندات والمرفقات لتفادي أي تأخير أو رفض.' } },
    { id: 'why-3', title: { en: 'VIP Express Fast-Tracking', ar: 'خدمة VIP السريعة والمستعجلة' }, desc: { en: 'Urgent typing and same-day priority submissions for urgent visa and residency cases.', ar: 'إنجاز عاجل وأولوية قصوى للحالات المستعجلة والتأشيرات الطارئة في نفس اليوم.' } },
    { id: 'why-4', title: { en: 'Transparent UAE Government Fees', ar: 'شفافية كاملة في الرسوم' }, desc: { en: 'Clear itemized fee breakdowns with zero hidden costs and official payment receipts.', ar: 'تفصيل دقيق للرسوم الحكومية ورسوم الطباعة دون أي تكاليف خفية.' } }
  ]
};

// -------------------------------------------------------------
// GENERIC STORAGE HELPER FUNCTIONS
// -------------------------------------------------------------

function getStoredItem(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed !== null && parsed !== undefined) return parsed;
    }
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
  }
  return fallback;
}

function setStoredItem(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    broadcastChange(key, data);
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// -------------------------------------------------------------
// CATEGORIES & SUBCATEGORIES MANAGEMENT
// -------------------------------------------------------------

export function getStoredCategories() {
  const fallback = siteData.categories.map((c, index) => ({
    ...c,
    slug: c.id,
    displayOrder: index + 1,
    featured: index < 8,
    status: 'active'
  }));
  return getStoredItem(STORAGE_KEYS.CATEGORIES, fallback);
}

export function saveCategories(categories) {
  setStoredItem(STORAGE_KEYS.CATEGORIES, categories);
  logActivity('Updated Categories List', 'Categories', `${categories.length} categories`);
  return categories;
}

export function addCategory(categoryData) {
  const current = getStoredCategories();
  const id = categoryData.slug || `cat-${Date.now()}`;
  const newCat = {
    id,
    name: {
      en: categoryData.nameEn || 'New Category',
      ar: categoryData.nameAr || categoryData.nameEn || 'فئة جديدة'
    },
    slug: categoryData.slug || id,
    desc: {
      en: categoryData.descEn || '',
      ar: categoryData.descAr || categoryData.descEn || ''
    },
    icon: categoryData.icon || 'FileText',
    image: categoryData.image || '',
    displayOrder: Number(categoryData.displayOrder) || current.length + 1,
    featured: Boolean(categoryData.featured),
    status: categoryData.status || 'active'
  };
  const updated = [newCat, ...current];
  saveCategories(updated);
  logActivity('Created New Category', 'Categories', newCat.name.en);
  return updated;
}

export function updateCategory(id, data) {
  const current = getStoredCategories();
  const updated = current.map(c => {
    if (c.id === id) {
      return {
        ...c,
        name: {
          en: data.nameEn !== undefined ? data.nameEn : c.name.en,
          ar: data.nameAr !== undefined ? data.nameAr : c.name.ar
        },
        desc: {
          en: data.descEn !== undefined ? data.descEn : c.desc?.en || '',
          ar: data.descAr !== undefined ? data.descAr : c.desc?.ar || ''
        },
        slug: data.slug || c.slug || c.id,
        icon: data.icon || c.icon,
        image: data.image !== undefined ? data.image : c.image,
        displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : c.displayOrder,
        featured: data.featured !== undefined ? Boolean(data.featured) : c.featured,
        status: data.status || c.status || 'active'
      };
    }
    return c;
  });
  saveCategories(updated);
  logActivity('Updated Category Details', 'Categories', id);
  return updated;
}

export function deleteCategory(id) {
  const current = getStoredCategories();
  const updated = current.filter(c => c.id !== id);
  saveCategories(updated);
  logActivity('Deleted Category', 'Categories', id);
  return updated;
}

// SUBCATEGORIES
export function getStoredSubcategories() {
  return getStoredItem(STORAGE_KEYS.SUBCATEGORIES, INITIAL_SUBCATEGORIES);
}

export function saveSubcategories(subs) {
  setStoredItem(STORAGE_KEYS.SUBCATEGORIES, subs);
  return subs;
}

export function addSubcategory(data) {
  const current = getStoredSubcategories();
  const id = `sub-${Date.now()}`;
  const newSub = {
    id,
    categoryId: data.categoryId || 'tasheel',
    name: {
      en: data.nameEn || 'New Subcategory',
      ar: data.nameAr || data.nameEn || 'فئة فرعية جديدة'
    },
    slug: data.slug || `sub-${Date.now()}`,
    desc: {
      en: data.descEn || '',
      ar: data.descAr || ''
    },
    image: data.image || '',
    icon: data.icon || 'Folder',
    displayOrder: Number(data.displayOrder) || current.length + 1,
    status: data.status || 'active'
  };
  const updated = [newSub, ...current];
  saveSubcategories(updated);
  logActivity('Created Subcategory', 'Subcategories', `${newSub.name.en} under ${newSub.categoryId}`);
  return updated;
}

export function updateSubcategory(id, data) {
  const current = getStoredSubcategories();
  const updated = current.map(s => {
    if (s.id === id) {
      return {
        ...s,
        categoryId: data.categoryId || s.categoryId,
        name: {
          en: data.nameEn !== undefined ? data.nameEn : s.name.en,
          ar: data.nameAr !== undefined ? data.nameAr : s.name.ar
        },
        slug: data.slug || s.slug,
        desc: {
          en: data.descEn !== undefined ? data.descEn : s.desc?.en || '',
          ar: data.descAr !== undefined ? data.descAr : s.desc?.ar || ''
        },
        image: data.image !== undefined ? data.image : s.image,
        icon: data.icon || s.icon,
        displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : s.displayOrder,
        status: data.status || s.status || 'active'
      };
    }
    return s;
  });
  saveSubcategories(updated);
  logActivity('Updated Subcategory', 'Subcategories', id);
  return updated;
}

export function deleteSubcategory(id) {
  const current = getStoredSubcategories();
  const updated = current.filter(s => s.id !== id);
  saveSubcategories(updated);
  logActivity('Deleted Subcategory', 'Subcategories', id);
  return updated;
}

// -------------------------------------------------------------
// DOCUMENTS MASTER BANK
// -------------------------------------------------------------

export function getStoredDocuments() {
  return getStoredItem(STORAGE_KEYS.DOCUMENTS, INITIAL_DOCUMENTS);
}

export function saveDocuments(docs) {
  setStoredItem(STORAGE_KEYS.DOCUMENTS, docs);
  return docs;
}

export function addDocument(data) {
  const current = getStoredDocuments();
  const id = `doc-${Date.now()}`;
  const newDoc = {
    id,
    name: {
      en: data.nameEn || 'New Document Requirement',
      ar: data.nameAr || data.nameEn || 'مستند مطلوب جديد'
    },
    isRequired: Boolean(data.isRequired)
  };
  const updated = [...current, newDoc];
  saveDocuments(updated);
  logActivity('Created Document Master Item', 'Documents', newDoc.name.en);
  return updated;
}

export function updateDocument(id, data) {
  const current = getStoredDocuments();
  const updated = current.map(d => {
    if (d.id === id) {
      return {
        ...d,
        name: {
          en: data.nameEn !== undefined ? data.nameEn : d.name.en,
          ar: data.nameAr !== undefined ? data.nameAr : d.name.ar
        },
        isRequired: data.isRequired !== undefined ? Boolean(data.isRequired) : d.isRequired
      };
    }
    return d;
  });
  saveDocuments(updated);
  logActivity('Updated Document Master Item', 'Documents', id);
  return updated;
}

export function deleteDocument(id) {
  const current = getStoredDocuments();
  const updated = current.filter(d => d.id !== id);
  saveDocuments(updated);
  logActivity('Deleted Document Master Item', 'Documents', id);
  return updated;
}

// -------------------------------------------------------------
// SERVICES MANAGEMENT
// -------------------------------------------------------------

export function getStoredServices() {
  const fallback = siteData.services.map((s, index) => {
    const stdCost = Number(s.estimatedCostStandard) || 250;
    const gFee = s.govtFee !== undefined ? Number(s.govtFee) : Math.round(stdCost * 0.7);
    const tFee = s.typingFee !== undefined ? Number(s.typingFee) : Math.round(stdCost * 0.3);
    return {
      ...s,
      subcategoryId: s.subcategoryId || '',
      slug: s.slug || s.id,
      status: s.status || 'active',
      popular: s.popular || (index % 4 === 0),
      featured: s.featured || (index % 3 === 0),
      displayOrder: s.displayOrder || index + 1,
      govtFee: gFee,
      typingFee: tFee,
      estimatedCostStandard: stdCost,
      estimatedCostExpress: Number(s.estimatedCostExpress) || (stdCost + 100),
      govtFeeRange: s.govtFeeRange || {
        en: `AED ${stdCost}`,
        ar: `${stdCost} درهم`
      },
      faqs: s.faqs || [
        {
          question: { en: `What is required for ${s.title?.en || 'this service'}?`, ar: `ما هي متطلبات ${s.title?.ar || 'هذه الخدمة'}؟` },
          answer: { en: 'Valid Emirates ID, passport copy with 6+ months validity, and trade license (for corporate files).', ar: 'صورة الهوية وجواز السفر ساري لمدة 6 أشهر على الأقل والرخصة التجارية للشركات.' }
        },
        {
          question: { en: 'How long does processing take?', ar: 'كم يستغرق إنجاز المعاملة؟' },
          answer: { en: s.processingTime?.en || 'Usually completed within 24-48 business hours.', ar: s.processingTime?.ar || 'تنجز عادة خلال 24 - 48 ساعة عمل.' }
        }
      ]
    };
  });

  const rawList = getStoredItem(STORAGE_KEYS.SERVICES, fallback);
  return rawList.map(item => {
    const stdCost = Number(item.estimatedCostStandard) || (item.govtFee ? Number(item.govtFee) + (Number(item.typingFee) || 0) : 250);
    const gFee = item.govtFee !== undefined ? Number(item.govtFee) : Math.round(stdCost * 0.7);
    const tFee = item.typingFee !== undefined ? Number(item.typingFee) : Math.round(stdCost * 0.3);
    const expCost = Number(item.estimatedCostExpress) || (stdCost + 100);

    return {
      ...item,
      estimatedCostStandard: stdCost,
      govtFee: gFee,
      typingFee: tFee,
      estimatedCostExpress: expCost,
      govtFeeRange: typeof item.govtFeeRange === 'object' && item.govtFeeRange !== null && (item.govtFeeRange.en || item.govtFeeRange.ar)
        ? item.govtFeeRange
        : {
            en: `AED ${stdCost}`,
            ar: `${stdCost} درهم`
          }
    };
  });
}

export function saveServices(services) {
  setStoredItem(STORAGE_KEYS.SERVICES, services);
  try {
    localStorage.setItem('prime_time_services_v4', JSON.stringify(services));
  } catch (e) {}
  broadcastChange(STORAGE_KEYS.SERVICES, services);
  return services;
}

export function addService(data) {
  const current = getStoredServices();
  const id = `service-${Date.now()}`;
  const gFee = Number(data.govtFee) || 0;
  const tFee = Number(data.typingFee) || 0;
  const stdCost = Number(data.estimatedCostStandard) || (gFee + tFee) || 250;
  const expCost = Number(data.estimatedCostExpress) || (stdCost + 100);

  const feeRangeEn = data.govtFeeRangeEn && data.govtFeeRangeEn.trim() !== ''
    ? data.govtFeeRangeEn
    : `AED ${stdCost}`;
  const feeRangeAr = data.govtFeeRangeAr && data.govtFeeRangeAr.trim() !== ''
    ? data.govtFeeRangeAr
    : `${stdCost} درهم`;

  const newService = {
    id,
    categoryId: data.categoryId || 'tasheel',
    subcategoryId: data.subcategoryId || '',
    slug: data.slug || id,
    icon: data.icon || 'Briefcase',
    image: data.image || '',
    featured: Boolean(data.featured),
    popular: Boolean(data.popular),
    status: data.status || 'active',
    displayOrder: Number(data.displayOrder) || current.length + 1,
    title: {
      en: data.titleEn || 'New Service',
      ar: data.titleAr || data.titleEn || 'خدمة جديدة'
    },
    shortDesc: {
      en: data.shortDescEn || data.descEn || '',
      ar: data.shortDescAr || data.descAr || data.shortDescEn || ''
    },
    desc: {
      en: data.descEn || '',
      ar: data.descAr || data.descEn || ''
    },
    detailedDesc: {
      en: data.detailedDescEn || data.descEn || '',
      ar: data.detailedDescAr || data.descAr || ''
    },
    eligibility: {
      en: data.eligibilityEn || 'Valid UAE Resident or Registered Entity',
      ar: data.eligibilityAr || 'مقيم داخل الدولة أو منشأة مسجلة أصولاً'
    },
    procedure: {
      en: data.procedureEn || '1. Document submission 2. Portal typing 3. Official payment 4. Certificate/permit issuance',
      ar: data.procedureAr || '1. استلام المستندات 2. الطباعة الإلكترونية 3. سداد الرسوم 4. إصدار المعاملة'
    },
    importantNotes: {
      en: data.importantNotesEn || 'All passport copies must be clear with at least 6 months validity.',
      ar: data.importantNotesAr || 'يجب أن تكون صور جوازات السفر واضحة وسارية لمدة لا تقل عن 6 أشهر.'
    },
    processingTime: {
      en: data.processingTimeEn || '24-48 Hours',
      ar: data.processingTimeAr || '24 - 48 ساعة'
    },
    govtFee: gFee,
    typingFee: tFee,
    estimatedCostStandard: stdCost,
    estimatedCostExpress: expCost,
    govtFeeRange: {
      en: feeRangeEn,
      ar: feeRangeAr
    },
    requirements: {
      en: Array.isArray(data.requirementsEn)
        ? data.requirementsEn
        : (data.requirementsEn ? data.requirementsEn.split('\n').filter(Boolean) : ['Passport Copy', 'Emirates ID Copy']),
      ar: Array.isArray(data.requirementsAr)
        ? data.requirementsAr
        : (data.requirementsAr ? data.requirementsAr.split('\n').filter(Boolean) : ['صورة جواز السفر', 'صورة الهوية الإماراتية'])
    },
    faqs: Array.isArray(data.faqs) ? data.faqs : []
  };

  const updated = [newService, ...current];
  saveServices(updated);
  logActivity('Created New Service', 'Services', newService.title.en);
  return updated;
}

export function updateService(id, data) {
  const current = getStoredServices();
  const updated = current.map(item => {
    if (item.id === id) {
      const gFee = data.govtFee !== undefined ? Number(data.govtFee) : (item.govtFee || 0);
      const tFee = data.typingFee !== undefined ? Number(data.typingFee) : (item.typingFee || 0);
      const stdCost = data.estimatedCostStandard !== undefined 
        ? Number(data.estimatedCostStandard) 
        : ((gFee + tFee) || item.estimatedCostStandard || 250);
      const expCost = data.estimatedCostExpress !== undefined 
        ? Number(data.estimatedCostExpress) 
        : (item.estimatedCostExpress || (stdCost + 100));

      const feeRangeEn = data.govtFeeRangeEn !== undefined && data.govtFeeRangeEn.trim() !== ''
        ? data.govtFeeRangeEn
        : `AED ${stdCost}`;
      const feeRangeAr = data.govtFeeRangeAr !== undefined && data.govtFeeRangeAr.trim() !== ''
        ? data.govtFeeRangeAr
        : `${stdCost} درهم`;

      return {
        ...item,
        categoryId: data.categoryId || item.categoryId,
        subcategoryId: data.subcategoryId !== undefined ? data.subcategoryId : item.subcategoryId,
        slug: data.slug || item.slug || item.id,
        icon: data.icon || item.icon,
        image: data.image !== undefined ? data.image : item.image,
        featured: data.featured !== undefined ? Boolean(data.featured) : item.featured,
        popular: data.popular !== undefined ? Boolean(data.popular) : item.popular,
        status: data.status || item.status || 'active',
        displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : item.displayOrder,
        title: {
          en: data.titleEn !== undefined ? data.titleEn : item.title?.en || '',
          ar: data.titleAr !== undefined ? data.titleAr : item.title?.ar || ''
        },
        shortDesc: {
          en: data.shortDescEn !== undefined ? data.shortDescEn : item.shortDesc?.en || item.desc?.en || '',
          ar: data.shortDescAr !== undefined ? data.shortDescAr : item.shortDesc?.ar || item.desc?.ar || ''
        },
        desc: {
          en: data.descEn !== undefined ? data.descEn : item.desc?.en || '',
          ar: data.descAr !== undefined ? data.descAr : item.desc?.ar || ''
        },
        detailedDesc: {
          en: data.detailedDescEn !== undefined ? data.detailedDescEn : item.detailedDesc?.en || item.desc?.en || '',
          ar: data.detailedDescAr !== undefined ? data.detailedDescAr : item.detailedDesc?.ar || item.desc?.ar || ''
        },
        eligibility: {
          en: data.eligibilityEn !== undefined ? data.eligibilityEn : item.eligibility?.en || '',
          ar: data.eligibilityAr !== undefined ? data.eligibilityAr : item.eligibility?.ar || ''
        },
        procedure: {
          en: data.procedureEn !== undefined ? data.procedureEn : item.procedure?.en || '',
          ar: data.procedureAr !== undefined ? data.procedureAr : item.procedure?.ar || ''
        },
        importantNotes: {
          en: data.importantNotesEn !== undefined ? data.importantNotesEn : item.importantNotes?.en || '',
          ar: data.importantNotesAr !== undefined ? data.importantNotesAr : item.importantNotes?.ar || ''
        },
        processingTime: {
          en: data.processingTimeEn !== undefined ? data.processingTimeEn : item.processingTime?.en || '24-48 Hours',
          ar: data.processingTimeAr !== undefined ? data.processingTimeAr : item.processingTime?.ar || '24 - 48 ساعة'
        },
        govtFee: gFee,
        typingFee: tFee,
        estimatedCostStandard: stdCost,
        estimatedCostExpress: expCost,
        govtFeeRange: {
          en: feeRangeEn,
          ar: feeRangeAr
        },
        requirements: {
          en: Array.isArray(data.requirementsEn)
            ? data.requirementsEn
            : (data.requirementsEn !== undefined ? data.requirementsEn.split('\n').filter(Boolean) : (item.requirements?.en || [])),
          ar: Array.isArray(data.requirementsAr)
            ? data.requirementsAr
            : (data.requirementsAr !== undefined ? data.requirementsAr.split('\n').filter(Boolean) : (item.requirements?.ar || []))
        },
        faqs: Array.isArray(data.faqs) ? data.faqs : item.faqs || []
      };
    }
    return item;
  });

  saveServices(updated);
  logActivity('Updated Service Details', 'Services', id);
  return updated;
}

export function duplicateService(id) {
  const current = getStoredServices();
  const target = current.find(s => s.id === id);
  if (!target) return current;
  const duplicate = {
    ...target,
    id: `service-dup-${Date.now()}`,
    slug: `${target.slug || target.id}-copy`,
    title: {
      en: `${target.title?.en || 'Service'} (Copy)`,
      ar: `${target.title?.ar || 'خدمة'} (نسخة)`
    },
    displayOrder: current.length + 1
  };
  const updated = [duplicate, ...current];
  saveServices(updated);
  logActivity('Duplicated Service', 'Services', `${target.title?.en} -> ${duplicate.title.en}`);
  return updated;
}

export function deleteService(id) {
  const current = getStoredServices();
  const updated = current.filter(item => item.id !== id);
  saveServices(updated);
  logActivity('Deleted Service', 'Services', id);
  return updated;
}

export function bulkUpdateServicesStatus(ids, status) {
  const current = getStoredServices();
  const updated = current.map(s => ids.includes(s.id) ? { ...s, status } : s);
  saveServices(updated);
  logActivity('Bulk Updated Services Status', 'Services', `${ids.length} services set to ${status}`);
  return updated;
}

// -------------------------------------------------------------
// HOMEPAGE, BANNERS, ABOUT & CONTENT
// -------------------------------------------------------------

export function getStoredHomepage() {
  return getStoredItem(STORAGE_KEYS.HOMEPAGE, INITIAL_HOMEPAGE);
}

export function saveHomepage(data) {
  setStoredItem(STORAGE_KEYS.HOMEPAGE, data);
  logActivity('Updated Homepage Content', 'Website Content', 'Hero, stats, or why choose us');
  return data;
}

export function getStoredBanners() {
  const fallback = siteData.heroBanners.map((b, i) => ({
    ...b,
    ctaUrl: '#services',
    ctaText: { en: 'Explore Services', ar: 'استكشف الخدمات' },
    displayOrder: i + 1,
    status: 'active',
    startDate: '',
    endDate: ''
  }));
  return getStoredItem(STORAGE_KEYS.BANNERS, fallback);
}

export function saveBanners(banners) {
  setStoredItem(STORAGE_KEYS.BANNERS, banners);
  logActivity('Updated Hero Banners', 'Website Content', `${banners.length} banners`);
  return banners;
}

export function getStoredFaqs() {
  const fallback = siteData.faqs || [
    {
      id: 'faq-1',
      category: 'General',
      question: { en: 'What are the working hours of Prime Time Typing?', ar: 'ما هي مواعيد العمل في مركز برايم تايم للطباعة؟' },
      answer: { en: 'We are open Monday through Saturday from 8:00 AM to 9:00 PM. Closed on Sundays.', ar: 'نستقبلكم من الإثنين إلى السبت من الساعة 8:00 صباحاً حتى 9:00 مساءً. ويوم الأحد عطلة.' },
      displayOrder: 1,
      status: 'active'
    },
    {
      id: 'faq-2',
      category: 'Tasheel & Visas',
      question: { en: 'How fast can an urgent work permit or visa be processed?', ar: 'كم يستغرق استخراج تصريح العمل أو التأشيرة المستعجلة؟' },
      answer: { en: 'With our VIP Express Service, urgent MOHRE and ICP residency applications can be submitted and cleared within 2 to 24 hours.', ar: 'عبر خدمة VIP السريعة يمكن طباعة وتقديم معاملات تسهيل والإقامة واستلامها خلال 2 إلى 24 ساعة.' },
      displayOrder: 2,
      status: 'active'
    },
    {
      id: 'faq-3',
      category: 'Documents',
      question: { en: 'Can I send documents via WhatsApp or Email?', ar: 'هل يمكنني إرسال المستندات عبر واتساب أو البريد الإلكتروني؟' },
      answer: { en: 'Yes, you can send clear PDF copies or photos to 050 760 2200 or primetimetyping@gmail.com for instant review and typing.', ar: 'نعم بكل تأكيد، يمكنك إرسال صور واضحة أو ملفات PDF عبر واتساب على الرقم 0507602200 للبدء فوراً.' },
      displayOrder: 3,
      status: 'active'
    }
  ];
  return getStoredItem(STORAGE_KEYS.FAQS, fallback);
}

export function saveFaqs(faqs) {
  setStoredItem(STORAGE_KEYS.FAQS, faqs);
  logActivity('Updated Global FAQs', 'Website Content', `${faqs.length} FAQs`);
  return faqs;
}

export function getStoredTestimonials() {
  const fallback = siteData.testimonials || [
    {
      id: 'test-1',
      name: 'Eng. Khalid Al Suwaidi',
      role: 'Corporate HR Director',
      rating: 5,
      service: 'MOHRE & Tasheel Quotas',
      review: {
        en: 'Prime Time Typing cleared our 40+ work permits with zero error and exceptional speed. Truly the best typing center in Madinat Zayed!',
        ar: 'أفضل مركز طباعة في أبوظبي. أنجزوا أكثر من 40 تصريح عمل لشركتنا بدقة متناهية وسرعة قياسية.'
      },
      status: 'active'
    },
    {
      id: 'test-2',
      name: 'Mariam Al Hosani',
      role: 'Family Visa Applicant',
      rating: 5,
      service: 'Golden Visa & Family Sponsorship',
      review: {
        en: 'Super smooth family sponsorship process. Medical booking and Emirates ID typing took less than 24 hours.',
        ar: 'خدمة راقية جداً في كفالة إقامة العائلة، تم حجز الفحص الطبي وطباعة الهوية في نفس اليوم.'
      },
      status: 'active'
    }
  ];
  return getStoredItem(STORAGE_KEYS.TESTIMONIALS, fallback);
}

export function saveTestimonials(testimonials) {
  setStoredItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
  return testimonials;
}

export function getStoredBlogs() {
  return getStoredItem(STORAGE_KEYS.BLOGS, INITIAL_BLOGS);
}

export function saveBlogs(blogs) {
  setStoredItem(STORAGE_KEYS.BLOGS, blogs);
  logActivity('Updated Blog Articles', 'Website Content', `${blogs.length} articles`);
  return blogs;
}

// -------------------------------------------------------------
// ENQUIRIES CRM & CUSTOMERS
// -------------------------------------------------------------

export function getStoredEnquiries() {
  return getStoredItem(STORAGE_KEYS.ENQUIRIES, INITIAL_ENQUIRIES);
}

export function saveEnquiries(enquiries) {
  setStoredItem(STORAGE_KEYS.ENQUIRIES, enquiries);
  return enquiries;
}

export function addEnquiry(data) {
  const current = getStoredEnquiries();
  const id = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const dateStr = now.toISOString().replace('T', ' ').substring(0, 16);

  const newEnquiry = {
    id,
    name: data.name || 'Anonymous Customer',
    phone: data.phone || '',
    email: data.email || '',
    categoryId: data.categoryId || data.category || 'general',
    serviceId: data.serviceId || '',
    serviceName: data.serviceName || data.serviceId || 'General Typing Inquiry',
    message: data.message || '',
    status: 'New',
    source: data.source || 'Website Contact Form',
    notes: '',
    date: dateStr
  };

  const updatedEnquiries = [newEnquiry, ...current];
  saveEnquiries(updatedEnquiries);

  syncCustomerFromEnquiry(newEnquiry);
  logActivity('New Customer Enquiry Received', 'Enquiries', `${newEnquiry.name} (${newEnquiry.serviceName})`);
  return updatedEnquiries;
}

export function updateEnquiryStatus(id, status, notes) {
  const current = getStoredEnquiries();
  const updated = current.map(e => {
    if (e.id === id) {
      return {
        ...e,
        status: status || e.status,
        notes: notes !== undefined ? notes : e.notes
      };
    }
    return e;
  });
  saveEnquiries(updated);
  logActivity(`Enquiry ${id} Status Changed`, 'Enquiries', `Status: ${status}`);
  return updated;
}

export function deleteEnquiry(id) {
  const current = getStoredEnquiries();
  const updated = current.filter(e => e.id !== id);
  saveEnquiries(updated);
  logActivity('Deleted Enquiry', 'Enquiries', id);
  return updated;
}

// CUSTOMERS
export function getStoredCustomers() {
  return getStoredItem(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
}

export function saveCustomers(customers) {
  setStoredItem(STORAGE_KEYS.CUSTOMERS, customers);
  return customers;
}

function syncCustomerFromEnquiry(enquiry) {
  if (!enquiry.phone && !enquiry.email) return;
  const customers = getStoredCustomers();
  const existingIndex = customers.findIndex(
    c => (enquiry.phone && c.phone === enquiry.phone) || (enquiry.email && c.email === enquiry.email)
  );

  const today = new Date().toISOString().substring(0, 10);

  if (existingIndex >= 0) {
    const existing = customers[existingIndex];
    const servicesList = existing.servicesRequested || [];
    if (enquiry.serviceName && !servicesList.includes(enquiry.serviceName)) {
      servicesList.push(enquiry.serviceName);
    }
    customers[existingIndex] = {
      ...existing,
      name: enquiry.name || existing.name,
      totalEnquiries: (existing.totalEnquiries || 1) + 1,
      lastEnquiryDate: today,
      servicesRequested: servicesList
    };
  } else {
    customers.unshift({
      id: `cust-${Date.now()}`,
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      totalEnquiries: 1,
      lastEnquiryDate: today,
      servicesRequested: enquiry.serviceName ? [enquiry.serviceName] : [],
      createdDate: today
    });
  }

  saveCustomers(customers);
}

// -------------------------------------------------------------
// BUSINESS SETTINGS, SEO & MEDIA LIBRARY
// -------------------------------------------------------------

export function getStoredSettings() {
  return getStoredItem(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
}

export function saveSettings(settings) {
  setStoredItem(STORAGE_KEYS.SETTINGS, settings);
  logActivity('Updated Business & WhatsApp Settings', 'Settings', 'Config updated');
  return settings;
}

export function getStoredSeo() {
  return getStoredItem(STORAGE_KEYS.SEO, INITIAL_SEO);
}

export function saveSeo(seo) {
  setStoredItem(STORAGE_KEYS.SEO, seo);
  logActivity('Updated SEO Meta & Tracking Tags', 'SEO', 'Global/Page SEO');
  return seo;
}

const INITIAL_MEDIA = [
  { id: 'media-1', title: 'Prime Time Official Logo', url: siteData.brand?.logo || '', type: 'image/jpeg', size: '240 KB', uploadedDate: '2026-01-01', category: 'Branding' },
  { id: 'media-2', title: 'Hero Banner Slide 1 - Government Clearance', url: siteData.heroBanners?.[0]?.image || '', type: 'image/jpeg', size: '480 KB', uploadedDate: '2026-01-05', category: 'Banners' },
  { id: 'media-3', title: 'Hero Banner Slide 2 - Golden Visa', url: siteData.heroBanners?.[1]?.image || '', type: 'image/jpeg', size: '512 KB', uploadedDate: '2026-01-05', category: 'Banners' },
  { id: 'media-4', title: 'Hero Banner Slide 3 - Business Setup', url: siteData.heroBanners?.[2]?.image || '', type: 'image/jpeg', size: '495 KB', uploadedDate: '2026-01-05', category: 'Banners' }
];

export function getStoredMedia() {
  return getStoredItem(STORAGE_KEYS.MEDIA, INITIAL_MEDIA);
}

export function saveMedia(media) {
  setStoredItem(STORAGE_KEYS.MEDIA, media);
  return media;
}

export function addMediaItem(item) {
  const current = getStoredMedia();
  const newItem = {
    id: `media-${Date.now()}`,
    title: item.title || 'Uploaded Image',
    url: item.url || '',
    type: item.type || 'image/jpeg',
    size: item.size || '350 KB',
    uploadedDate: new Date().toISOString().substring(0, 10),
    category: item.category || 'General'
  };
  const updated = [newItem, ...current];
  saveMedia(updated);
  logActivity('Uploaded Media Item', 'Media Library', newItem.title);
  return updated;
}

export function deleteMediaItem(id) {
  const current = getStoredMedia();
  const updated = current.filter(m => m.id !== id);
  saveMedia(updated);
  logActivity('Deleted Media Item', 'Media Library', id);
  return updated;
}

// -------------------------------------------------------------
// USERS & ROLES & ACTIVITY LOGS
// -------------------------------------------------------------

export function getStoredUsers() {
  return getStoredItem(STORAGE_KEYS.USERS, INITIAL_USERS);
}

export function saveUsers(users) {
  setStoredItem(STORAGE_KEYS.USERS, users);
  return users;
}

export function addUser(userData) {
  const current = getStoredUsers();
  const newUser = {
    id: `user-${Date.now()}`,
    name: userData.name || 'New User',
    email: userData.email || '',
    username: userData.username || `user_${Date.now()}`,
    role: userData.role || 'Admin',
    status: userData.status || 'active',
    createdDate: new Date().toISOString().substring(0, 10)
  };
  const updated = [...current, newUser];
  saveUsers(updated);
  logActivity('Created Admin User', 'Administration', `${newUser.name} (${newUser.role})`);
  return updated;
}

export function updateUser(id, data) {
  const current = getStoredUsers();
  const updated = current.map(u => u.id === id ? { ...u, ...data } : u);
  saveUsers(updated);
  logActivity('Updated Admin User', 'Administration', id);
  return updated;
}

export function deleteUser(id) {
  const current = getStoredUsers();
  const updated = current.filter(u => u.id !== id);
  saveUsers(updated);
  logActivity('Deleted Admin User', 'Administration', id);
  return updated;
}

export function getStoredActivityLogs() {
  return getStoredItem(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS);
}

export function logActivity(action, module, record) {
  try {
    const current = getStoredItem(STORAGE_KEYS.ACTIVITY_LOGS, INITIAL_ACTIVITY_LOGS);
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').substring(0, 19);
    const newLog = {
      id: `act-${Date.now()}`,
      admin: 'Super Administrator',
      action,
      module,
      record,
      ip: '127.0.0.1',
      timestamp
    };
    const updated = [newLog, ...current].slice(0, 100);
    setStoredItem(STORAGE_KEYS.ACTIVITY_LOGS, updated);
  } catch (err) {
    console.error('Failed to write activity log:', err);
  }
}

// -------------------------------------------------------------
// RESET TO SYSTEM DEFAULTS
// -------------------------------------------------------------

export function resetAllAdminStorageToDefault() {
  try {
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    localStorage.removeItem('prime_time_services_v4');
    broadcastChange('all', {});
    return true;
  } catch (err) {
    console.error('Error resetting admin storage:', err);
    return false;
  }
}

// Subscribe to storage update events across components
export function subscribeToAdminData(callback) {
  if (typeof window === 'undefined') return () => {};
  const handler = (event) => {
    callback(event.detail);
  };
  window.addEventListener(EVENT_DATA_UPDATED, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_DATA_UPDATED, handler);
    window.removeEventListener('storage', handler);
  };
}
