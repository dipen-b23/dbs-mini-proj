import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/api';

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        // Register
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          roleId: 3 // Student by default
        });

        alert('Registration successful! Please log in.');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setIsRegister(false);
      } else {
        // Login
        const result = await loginUser({
          email: formData.email,
          password: formData.password
        });

        if (result.data.success) {
          login(result.data.user);
          navigate('/dashboard');
        } else {
          setError('Invalid email or password');
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center p-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-10" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-600 rounded-full blur-3xl opacity-10" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {isRegister ? 'Join Eventify' : 'Welcome Back'}
          </h1>
          <p className="text-slate-400">
            {isRegister ? 'Create your account to register for events' : 'Sign in to your account'}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 mb-6 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1E293B]/70 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 space-y-4">

          {isRegister && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition hover:scale-[1.02]"
          >
            {loading ? 'Processing...' : isRegister ? 'Create Account' : 'Sign In'}
          </button>

        </form>

        <div className="text-center mt-6 text-slate-400">
          {isRegister ? (
            <>
              Already have an account?{' '}
              <button
                onClick={() => {
                  setIsRegister(false);
                  setError('');
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                onClick={() => {
                  setIsRegister(true);
                  setError('');
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;