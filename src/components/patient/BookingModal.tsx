import React, { useState } from 'react';
import { Doctor } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useAppointments } from '../../hooks/useAppointments';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { Calendar } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, doctor }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [booking, setBooking] = useState(false);
  const { user } = useAuth();
  const { createAppointment } = useAppointments();

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  ];

  const handleBooking = async () => {
    if (!doctor || !user || !selectedDate || !selectedTime) return;

    setBooking(true);
    const appointmentDate = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();
    
    const success = await createAppointment(
      doctor.id,
      user.id,
      appointmentDate,
      doctor.name,
      doctor.specialization,
      user.name
    );

    if (success) {
      onClose();
      setSelectedDate('');
      setSelectedTime('');
    }
    setBooking(false);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book Appointment"
    >
      {doctor && (
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            {doctor.photo_url ? (
              <img
                src={doctor.photo_url}
                alt={doctor.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gray-400" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-blue-600">{doctor.specialization}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={today}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 px-3 text-sm rounded-lg border transition-all ${
                    selectedTime === time
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              loading={booking}
              className="flex-1"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BookingModal;