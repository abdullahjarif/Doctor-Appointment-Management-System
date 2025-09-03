import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import Layout from '../../components/layout/Layout';
import AppointmentCard from '../../components/shared/AppointmentCard';
import ConfirmDialog from '../../components/shared/ConfirmDialog';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientAppointments: React.FC = () => {
  const { user } = useAuth();
  const { appointments, loading, updateAppointmentStatus } = useAppointments(user?.id, 'patient');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    appointmentId: string;
    action: string;
  }>({ isOpen: false, appointmentId: '', action: '' });

  const filteredAppointments = appointments.filter(appointment => 
    selectedStatus === 'all' || appointment.status === selectedStatus
  );

  const handleCancelAppointment = (appointmentId: string) => {
    setConfirmDialog({
      isOpen: true,
      appointmentId,
      action: 'cancel',
    });
  };

  const confirmCancel = async () => {
    await updateAppointmentStatus(confirmDialog.appointmentId, 'cancelled');
    setConfirmDialog({ isOpen: false, appointmentId: '', action: '' });
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
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/patient/dashboard"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600 mt-1">Manage your scheduled appointments</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {selectedStatus === 'all' 
                ? 'No appointments found. Book your first appointment!'
                : `No ${selectedStatus} appointments found.`
              }
            </p>
            {selectedStatus === 'all' && (
              <Link
                to="/patient/dashboard"
                className="inline-block mt-4 text-blue-600 hover:text-blue-500 font-medium"
              >
                Find a Doctor →
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="patient"
                onCancel={handleCancelAppointment}
              />
            ))}
          </div>
        )}

        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog({ isOpen: false, appointmentId: '', action: '' })}
          onConfirm={confirmCancel}
          title="Cancel Appointment"
          message="Are you sure you want to cancel this appointment? This action cannot be undone."
          confirmText="Cancel Appointment"
          variant="danger"
        />
      </div>
    </Layout>
  );
};

export default PatientAppointments;
