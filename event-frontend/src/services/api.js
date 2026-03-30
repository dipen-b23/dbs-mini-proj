import axios from 'axios';
import { events } from '../mock/dummyData';

// ✅ CREATE INSTANCE FIRST
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ INTERCEPTOR AFTER CREATION
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// ============ AUTH FUNCTIONS ============

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/register', userData);
    return response;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};

// ============ USER FUNCTIONS ============

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

// ADD NEW USER (Admin function)
export const addUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return response;
  } catch (error) {
    console.error('Failed to add user:', error);
    throw error;
  }
};

// GET USER'S REGISTRATIONS
export const getUserRegistrations = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/registrations`);
    return response;
  } catch (error) {
    console.error('Failed to fetch user registrations:', error);
    throw error;
  }
};

// 🔥 MOCK FUNCTIONS (for events, etc.)

export const getEvents = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: events }), 500);
  });
};

export const getEventById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = events.find((e) => e.id === parseInt(id));
      if (event) resolve({ data: event });
      else reject({ message: 'Event not found' });
    }, 500);
  });
};

export const processPayment = async (registrationId, amount, paymentMethod = 'Card') => {
  try {
    const response = await api.post('/payment', {
      registrationId,
      amount,
      paymentMethod
    });
    return response;
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
};

// ============ EVENT & REGISTRATION FUNCTIONS ============

export const registerForEvent = async (eventId, userId, ticketId) => {
  try {
    const response = await api.post(`/events/${eventId}/register`, {
      userId,
      ticketId
    });
    return response;
  } catch (error) {
    console.error('Failed to register for event:', error);
    throw error;
  }
};

export const submitFeedback = async (registrationId, rating, comments) => {
  try {
    const response = await api.post('/feedback', {
      registrationId,
      rating,
      comments
    });
    return response;
  } catch (error) {
    console.error('Failed to submit feedback:', error);
    throw error;
  }
};

// ============ ADMIN FUNCTIONS ============

export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats');
    return response;
  } catch (error) {
    console.error('Failed to fetch admin stats:', error);
    throw error;
  }
};

export const getAdminEvents = async () => {
  try {
    const response = await api.get('/admin/events');
    return response;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};

export const getAdminRegistrations = async () => {
  try {
    const response = await api.get('/admin/registrations');
    return response;
  } catch (error) {
    console.error('Failed to fetch registrations:', error);
    throw error;
  }
};

export const getAdminPayments = async () => {
  try {
    const response = await api.get('/admin/payments');
    return response;
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    throw error;
  }
};

export const getAdminFeedback = async () => {
  try {
    const response = await api.get('/admin/feedback');
    return response;
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    throw error;
  }
};

export const getAdminAttendance = async () => {
  try {
    const response = await api.get('/admin/attendance');
    return response;
  } catch (error) {
    console.error('Failed to fetch attendance:', error);
    throw error;
  }
};

export default api;