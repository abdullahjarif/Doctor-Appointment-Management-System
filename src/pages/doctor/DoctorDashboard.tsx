import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import Layout from '../../components/layout/Layout';
import AppointmentCard from '../../components/shared/AppointmentCard';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Filter, Calendar, Users, Clock, CheckCircle } from 'lucide-react';

const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, loading, updateAppointmentStatus } = useAppointments(user?.id, 'doctor');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    appointmentId: string;
    action: 'complete' | 'cancel';
  }>({ isOpen: false, appointmentId: '', action: 'complete' });

  const filteredAppointments = appointments.filter(appointment => {
    const statusMatch = selectedStatus === 'all' || appointment.status === selectedStatus;
    const dateMatch = !selectedDate || appointment.appointment_date.startsWith(selectedDate);
    return statusMatch && dateMatch;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  const handleCompleteAppointment = (appointmentId: string) => {
    setConfirmDialog({
      isOpen: true,
      appointmentId,
      action: 'complete',
    });
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setConfirmDialog({
      isOpen: true,
      appointmentId,
      action: 'cancel',
    });
  };

  const confirmAction = async () => {
    const status = confirmDialog.action === 'complete' ? 'completed' : 'cancelled';
    await updateAppointmentStatus(confirmDialog.appointmentId, status);
    setConfirmDialog({ isOpen: false, appointmentId: '', action: 'complete' });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" text="Loading appointments..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your appointments and patients</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-gray-600">Total Appointments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
                <p className="text-gray-600">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No appointments found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="doctor"
                onComplete={handleCompleteAppointment}
                onMarkCancelled={handleCancelAppointment}
              />
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false, appointmentId: '', action: 'complete' })}
          onConfirm={confirmAction}
          title={confirmDialog.action === 'complete' ? 'Complete Appointment' : 'Cancel Appointment'}
          message={
            confirmDialog.action === 'complete'
              ? 'Are you sure you want to mark this appointment as completed?'
              : 'Are you sure you want to cancel this appointment?'
          }
          confirmText={confirmDialog.action === 'complete' ? 'Mark Completed' : 'Cancel Appointment'}
          variant={confirmDialog.action === 'complete' ? 'success' : 'danger'}
        />
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
