import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirmPassword?: string }>({});
  const { signup, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string; confirmPassword?: string } = {};
    
    if (!name) {
      newErrors.name = 'Name is required';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await signup(name, email);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in the AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="form-header">
        <h1 className="form-title">Create your account</h1>
        <p className="form-subtitle">
          Join our secure document management platform
        </p>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="name" className="form-label">Full Name</label>
        <div className="input-container">
          <User size={18} className="input-icon" />
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {errors.name && <p className="input-error">{errors.name}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="email" className="form-label">Email</label>
        <div className="input-container">
          <Mail size={18} className="input-icon" />
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {errors.email && <p className="input-error">{errors.email}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="input-container">
          <Lock size={18} className="input-icon" />
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {errors.password && <p className="input-error">{errors.password}</p>}
      </div>
      
      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <div className="input-container">
          <Lock size={18} className="input-icon" />
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {errors.confirmPassword && <p className="input-error">{errors.confirmPassword}</p>}
      </div>
      
      <button
        type="submit"
        className={`submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Creating account...
          </>
        ) : (
          'Sign up'
        )}
      </button>
      
      <div className="form-footer">
        <p>
          Already have an account?{' '}
          <Link to="/login" className="form-link">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;