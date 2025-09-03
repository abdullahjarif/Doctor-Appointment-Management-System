import React from 'react';
import { Doctor } from '../../types';
import { Star, Calendar, User } from 'lucide-react';
import Button from '../ui/Button';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBookAppointment }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center space-x-4 mb-4">
        {doctor.photo_url ? (
          <img
            src={doctor.photo_url}
            alt={doctor.name}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-8 w-8 text-gray-400" />
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
          <p className="text-blue-600 font-medium">{doctor.specialization}</p>
          {doctor.experience && (
            <p className="text-sm text-gray-500">{doctor.experience} experience</p>
          )}
        </div>
      </div>

      {doctor.rating && (
        <div className="flex items-center space-x-1 mb-4">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium text-gray-700">{doctor.rating}</span>
          <span className="text-sm text-gray-500">(4.2k reviews)</span>
        </div>
      )}

      <Button
        onClick={() => onBookAppointment(doctor)}
        className="w-full"
        variant="primary"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Book Appointment
      </Button>
    </div>
  );
};

export default DoctorCard;