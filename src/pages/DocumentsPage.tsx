import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import DocumentList from '../components/documents/DocumentList';
import DocumentUploader from '../components/documents/DocumentUploader';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';

const DocumentsPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="py-10">
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                My Documents
              </h1>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Button
                icon={<Plus size={16} />}
                onClick={() => setShowUploadModal(true)}
              >
                Upload Document
              </Button>
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-6">
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <DocumentList />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Document"
        size="lg"
      >
        <DocumentUploader />
        <div className="mt-6 flex justify-end">
          <Button
            variant="outline"
            onClick={() => setShowUploadModal(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentsPage;