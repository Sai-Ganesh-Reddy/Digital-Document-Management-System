import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useDocuments } from '../../context/DocumentContext';

interface UploadingFile {
  file: File;
  progress: number;
  error?: string;
  status: 'uploading' | 'success' | 'error';
}

const DocumentUploader: React.FC = () => {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const { addDocument } = useDocuments();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const
    }));
    
    setUploadingFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload for each file
    newFiles.forEach(fileObj => {
      simulateUpload(fileObj.file);
    });
  }, []);

  const simulateUpload = (file: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        setUploadingFiles(prev => 
          prev.map(f => 
            f.file === file 
              ? { ...f, progress, status: 'success' } 
              : f
          )
        );
        
        // Add to documents context
        addDocument({
          name: file.name,
          type: file.type,
          size: file.size,
          thumbnail: file.type.includes('image') 
            ? URL.createObjectURL(file) 
            : undefined
        });
        
        // Remove from uploading list after a delay
        setTimeout(() => {
          setUploadingFiles(prev => prev.filter(f => f.file !== file));
        }, 2000);
      } else {
        setUploadingFiles(prev => 
          prev.map(f => 
            f.file === file ? { ...f, progress } : f
          )
        );
      }
    }, 300);
  };

  const removeFile = (file: File) => {
    setUploadingFiles(prev => prev.filter(f => f.file !== file));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm font-medium text-gray-900">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag and drop files here, or click to select files'}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          Supported formats: PDF, DOC, DOCX, JPG, PNG (up to 10MB)
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={e => e.stopPropagation()}
        >
          Select files
        </Button>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="mt-6 space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Uploading files</h3>
          <ul className="space-y-3">
            {uploadingFiles.map((fileObj, index) => (
              <li
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-3"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
                      {fileObj.file.name}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                  <div className="flex items-center">
                    {fileObj.status === 'success' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : fileObj.status === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : (
                      <button
                        onClick={() => removeFile(fileObj.file)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      fileObj.status === 'error'
                        ? 'bg-red-500'
                        : fileObj.status === 'success'
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                    }`}
                    style={{ width: `${fileObj.progress}%` }}
                  ></div>
                </div>
                {fileObj.error && (
                  <p className="mt-1 text-xs text-red-500">{fileObj.error}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;