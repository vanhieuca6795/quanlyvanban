// Cấu hình API và token cho ứng dụng
export const API_CONFIG = {
  API_URL: '635257104802-799lv5ttfumcm2cdah7v8l65ip5bd3ir.apps.googleusercontent.com',
  API_TOKEN: '15wQxSql3TFx8BYl1EggDT9ecMrB-sGzl4QvR02DWuXk'
};

// Hàm để cập nhật cấu hình API
export const updateApiConfig = (apiUrl: string, apiToken: string): void => {
  API_CONFIG.API_URL = apiUrl;
  API_CONFIG.API_TOKEN = apiToken;
  
  // Lưu cấu hình vào localStorage để sử dụng sau này
  localStorage.setItem('api_config', JSON.stringify({
    API_URL: apiUrl,
    API_TOKEN: apiToken
  }));
  
  // Tải lại trang để áp dụng cấu hình mới
  window.location.reload();
};

// Tải cấu hình từ localStorage khi khởi động
try {
  const savedConfig = localStorage.getItem('api_config');
  if (savedConfig) {
    const parsedConfig = JSON.parse(savedConfig);
    API_CONFIG.API_URL = parsedConfig.API_URL || '';
    API_CONFIG.API_TOKEN = parsedConfig.API_TOKEN || '';
  }
} catch (error) {
  console.error('Không thể tải cấu hình API từ localStorage:', error);
}