import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // --- Profile ---
  async getProfile() {
    try {
      const response = await apiClient.get('/auth/profile/');
      return response.data;
    } catch (e) {
      console.error('Failed to get profile', e);
      return null;
    }
  },
  
  async updateProfile(data: { username?: string, email?: string }) {
    try {
      const response = await apiClient.put('/auth/profile/', data);
      return response.data;
    } catch (e) {
      console.error('Failed to update profile', e);
      return null;
    }
  },

  // --- System Settings ---
  async getSettings() {
    try {
      const response = await apiClient.get('/courses/settings/');
      return response.data[0] || null;
    } catch (e) {
      console.error('Failed to get settings', e);
      return null;
    }
  },

  async updateSettings(id: number, data: { institution_name?: string, logo_url?: string }) {
    try {
      const response = await apiClient.put(`/courses/settings/${id}/`, data);
      return response.data;
    } catch (e) {
      console.error('Failed to update settings', e);
      return null;
    }
  },

  // --- Departments ---
  async listDepartments() {
    try {
      const response = await apiClient.get('/courses/departments/');
      return response.data;
    } catch (e) {
      console.error('Failed to list departments', e);
      return [];
    }
  },

  async createDepartment(data: { name: string, code: string }) {
    try {
      const response = await apiClient.post('/courses/departments/', data);
      return response.data;
    } catch (e) {
      console.error('Failed to create department', e);
      return null;
    }
  },

  async deleteDepartment(id: number) {
    try {
      await apiClient.delete(`/courses/departments/${id}/`);
      return true;
    } catch (e) {
      console.error('Failed to delete department', e);
      return false;
    }
  },

  // --- Programmes ---
  async listProgrammes() {
    try {
      const response = await apiClient.get('/courses/programmes/');
      return response.data;
    } catch (e) {
      console.error('Failed to list programmes', e);
      return [];
    }
  },

  async createProgramme(data: { department: number, name: string, code: string }) {
    try {
      const response = await apiClient.post('/courses/programmes/', data);
      return response.data;
    } catch (e) {
      console.error('Failed to create programme', e);
      return null;
    }
  },

  async deleteProgramme(id: number) {
    try {
      await apiClient.delete(`/courses/programmes/${id}/`);
      return true;
    } catch (e) {
      console.error('Failed to delete programme', e);
      return false;
    }
  },

  // --- Courses ---
  async listCourses() {
    try {
      const response = await apiClient.get('/courses/courses/');
      return response.data;
    } catch (e) {
      console.error('Failed to list courses', e);
      return [];
    }
  },

  async createCourse(data: { programme: number, name: string, code: string, coordinator?: number }) {
    try {
      const response = await apiClient.post('/courses/courses/', data);
      return response.data;
    } catch (e) {
      console.error('Failed to create course', e);
      return null;
    }
  },

  async updateCourse(id: number, data: { coordinator?: number, name?: string, code?: string }) {
    try {
      const response = await apiClient.patch(`/courses/courses/${id}/`, data);
      return response.data;
    } catch (e) {
      console.error('Failed to update course', e);
      return null;
    }
  },

  async getCourse(id: number) {
    try {
      const response = await apiClient.get(`/courses/courses/${id}/`);
      return response.data;
    } catch (e) {
      console.error('Failed to get course', e);
      return null;
    }
  },

  async deleteCourse(id: number) {
    try {
      await apiClient.delete(`/courses/courses/${id}/`);
      return true;
    } catch (e) {
      console.error('Failed to delete course', e);
      return false;
    }
  },

  // --- Documents (Outline, CQI, JSU) ---
  async getDocument(courseId: number, type: 'outline' | 'cqi' | 'jsu') {
    try {
      const response = await apiClient.get(`/courses/courses/${courseId}/${type}/`);
      return { 
        content: response.data.content, 
        lastUpdated: new Date(response.data.last_updated).getTime() 
      };
    } catch (e) {
      console.error(`Failed to load ${type}`, e);
      return undefined;
    }
  },

  async saveDocument(courseId: number, type: 'outline' | 'cqi' | 'jsu', content: string) {
    try {
      let contentData = content;
      try {
        contentData = JSON.parse(content);
      } catch (e) {}

      const response = await apiClient.put(`/courses/courses/${courseId}/${type}/`, {
        content: contentData
      });
      return { 
        success: true, 
        lastUpdated: new Date(response.data.last_updated).getTime() 
      };
    } catch (e) {
      console.error(`Save ${type} failed`, e);
      return { success: false, lastUpdated: Date.now() };
    }
  },

  async generatePdf() {
    return { success: false, error: 'Please use Ctrl+P or Cmd+P to print to PDF from the browser.' };
  },

  // --- Users (PBAC) ---
  async listUsers() {
    try {
      const response = await apiClient.get('/auth/users/');
      return response.data;
    } catch (e) {
      console.error('Failed to list users', e);
      return [];
    }
  },

  async updateUserPermissions(id: number, permissions: string[]) {
    try {
      const response = await apiClient.put(`/auth/users/${id}/`, { permissions });
      return response.data;
    } catch (e) {
      console.error('Failed to update user permissions', e);
      return null;
    }
  }
};
