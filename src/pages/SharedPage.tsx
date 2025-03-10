import React from 'react'
import Navbar from '../components/layout/Navbar'
import { FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const SharedPage: React.FC  = () => {

  const {isAuthenticated} = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  
  return (
    <div className='min-h-screen bg-gray-100'>
      <Navbar />

      <div className='py-10'>
        <header className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='md:flex md:items-center md:justify-between'>
            <div className='flex-1 min-w-0'>
              <h1 className='text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate'>
                Shared with Me
              </h1>
            </div>
          </div>
        </header>

        <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='px-4 py-8 sm:px-0'>
            <div className='bg-white shadow rounded-lg overflow-hidden'>
              <div className='px-4 py-5 sm:p-6'>
                <div className='text-center py-12'>
                  <FileText className='mx-auto h-12 w-12 text-gray-400'/>
                  <h3 className='mt-2 text-sm font-medium text-gray-900'>No shared document</h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Document shared With you will appear here.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SharedPage
