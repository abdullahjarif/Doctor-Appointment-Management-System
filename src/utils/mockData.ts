import { User, Doctor, Appointment } from '../types';

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@hospital.com',
    role: 'doctor',
    specialization: 'Cardiologist',
    photo_url: 'https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@hospital.com',
    role: 'doctor',
    specialization: 'Neurologist',
    photo_url: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@hospital.com',
    role: 'doctor',
    specialization: 'Pediatrician',
    photo_url: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    name: 'Dr. David Kim',
    email: 'david.kim@hospital.com',
    role: 'doctor',
    specialization: 'Orthopedic Surgeon',
    photo_url: 'https://images.pexels.com/photos/6749774/pexels-photo-6749774.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    name: 'Dr. Lisa Wang',
    email: 'lisa.wang@hospital.com',
    role: 'doctor',
    specialization: 'Dermatologist',
    photo_url: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '6',
    name: 'Dr. Robert Martinez',
    email: 'robert.martinez@hospital.com',
    role: 'doctor',
    specialization: 'Ophthalmologist',
    photo_url: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '7',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'patient',
    photo_url: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '8',
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    role: 'patient',
    photo_url: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=200',
    created_at: '2024-01-01T00:00:00Z',
  },
];

export const mockDoctors: Doctor[] = mockUsers
  .filter(user => user.role === 'doctor')
  .map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    email: doctor.email,
    specialization: doctor.specialization!,
    photo_url: doctor.photo_url,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 - 5.0 rating
    experience: `${Math.floor(Math.random() * 15 + 5)} years`,
  }));

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patient_id: '7',
    doctor_id: '1',
    patient_name: 'John Smith',
    doctor_name: 'Dr. Sarah Johnson',
    doctor_specialization: 'Cardiologist',
    appointment_date: '2024-09-15T10:00:00Z',
    status: 'pending',
    created_at: '2024-09-01T08:00:00Z',
  },
  {
    id: '2',
    patient_id: '8',
    doctor_id: '2',
    patient_name: 'Jane Doe',
    doctor_name: 'Dr. Michael Chen',
    doctor_specialization: 'Neurologist',
    appointment_date: '2024-09-16T14:30:00Z',
    status: 'completed',
    created_at: '2024-09-01T09:00:00Z',
  },
  {
    id: '3',
    patient_id: '7',
    doctor_id: '3',
    patient_name: 'John Smith',
    doctor_name: 'Dr. Emily Rodriguez',
    doctor_specialization: 'Pediatrician',
    appointment_date: '2024-09-20T11:00:00Z',
    status: 'cancelled',
    created_at: '2024-09-01T10:00:00Z',
  },
];

export const specializations = [
  'All Specializations',
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Dermatologist',
  'Ophthalmologist',
  'Psychiatrist',
  'General Practitioner',
  'Endocrinologist',
  'Gastroenterologist',
];
