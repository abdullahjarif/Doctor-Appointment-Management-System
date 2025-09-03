import { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { mockAppointments, generateId } from '../utils/mockData';
import toast from 'react-hot-toast';

export const useAppointments = (userId?: string, userRole?: 'patient' | 'doctor') => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [userId, userRole]);

  const fetchAppointments = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredAppointments = [...mockAppointments];
    
    if (userId && userRole) {
      if (userRole === 'patient') {
        filteredAppointments = mockAppointments.filter(apt => apt.patient_id === userId);
      } else if (userRole === 'doctor') {
        filteredAppointments = mockAppointments.filter(apt => apt.doctor_id === userId);
      }
    }
    
    setAppointments(filteredAppointments);
    setLoading(false);
  };

  const createAppointment = async (doctorId: string, patientId: string, appointmentDate: string, doctorName: string, doctorSpecialization: string, patientName: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newAppointment: Appointment = {
        id: generateId(),
        patient_id: patientId,
        doctor_id: doctorId,
        patient_name: patientName,
        doctor_name: doctorName,
        doctor_specialization: doctorSpecialization,
        appointment_date: appointmentDate,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      mockAppointments.push(newAppointment);
      setAppointments(prev => [...prev, newAppointment]);
      toast.success('Appointment booked successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to book appointment');
      return false;
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, newStatus: 'pending' | 'completed' | 'cancelled'): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const appointmentIndex = mockAppointments.findIndex(apt => apt.id === appointmentId);
      if (appointmentIndex !== -1) {
        mockAppointments[appointmentIndex].status = newStatus;
        setAppointments(prev => 
          prev.map(apt => 
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
          )
        );
        toast.success(`Appointment ${newStatus} successfully!`);
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Failed to update appointment');
      return false;
    }
  };

  return {
    appointments,
    loading,
    createAppointment,
    updateAppointmentStatus,
    refetch: fetchAppointments,
  };
};
