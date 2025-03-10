import { FileText } from 'lucide-react'
import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import SignupForm from '../components/auth/SignupForm'

const SignupPage: React.FC = () => {
  const {isAuthenticated} = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <div className='signup-page'>
      <div className='signup-contianer'>
        <div className='logo-contianer'>
          <FileText className='logo-icon' />
          <h2 className='app-title'>DocuSign</h2>
          <p className="app-description">
            Secure document management system
          </p>
        </div>

        <div className='form-container'>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}

export default SignupPage
