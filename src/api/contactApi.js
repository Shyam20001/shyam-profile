import axios from 'axios';

const API_URL = import.meta.env.VITE_URL; // Your Cloudflare function URL

export const submitContactForm = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact`, data); 

    // Check if the response status is in the 2xx range
    if (response.status >= 200 && response.status < 300) {
      return { success: true }; // Return success indication
    }
    return { success: false }; // Handle other non-success cases
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
