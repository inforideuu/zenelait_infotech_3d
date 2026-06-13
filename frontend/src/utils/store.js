// Unified Asynchronous REST API Bridge & Sync Engine with MySQL Backend

const BACKEND_URL = 'http://127.0.0.1:8000/api';

const STORAGE_KEYS = {
  ABOUT: 'aura_cms_about',
  SERVICES: 'aura_cms_services',
  CAPABILITIES: 'aura_cms_capabilities',
  PROJECTS: 'aura_cms_projects',
  CAREERS: 'aura_cms_careers',
  INQUIRIES: 'aura_cms_inquiries',
  TESTIMONIALS: 'aura_cms_testimonials'
};

// Background sync function to fetch all latest data from Django + MySQL
export const syncAllFromBackend = async () => {
  try {
    const endpoints = {
      ABOUT: 'about/',
      SERVICES: 'services/',
      CAPABILITIES: 'capabilities/',
      PROJECTS: 'projects/',
      CAREERS: 'careers/',
      INQUIRIES: 'inquiries/',
      TESTIMONIALS: 'testimonials/'
    };

    const fetchPromises = Object.entries(endpoints).map(async ([key, path]) => {
      const response = await fetch(`${BACKEND_URL}/${path}`);
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(data));
      }
    });

    await Promise.all(fetchPromises);
    // Notify all active subscriber views to re-render
    window.dispatchEvent(new Event('aura_store_update'));
  } catch (error) {
    console.error('Error syncing data from Django backend:', error);
  }
};

// Launch background sync immediately on load
syncAllFromBackend();

// Periodically sync every 15 seconds to keep tabs aligned in real time
setInterval(syncAllFromBackend, 15000);

export const store = {
  // 1. ABOUT CMS Methods
  getAbout: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ABOUT)) || { mission: '', vision: '', history: '', team: [] };
  },
  updateAbout: async (updatedAbout) => {
    try {
      const response = await fetch(`${BACKEND_URL}/about/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAbout)
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(STORAGE_KEYS.ABOUT, JSON.stringify(data));
        window.dispatchEvent(new Event('aura_store_update'));
        return data;
      }
    } catch (e) {
      console.error(e);
    }
    return updatedAbout;
  },

  // 2. SERVICES CRUD Methods
  getServices: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)) || [];
  },
  addService: async (service) => {
    try {
      const response = await fetch(`${BACKEND_URL}/services/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(service)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateService: async (id, updatedService) => {
    try {
      const response = await fetch(`${BACKEND_URL}/services/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedService)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  deleteService: async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/services/${id}/`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 3. CAPABILITIES CRUD Methods
  getCapabilities: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CAPABILITIES)) || [];
  },
  addCapability: async (cap) => {
    try {
      const response = await fetch(`${BACKEND_URL}/capabilities/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cap)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateCapability: async (id, updatedCap) => {
    try {
      const response = await fetch(`${BACKEND_URL}/capabilities/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCap)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  deleteCapability: async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/capabilities/${id}/`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 4. PROJECTS CRUD Methods
  getProjects: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [];
  },
  addProject: async (project) => {
    try {
      const response = await fetch(`${BACKEND_URL}/projects/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateProject: async (id, updatedProject) => {
    try {
      const response = await fetch(`${BACKEND_URL}/projects/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  deleteProject: async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/projects/${id}/`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 5. CAREERS CRUD Methods
  getCareers: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREERS)) || [];
  },
  addCareer: async (career) => {
    try {
      const response = await fetch(`${BACKEND_URL}/careers/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(career)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateCareer: async (id, updatedCareer) => {
    try {
      const response = await fetch(`${BACKEND_URL}/careers/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCareer)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  deleteCareer: async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/careers/${id}/`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 6. INQUIRIES Forms CRUD Methods
  getInquiries: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES)) || [];
  },
  addInquiry: async (inquiry) => {
    try {
      const response = await fetch(`${BACKEND_URL}/inquiries/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inquiry)
      });
      if (response.ok) {
        const data = await response.json();
        await syncAllFromBackend();
        return data;
      }
    } catch (e) {
      console.error(e);
    }
  },
  deleteInquiry: async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/inquiries/${id}/`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 7. TESTIMONIALS CRUD Methods
  getTestimonials: () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) || [];
  },
  addTestimonial: async (testimonial) => {
    try {
      const response = await fetch(`${BACKEND_URL}/testimonials/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonial)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  updateTestimonial: async (id, updatedTestimonial) => {
    try {
      const response = await fetch(`${BACKEND_URL}/testimonials/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTestimonial)
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },
  deleteTestimonial: async (id) => {
    try {
      const response = await fetch(`${BACKEND_URL}/testimonials/${id}/`, {
        method: 'DELETE'
      });
      if (response.ok) {
        await syncAllFromBackend();
      }
    } catch (e) {
      console.error(e);
    }
  },

  // 8. Auth Methods
  login: async (username, password) => {
    const response = await fetch(`${BACKEND_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Authentication denied.');
    }
    return data;
  },
  requestPasswordResetOtp: async (phone_number) => {
    const response = await fetch(`${BACKEND_URL}/forgot-password/request/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to dispatch recovery OTP SMS.');
    }
    return data;
  },
  verifyPasswordResetOtp: async (phone_number, otp) => {
    const response = await fetch(`${BACKEND_URL}/forgot-password/verify/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number, otp })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Invalid OTP code.');
    }
    return data;
  },
  resetPassword: async (phone_number, otp, new_password) => {
    const response = await fetch(`${BACKEND_URL}/forgot-password/reset/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number, otp, new_password })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to update administrative credentials.');
    }
    return data;
  }
};
