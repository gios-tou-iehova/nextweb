const API_BASE = ('/api/proxy');

export const api = {
  // Services
  getServices: async () => {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },
  
  // Barbers
  getBarbers: async () => {
    const res = await fetch(`${API_BASE}/barbers`);
    return res.json();
  },
  
  // Appointments
  createAppointment: async (data: any, token: string) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  
  getAppointments: async (token: string) => {
    const res = await fetch(`${API_BASE}/appointments`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return res.json();
  },
  
  // Auth
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },
  
  register: async (userData: any) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res.json();
  },
};