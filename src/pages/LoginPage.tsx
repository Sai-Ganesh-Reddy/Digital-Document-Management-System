import { FileText } from 'lucide-react'
import React from 'react'
import LoginForm from '../components/auth/LoginForm'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const LoginPage:React.FC = () => {
  const {isAuthenticated} = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }


    return (
    <div className='login-page'>
      <div className='login-container'>
        <div className='logo-container'>
          <FileText className='logo-icon' />
          <h2 className='app-title'>DocuSign</h2>
          <p className='app-description'>
            Secure document management system
          </p>
        </div>

        <div className='form-container'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
