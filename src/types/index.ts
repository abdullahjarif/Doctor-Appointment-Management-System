export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  photo_url?: string;
  specialization?: string;
  created_at: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  photo_url?: string;
  rating?: number;
  experience?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  photo_url?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  patient_name: string;
  doctor_name: string;
  doctor_specialization: string;
  appointment_date: string;
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'patient' | 'doctor') => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  specialization?: string;
  photo_url?: string;
}
