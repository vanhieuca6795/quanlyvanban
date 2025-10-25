import React, { useState } from 'react';
import { updateApiConfig, API_CONFIG } from './config';

const ApiConfig: React.FC = () => {
  const [apiUrl, setApiUrl] = useState(API_CONFIG.API_URL || '');
  const [apiToken, setApiToken] = useState(API_CONFIG.API_TOKEN || '');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateApiConfig(apiUrl, apiToken);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleClear = () => {
    updateApiConfig('', '');
    setApiUrl('');
    setApiToken('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-yellow-50 text-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">Cấu hình API</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="apiUrl" className="block text-gray-700 font-medium mb-2">
              URL của Cloud Function
            </label>
            <input
              type="text"
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="https://your-cloud-function-url.com"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="apiToken" className="block text-gray-700 font-medium mb-2">
              Token xác thực (nếu cần)
            </label>
            <input
              type="password"
              id="apiToken"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Token xác thực (tùy chọn)"
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Lưu cấu hình
            </button>
            
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Xóa cấu hình
            </button>
          </div>
        </form>
        
        {showSuccess && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center">
            Cấu hình đã được cập nhật thành công!
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-600">
          <p className="mb-2"><strong>Hướng dẫn:</strong></p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Nhập URL của Cloud Function đã được triển khai để lấy dữ liệu từ Google Sheet</li>
            <li>Nhập token xác thực nếu Cloud Function của bạn yêu cầu</li>
            <li>Nhấn "Lưu cấu hình" để áp dụng</li>
            <li>Sau khi lưu, ứng dụng sẽ tự động tải lại để áp dụng cấu hình mới</li>
          </ol>
        </div>
        
        <div className="mt-6 text-center">
          <a href="/" className="text-red-700 hover:text-red-800 font-medium">
            Quay lại trang chính
          </a>
        </div>
      </div>
    </div>
  );
};

export default ApiConfig;