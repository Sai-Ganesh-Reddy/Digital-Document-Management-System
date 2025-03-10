import React, { createContext, useState, useContext, useEffect } from 'react';
import { Document } from '../types';
import { useAuth } from './AuthContext';

interface DocumentContextType {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  addDocument: (document: Omit<Document, 'id' | 'uploadDate' | 'lastModified' | 'signed' | 'shared' | 'ownerId'>) => void;
  removeDocument: (id: string) => void;
  signDocument: (id: string) => void;
  shareDocument: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType>({
  documents: [],
  isLoading: false,
  error: null,
  addDocument: () => {},
  removeDocument: () => {},
  signDocument: () => {},
  shareDocument: () => {},
});


// Function to return mock documents
const getMockDocuments = (): Document[] => [
  {
    id: '1',
    name: 'Contract Agreement.pdf',
    type: 'application/pdf',
    size: 2500000,
    uploadDate: new Date('2023-10-15'),
    lastModified: new Date('2023-10-15'),
    signed: false,
    shared: false,
    ownerId: '1',
    thumbnail: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80',
  },
  {
    id: '2',
    name: 'Business Proposal.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    size: 1800000,
    uploadDate: new Date('2023-09-28'),
    lastModified: new Date('2023-10-10'),
    signed: true,
    shared: true,
    ownerId: '1',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=400&h=400&q=80',
  },
];

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));

        if (user) {
          // Filter documents for the current user
          const userDocuments = getMockDocuments().filter(doc => doc.ownerId === user.id);
          setDocuments(userDocuments);
        } else {
          setDocuments([]);
        }
      } catch {
        setError('Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, [user]);

  const addDocument = (newDoc: Omit<Document, 'id' | 'uploadDate' | 'lastModified' | 'signed' | 'shared' | 'ownerId'>) => {
    if (!user) return;

    const document: Document = {
      ...newDoc,
      id: Date.now().toString(),
      uploadDate: new Date(),
      lastModified: new Date(),
      signed: false,
      shared: false,
      ownerId: user.id,
    };

    setDocuments(prev => [document, ...prev]);
  };

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const signDocument = (id: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, signed: true, lastModified: new Date() } : doc
      )
    );
  };

  const shareDocument = (id: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, shared: true, lastModified: new Date() } : doc
      )
    );
  };

  return (
    <DocumentContext.Provider
      value={{
        documents,
        isLoading,
        error,
        addDocument,
        removeDocument,
        signDocument,
        shareDocument,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => useContext(DocumentContext);