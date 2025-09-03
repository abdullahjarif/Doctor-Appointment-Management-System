import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { User, Stethoscope } from 'lucide-react';
import { specializations } from '../../utils/mockData';

const patientSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  photo_url: yup.string().url('Invalid URL').optional(),
});

const doctorSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  specialization: yup.string().required('Specialization is required'),
  photo_url: yup.string().url('Invalid URL').optional(),
});

type PatientFormData = yup.InferType<typeof patientSchema>;
type DoctorFormData = yup.InferType<typeof doctorSchema>;

const RegisterForm: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const { register: registerUser, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientFormData | DoctorFormData>({
    resolver: yupResolver(selectedRole === 'patient' ? patientSchema : doctorSchema),
  });

  const onSubmit = async (data: PatientFormData | DoctorFormData) => {
    const success = await registerUser({
      ...data,
      role: selectedRole,
    });
    
    if (success) {
      navigate(selectedRole === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    }
  };

  const handleRoleChange = (role: 'patient' | 'doctor') => {
    setSelectedRole(role);
    reset();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="mt-2 text-gray-600">Join our healthcare platform</p>
      </div>

      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => handleRoleChange('patient')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            selectedRole === 'patient'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <User className="h-4 w-4" />
          <span>Patient</span>
        </button>
        <button
          type="button"
          onClick={() => handleRoleChange('doctor')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            selectedRole === 'doctor'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Stethoscope className="h-4 w-4" />
          <span>Doctor</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          {...register('name')}
          error={errors.name?.message}
          placeholder="Enter your full name"
        />

        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
          placeholder="Create a password"
        />

        {selectedRole === 'doctor' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <select
              {...register('specialization')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select specialization</option>
              {specializations.slice(1).map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
            {errors.specialization && (
              <p className="mt-1 text-sm text-red-600">{errors.specialization.message}</p>
            )}
          </div>
        )}

        <Input
          label="Profile Photo URL (Optional)"
          {...register('photo_url')}
          error={errors.photo_url?.message}
          placeholder="Enter photo URL"
        />

        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Create {selectedRole === 'patient' ? 'Patient' : 'Doctor'} Account
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;