import { API_BASE_URL } from '@/constants/api';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for Django sessions - includes cookies
});

// Request interceptor for Django sessions
apiClient.interceptors.request.use(
  (config) => {
    // Django sessions are handled automatically via cookies
    // No need to manually add tokens
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response) {
      // Server responded with error status
      const { status } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - redirect to login
          break;
        case 403:
          // Forbidden
          break;
        case 404:
          // Not found
          break;
        case 500:
          // Server error
          break;
        default:
          break;
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;