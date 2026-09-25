import { siteData } from '../data/siteData';

const STORAGE_KEY = 'prime_time_services_v4';

/**
 * Fetch services from localStorage or fallback to default siteData services
 */
export function getStoredServices() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading services from localStorage:', err);
  }
  return siteData.services;
}

/**
 * Save updated services array to localStorage
 */
export function saveStoredServices(services) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch (err) {
    console.error('Error saving services to localStorage:', err);
  }
}

/**
 * Add a new service to storage
 */
export function addService(newServiceData) {
  const current = getStoredServices();
  const id = `service-custom-${Date.now()}`;
  const formattedService = {
    id,
    categoryId: newServiceData.categoryId || 'icp',
    icon: newServiceData.icon || 'FileText',
    image: newServiceData.image || '',
    title: {
      en: newServiceData.titleEn || 'New Service',
      ar: newServiceData.titleAr || newServiceData.titleEn || 'خدمة جديدة'
    },
    desc: {
      en: newServiceData.descEn || '',
      ar: newServiceData.descAr || newServiceData.descEn || ''
    },
    processingTime: {
      en: newServiceData.processingTimeEn || '1-2 Business Days',
      ar: newServiceData.processingTimeAr || '1-2 أيام عمل'
    },
    govtFeeRange: {
      en: newServiceData.govtFeeRangeEn || 'AED 200 - 400',
      ar: newServiceData.govtFeeRangeAr || '200 - 400 درهم'
    },
    estimatedCostStandard: Number(newServiceData.estimatedCostStandard) || 250,
    estimatedCostExpress: Number(newServiceData.estimatedCostExpress) || 350,
    requirements: {
      en: Array.isArray(newServiceData.requirementsEn) 
        ? newServiceData.requirementsEn 
        : (newServiceData.requirementsEn ? newServiceData.requirementsEn.split('\n').filter(Boolean) : []),
      ar: Array.isArray(newServiceData.requirementsAr) 
        ? newServiceData.requirementsAr 
        : (newServiceData.requirementsAr ? newServiceData.requirementsAr.split('\n').filter(Boolean) : [])
    }
  };

  const updatedList = [formattedService, ...current];
  saveStoredServices(updatedList);
  return updatedList;
}

/**
 * Update an existing service by ID
 */
export function updateService(serviceId, updatedData) {
  const current = getStoredServices();
  const updatedList = current.map(item => {
    if (item.id === serviceId) {
      return {
        ...item,
        categoryId: updatedData.categoryId || item.categoryId,
        icon: updatedData.icon || item.icon,
        image: updatedData.image !== undefined ? updatedData.image : item.image,
        title: {
          en: updatedData.titleEn || item.title?.en || '',
          ar: updatedData.titleAr || item.title?.ar || ''
        },
        desc: {
          en: updatedData.descEn || item.desc?.en || '',
          ar: updatedData.descAr || item.desc?.ar || ''
        },
        processingTime: {
          en: updatedData.processingTimeEn || item.processingTime?.en || '',
          ar: updatedData.processingTimeAr || item.processingTime?.ar || ''
        },
        govtFeeRange: {
          en: updatedData.govtFeeRangeEn || item.govtFeeRange?.en || '',
          ar: updatedData.govtFeeRangeAr || item.govtFeeRange?.ar || ''
        },
        estimatedCostStandard: Number(updatedData.estimatedCostStandard) || item.estimatedCostStandard || 0,
        estimatedCostExpress: Number(updatedData.estimatedCostExpress) || item.estimatedCostExpress || 0,
        requirements: {
          en: Array.isArray(updatedData.requirementsEn) 
            ? updatedData.requirementsEn 
            : (updatedData.requirementsEn ? updatedData.requirementsEn.split('\n').filter(Boolean) : (item.requirements?.en || [])),
          ar: Array.isArray(updatedData.requirementsAr) 
            ? updatedData.requirementsAr 
            : (updatedData.requirementsAr ? updatedData.requirementsAr.split('\n').filter(Boolean) : (item.requirements?.ar || []))
        }
      };
    }
    return item;
  });

  saveStoredServices(updatedList);
  return updatedList;
}

/**
 * Delete a service by ID
 */
export function deleteService(serviceId) {
  const current = getStoredServices();
  const updatedList = current.filter(item => item.id !== serviceId);
  saveStoredServices(updatedList);
  return updatedList;
}

/**
 * Reset stored services to initial defaults
 */
export function resetToDefaultServices() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting services in localStorage:', err);
  }
  return siteData.services;
}
