import React from 'react';
import { FileText, Share2, CheckCircle, Clock } from 'lucide-react';
import { useDocuments } from '../../context/DocumentContext';

const DashboardStats: React.FC = () => {
  const { documents } = useDocuments();
  
  const stats = [
    {
      name: 'Total Documents',
      value: documents.length,
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      change: '+12%',
      changeType: 'increase',
    },
    {
      name: 'Signed Documents',
      value: documents.filter(doc => doc.signed).length,
      icon: <CheckCircle className="h-6 w-6 text-green-500" />,
      change: '+18%',
      changeType: 'increase',
    },
    {
      name: 'Shared Documents',
      value: documents.filter(doc => doc.shared).length,
      icon: <Share2 className="h-6 w-6 text-indigo-500" />,
      change: '+5%',
      changeType: 'increase',
    },
    {
      name: 'Pending Signatures',
      value: documents.filter(doc => !doc.signed).length,
      icon: <Clock className="h-6 w-6 text-yellow-500" />,
      change: '-3%',
      changeType: 'decrease',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {stat.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <span
                className={`font-medium ${
                  stat.changeType === 'increase'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>{' '}
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;