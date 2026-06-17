export const API_BASE_URL =
  window.location.host === 'localhost:5501' ? 'http://localhost:8080' : ''

export const API_ENDPOINTS = {
  GET_BRANDING: API_BASE_URL + '/api/services/public/branding-settings',
  GET_MAIN_MENU: API_BASE_URL + '/api/services/public/main-menu',
  GET_LOCATIONS: API_BASE_URL + '/api/public/locations',
  GET_FACILITIES: API_BASE_URL + '/api/public/facilities',
  GET_TOUR_SCRIPT: API_BASE_URL + '/api/services/public/tour-script',
  GET_PLUGINS: API_BASE_URL + '/api/public/plugins',
  GET_PLUGIN_CONTENT: API_BASE_URL + '/api/public/plugin-content/:id',
  GET_SERVER_STATE: API_BASE_URL + '/api/services/public/server-state',
}

export const ALLOWED_DOMAIN_FOR_PLUGINS = ['localhost:5501', 'vr.iuh.edu.vn']
