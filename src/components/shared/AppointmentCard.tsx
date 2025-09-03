import React from 'react';
import { Appointment } from '../../types';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import Button from '../ui/Button';

interface AppointmentCardProps {
  appointment: Appointment;
  userRole: 'patient' | 'doctor';
  onCancel?: (appointmentId: string) => void;
  onComplete?: (appointmentId: string) => void;
  onMarkCancelled?: (appointmentId: string) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  userRole,
  onCancel,
  onComplete,
  onMarkCancelled,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          {userRole === 'patient' ? (
            <Stethoscope className="h-8 w-8 text-blue-600" />
          ) : (
            <User className="h-8 w-8 text-green-600" />
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {userRole === 'patient' ? appointment.doctor_name : appointment.patient_name}
            </h3>
            {userRole === 'patient' && (
              <p className="text-blue-600 text-sm">{appointment.doctor_specialization}</p>
            )}
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formatDate(appointment.appointment_date)}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{formatTime(appointment.appointment_date)}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        {userRole === 'patient' && appointment.status === 'pending' && onCancel && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel(appointment.id)}
            className="flex-1"
          >
            Cancel
          </Button>
        )}
        
        {userRole === 'doctor' && appointment.status === 'pending' && (
          <>
            {onComplete && (
              <Button
                variant="success"
                size="sm"
                onClick={() => onComplete(appointment.id)}
                className="flex-1"
              >
                Mark Completed
              </Button>
            )}
            {onMarkCancelled && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onMarkCancelled(appointment.id)}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;