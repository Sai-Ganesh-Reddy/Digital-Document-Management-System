import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in the AuthContext
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-header">
        <h1 className="form-title">Sign in to your account</h1>
        <p className="form-subtitle">
          Access your documents securely
        </p>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            required
          />
        </div>
        {errors.password && <p className="input-error">{errors.password}</p>}
      </div>
      
      <div className="form-options">
        <div className="remember-me">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="checkbox"
          />
          <label htmlFor="remember-me" className="checkbox-label">
            Remember me
          </label>
        </div>
        
        <div>
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>
        </div>
      </div>
      
      <button
        type="submit"
        className={`submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>
      
      <div className="form-footer">
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="form-link">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;