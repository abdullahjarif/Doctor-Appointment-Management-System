import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { User, Stethoscope } from 'lucide-react';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type LoginFormData = yup.InferType<typeof schema>;

const LoginForm: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor'>('patient');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password, selectedRole);
    if (success) {
      navigate(selectedRole === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => setSelectedRole('patient')}
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
          onClick={() => setSelectedRole('doctor')}
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
          placeholder="Enter your password"
        />

        <Button
          type="submit"
          className="w-full"
          loading={loading}
        >
          Sign In as {selectedRole === 'patient' ? 'Patient' : 'Doctor'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign up
          </a>
        </p>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
        <div className="mt-2 text-xs text-blue-700 space-y-1">
          <div><strong>Patient:</strong> john.smith@email.com / password123</div>
          <div><strong>Doctor:</strong> sarah.johnson@hospital.com / password123</div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;