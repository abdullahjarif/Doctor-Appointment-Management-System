import React from 'react';
import Layout from '../../components/layout/Layout';
import DoctorList from '../../components/patient/DoctorList';
import { Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const PatientDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
            <p className="text-gray-600 mt-1">Book appointments with qualified healthcare professionals</p>
          </div>
          
          <Link
            to="/patient/appointments"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar className="h-4 w-4" />
            <span>My Appointments</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">25+</p>
                <p className="text-gray-600">Expert Doctors</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">1000+</p>
                <p className="text-gray-600">Appointments</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">4.8</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                <p className="text-gray-600">Patient Rating</p>
              </div>
            </div>
          </div>
        </div>

        <DoctorList />
      </div>
    </Layout>
  );
};

export default PatientDashboard;