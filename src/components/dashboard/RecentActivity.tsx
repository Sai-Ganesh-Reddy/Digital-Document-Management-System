import React from 'react';
import { useDocuments } from '../../context/DocumentContext';
import { Document } from '../../types';
import { FileText, Upload, Pencil, Share2 } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const { documents } = useDocuments();
  
  // Sort documents by last modified date
  const sortedDocuments = [...documents].sort(
    (a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
  ).slice(0, 5);
  
  const getActivityType = (doc: Document): { type: string; icon: React.ReactElement; color: string } => {
    if (doc.signed && new Date(doc.lastModified).getTime() === new Date(doc.uploadDate).getTime()) {
      return {
        type: 'Uploaded',
        icon: <Upload className="h-5 w-5" />,
        color: 'bg-blue-100 text-blue-600',
      };
    } else if (doc.signed) {
      return {
        type: 'Signed',
        icon: <Pencil className="h-5 w-5" />,
        color: 'bg-green-100 text-green-600',
      };
    } else if (doc.shared) {
      return {
        type: 'Shared',
        icon: <Share2 className="h-5 w-5" />,
        color: 'bg-purple-100 text-purple-600',
      };
    } else {
      return {
        type: 'Uploaded',
        icon: <Upload className="h-5 w-5" />,
        color: 'bg-blue-100 text-blue-600',
      };
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Recent Activity
        </h3>
      </div>
      <div className="border-t border-gray-200">
        <ul className="divide-y divide-gray-200">
          {sortedDocuments.length > 0 ? (
            sortedDocuments.map((doc) => {
              const activity = getActivityType(doc);
              
              return (
                <li key={doc.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${activity.color}`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {activity.type} {doc.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(doc.lastModified)}
                      </p>
                    </div>
                    <div>
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-12 text-center">
              <p className="text-sm text-gray-500">No recent activity</p>
            </li>
          )}
        </ul>
      </div>
      {sortedDocuments.length > 0 && (
        <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all activity
          </a>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
