import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  File,  
  Download, 
  Trash2, 
  Share, 
  Pencil,
  Check
} from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';
import { Document } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

const DocumentList: React.FC = () => {
  const { documents, isLoading, removeDocument, signDocument, shareDocument } = useDocuments();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [sharePermission, setSharePermission] = useState('view');
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by uploading a document.
        </p>
        <div className="mt-6">
          <Button>Upload a document</Button>
        </div>
      </div>
    );
  }

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <FileText className="h-10 w-10 text-red-500" />;
    } else if (type.includes('image')) {
      return <Image className="h-10 w-10 text-blue-500" />;
    } else if (type.includes('word')) {
      return <FileText className="h-10 w-10 text-blue-500" />;
    } else {
      return <File className="h-10 w-10 text-gray-500" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleDelete = () => {
    if (selectedDocument) {
      removeDocument(selectedDocument.id);
      setShowDeleteModal(false);
      setSelectedDocument(null);
    }
  };

  const handleShare = () => {
    setIsSharing(true);
    
    // Simulate API call
    setTimeout(() => {
      if (selectedDocument) {
        shareDocument(selectedDocument.id);
        setIsSharing(false);
        setShareSuccess(true);
        
        // Reset after showing success message
        setTimeout(() => {
          setShowShareModal(false);
          setSelectedDocument(null);
          setShareEmail('');
          setSharePermission('view');
          setShareSuccess(false);
        }, 2000);
      }
    }, 1500);
  };

  const handleSign = () => {
    if (selectedDocument) {
      signDocument(selectedDocument.id);
      setShowSignModal(false);
      setSelectedDocument(null);
    }
  };

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Size
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {documents.map((document) => (
              <tr key={document.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      {document.thumbnail ? (
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={document.thumbnail}
                          alt={document.name}
                        />
                      ) : (
                        getFileIcon(document.type)
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {document.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {document.type.split('/')[1]}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(document.uploadDate)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Last modified: {formatDate(document.lastModified)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatFileSize(document.size)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {document.signed ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Signed
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Unsigned
                      </span>
                    )}
                    {document.shared && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Shared
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedDocument(document);
                        setShowSignModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                      title="Sign"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDocument(document);
                        setShowShareModal(true);
                      }}
                      className="text-green-600 hover:text-green-900"
                      title="Share"
                    >
                      <Share size={18} />
                    </button>
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Download"
                    >
                      <Download size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDocument(document);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Document"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete "{selectedDocument?.name}"? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Share Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => {
          if (!isSharing) {
            setShowShareModal(false);
            setShareSuccess(false);
          }
        }}
        title="Share Document"
        size="md"
      >
        {shareSuccess ? (
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Document shared successfully</h3>
            <p className="mt-1 text-sm text-gray-500">
              An email notification has been sent to {shareEmail}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Share "{selectedDocument?.name}" with others by email
            </p>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Enter email address"
              />
            </div>
            
            <div>
              <label htmlFor="permission" className="block text-sm font-medium text-gray-700">
                Permission
              </label>
              <select
                id="permission"
                value={sharePermission}
                onChange={(e) => setSharePermission(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="view">Can view</option>
                <option value="comment">Can comment</option>
                <option value="edit">Can edit</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowShareModal(false)}
                disabled={isSharing}
              >
                Cancel
              </Button>
              <Button
                onClick={handleShare}
                isLoading={isSharing}
                disabled={!shareEmail || isSharing}
              >
                Share
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Sign Document Modal */}
      <Modal
        isOpen={showSignModal}
        onClose={() => setShowSignModal(false)}
        title="Sign Document"
        size="lg"
      >
        <SignatureCanvas onSign={handleSign} />
      </Modal>
    </div>
  );
};

interface SignatureCanvasProps {
  onSign: () => void;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ onSign }) => {
  const [color, setColor] = useState('#000000');
  const [signatureType, setSignatureType] = useState<'draw' | 'type'>('draw');
  const [typedSignature, setTypedSignature] = useState('');
  const [fontFamily, setFontFamily] = useState('cursive');
  
  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            signatureType === 'draw'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSignatureType('draw')}
        >
          Draw
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-md ${
            signatureType === 'type'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => setSignatureType('type')}
        >
          Type
        </button>
      </div>
      
      {signatureType === 'draw' ? (
        <div className="space-y-4">
          <div className="border-2 border-gray-300 rounded-md h-40 flex items-center justify-center bg-white">
            <p className="text-gray-400 text-sm">Draw your signature here</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="color"
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="mt-1 h-8 w-8 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <button className="text-sm text-blue-600 hover:text-blue-500">
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label htmlFor="typed-signature" className="block text-sm font-medium text-gray-700">
              Type your signature
            </label>
            <input
              type="text"
              id="typed-signature"
              value={typedSignature}
              onChange={(e) => setTypedSignature(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Your name"
            />
          </div>
          
          <div>
            <label htmlFor="font-family" className="block text-sm font-medium text-gray-700">
              Font Style
            </label>
            <select
              id="font-family"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="cursive">Signature</option>
              <option value="serif">Formal</option>
              <option value="sans-serif">Simple</option>
            </select>
          </div>
          
          <div className="border-2 border-gray-300 rounded-md p-4 h-24 flex items-center justify-center bg-white">
            {typedSignature ? (
              <p style={{ fontFamily, color, fontSize: '24px' }}>{typedSignature}</p>
            ) : (
              <p className="text-gray-400 text-sm">Your signature will appear here</p>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        <Button
          variant="outline"
          onClick={() => {}}
        >
          Cancel
        </Button>
        <Button
          onClick={onSign}
          disabled={signatureType === 'type' && !typedSignature}
        >
          Apply Signature
        </Button>
      </div>
    </div>
  );
};

export default DocumentList;