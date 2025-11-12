// Central API base. Set EXPO_PUBLIC_API_URL to something like: http://192.168.1.50:8000
const stripTrailingSlash = (url: string) => url.replace(/\/+$/, '');
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://beysmartbackend-production.up.railway.app';
export const BASE_URL = `${stripTrailingSlash(API_BASE_URL)}/api/`;

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/api/auth/login/',
  PHONE_LOGIN: '/api/auth/phone-login/',
  VERIFY_OTP: '/api/auth/verify-otp/',
  REGISTER: '/api/auth/register/',
  REFRESH_TOKEN: '/api/auth/refresh/',
  LOGOUT: '/api/auth/logout/',
  
  // User management
  USER_PROFILE: '/api/user/profile/',
  UPDATE_PROFILE: '/api/user/update/',
  
  // Device management (if applicable)
  DEVICES: '/api/devices/',
  DEVICE_DETAIL: '/api/devices/:id/',
  
  // Scenes (if applicable)
  SCENES: '/api/scenes/',
  SCENE_DETAIL: '/api/scenes/:id/',
} as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
