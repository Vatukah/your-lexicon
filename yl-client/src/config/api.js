

const API_URL = import.meta.env.VITE_API_URL;
export const API_ENDPOINTS = {
  SIGNUP: `${API_URL}/auth/signup`,
  SIGNIN: `${API_URL}/auth/signin`, 
  LOGOUT: `${API_URL}/auth/logout`, // Endpoint for logging out
  SEARCH: `${API_URL}/search`, // Example endpoint for search 
  REFRESH_TOKEN: `${API_URL}/auth/refresh-token`, // Endpoint for refreshing tokens
    // Add more endpoints as needed
};
export const fetchApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: options.credentials || 'include', // Include cookies in the request
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || 'Unknown error');
    }
    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}