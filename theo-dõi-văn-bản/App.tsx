import React, { useState, useCallback, useMemo, useEffect } from 'react';
import TaskCard from './components/TaskCard';
import TaskModal from './components/TaskModal';
import PlusIcon from './components/icons/PlusIcon';
import PoliceLogo from './components/icons/PoliceLogo';
import { Task, ProgressStatus } from './types';
import { APPROVAL_STAGES } from './constants';

// URL của Cloud Function bạn đã deploy ở Bước 2
const API_URL = 'YOUR_CLOUD_FUNCTION_TRIGGER_URL';

// Bỏ dữ liệu tĩnh initialTasks đi
// const initialTasks: Task[] = [ ... ];

const getTaskStatus = (task: Task): string => {
  if (task.progress.some(p => p.status === ProgressStatus.Rejected)) {
    return 'Trễ hạn';
  }
  if (task.progress.length > 0 && task.progress[task.progress.length - 1].status === ProgressStatus.Completed) {
    return 'Hoàn thành';
  }
  if (task.progress.some(p => p.status === ProgressStatus.InProgress || p.status === ProgressStatus.Completed)) {
    return 'Đang xử lý';
  }
  return 'Đang xử lý'; // Default for new tasks
};

const CATEGORIES = ['Tất cả', 'Đang xử lý', 'Hoàn thành', 'Trễ hạn'];

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // Sử dụng useEffect để lấy dữ liệu khi component được render lần đầu
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Tạm thời, chúng ta sẽ mô phỏng dữ liệu trả về từ API
        // Thay thế phần này bằng fetch tới API_URL thật của bạn
        
        // Dữ liệu mẫu, cấu trúc này nên được trả về từ Cloud Function của bạn
        const mockApiResponse: Task[] = [
          {
            id: 'task_1',
            name: 'Dự thảo Kế hoạch Triển khai An toàn PCCC',
            assignee: 'Nguyễn Văn A',
            issuingUnit: 'Phòng Kỹ thuật',
            progress: [
              { name: APPROVAL_STAGES[0], status: ProgressStatus.Completed, timestamp: '22/07/2024 08:15', documentNumber: '123/CV-PCCC' },
              { name: APPROVAL_STAGES[1], status: ProgressStatus.Completed, timestamp: '22/07/2024 14:00', documentNumber: '125/TTr-PCCC' },
              { name: APPROVAL_STAGES[2], status: ProgressStatus.InProgress, documentNumber: '128/BC-PCCC' },
              { name: APPROVAL_STAGES[3], status: ProgressStatus.Pending },
              { name: APPROVAL_STAGES[4], status: ProgressStatus.Pending },
              { name: APPROVAL_STAGES[5], status: ProgressStatus.Pending },
            ],
          },
          {
            id: 'task_2',
            name: 'Báo cáo Tổng kết Hoạt động 6 tháng đầu năm',
            assignee: 'Trần Thị B',
            issuingUnit: 'Phòng Kế hoạch - Tổng hợp',
            progress: [
              { name: APPROVAL_STAGES[0], status: ProgressStatus.Completed, timestamp: '21/07/2024 10:30', documentNumber: '45/BC-KH' },
              { name: APPROVAL_STAGES[1], status: ProgressStatus.Rejected, timestamp: '21/07/2024 16:45', documentNumber: '47/TTr-KH-TL' },
              { name: APPROVAL_STAGES[2], status: ProgressStatus.Pending },
              { name: APPROVAL_STAGES[3], status: ProgressStatus.Pending },
              { name: APPROVAL_STAGES[4], status: ProgressStatus.Pending },
              { name: APPROVAL_STAGES[5], status: ProgressStatus.Pending },
            ],
          },
           {
            id: 'task_3',
            name: 'Hoàn thiện hồ sơ dự án X',
            assignee: 'Lê Văn C',
            issuingUnit: 'Ban Quản lý Dự án',
            progress: [
              { name: APPROVAL_STAGES[0], status: ProgressStatus.Completed, timestamp: '23/07/2024 09:00', documentNumber: '01/HS-X' },
              { name: APPROVAL_STAGES[1], status: ProgressStatus.Completed, timestamp: '23/07/2024 11:30', documentNumber: '02/HS-X' },
              { name: APPROVAL_STAGES[2], status: ProgressStatus.Completed, timestamp: '24/07/2024 15:00', documentNumber: '03/HS-X' },
              { name: APPROVAL_STAGES[3], status: ProgressStatus.Completed, timestamp: '25/07/2024 10:00', documentNumber: '04/HS-X' },
              { name: APPROVAL_STAGES[4], status: ProgressStatus.Completed, timestamp: '26/07/2024 14:00', documentNumber: '05/HS-X' },
              { name: APPROVAL_STAGES[5], status: ProgressStatus.Completed, timestamp: '27/07/2024 16:00', documentNumber: '06/QĐ-X' },
            ],
          },
        ];
        
        // Khi bạn có API thật, hãy dùng đoạn code fetch này:
        /*
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Không thể tải dữ liệu từ server.');
        }
        const data = await response.json();
        setTasks(data);
        */
        
        // Tạm thời dùng dữ liệu mẫu
        setTasks(mockApiResponse);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);


  const handleOpenModalForEdit = useCallback((task: Task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  }, []);

  const handleOpenModalForAdd = useCallback(() => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTaskToEdit(null);
  }, []);

  const handleSaveTask = useCallback((task: Task) => {
    // TODO: Thêm logic gọi API để lưu/cập nhật dữ liệu vào Google Sheet
    console.log("Saving task (cần triển khai API):", task);
    setTasks(prevTasks => {
      const existingTaskIndex = prevTasks.findIndex(t => t.id === task.id);
      if (existingTaskIndex > -1) {
        const newTasks = [...prevTasks];
        newTasks[existingTaskIndex] = task;
        return newTasks;
      }
      return [task, ...prevTasks];
    });
    handleCloseModal();
  }, [handleCloseModal]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        if (filterStatus === 'Tất cả') return true;
        return getTaskStatus(task) === filterStatus;
      });
  }, [tasks, filterStatus]);
  
  return (
    <div className="min-h-screen bg-yellow-50 text-gray-900">
      <header className="bg-red-700 shadow-md sticky top-0 z-10 text-white">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <PoliceLogo className="w-12 h-12" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-yellow-300 leading-tight">
                THEO DÕI VĂN BẢN
              </h1>
              <p className="text-sm font-semibold text-yellow-200">Đ405TN</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Admin</span>
            <label htmlFor="admin-toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <input id="admin-toggle" type="checkbox" className="sr-only peer" checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} />
                <div className="block bg-red-900 peer-checked:bg-blue-800 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white peer-checked:bg-yellow-300 peer-checked:translate-x-full w-6 h-6 rounded-full transition"></div>
              </div>
            </label>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 border-b border-gray-300">
            {CATEGORIES.map(category => (
              <button 
                key={category}
                onClick={() => setFilterStatus(category)}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  filterStatus === category 
                  ? 'border-b-2 border-blue-800 text-blue-800' 
                  : 'text-gray-500 hover:text-blue-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1">
          {isLoading ? (
             <div className="text-center py-10"><p className="text-gray-500">Đang tải dữ liệu...</p></div>
          ) : error ? (
            <div className="text-center py-10 bg-red-100 border border-red-400 text-red-700 px-4 rounded-lg">
                <p><strong>Lỗi:</strong> {error}</p>
            </div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} isAdmin={isAdmin} onEdit={handleOpenModalForEdit} />
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg">
                <p className="text-gray-500">Không tìm thấy công việc nào phù hợp.</p>
            </div>
          )}
        </div>
      </main>

      {isAdmin && (
        <button
          onClick={handleOpenModalForAdd}
          className="fixed bottom-6 right-6 bg-red-700 text-white rounded-full p-4 shadow-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform hover:scale-110"
          aria-label="Thêm công việc mới"
        >
          <PlusIcon className="w-8 h-8" />
        </button>
      )}

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default App;