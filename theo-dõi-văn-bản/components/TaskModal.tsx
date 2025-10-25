import React, { useState, useEffect, Fragment } from 'react';
import { Task, ProgressStep, ProgressStatus } from '../types';
import { getInitialProgress } from '../constants';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  taskToEdit: Task | null;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSave, taskToEdit }) => {
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (taskToEdit) {
      setTask(JSON.parse(JSON.stringify(taskToEdit))); // Deep copy to avoid mutating original
    } else {
      setTask({
        id: `task_${Date.now()}`,
        name: '',
        assignee: '',
        issuingUnit: '',
        progress: getInitialProgress(),
      });
    }
  }, [taskToEdit, isOpen]);

  if (!isOpen || !task) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };
  
  const handleProgressInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newProgress = [...task.progress];
    newProgress[index] = { ...newProgress[index], [name]: value };
    setTask({ ...task, progress: newProgress });
  };

  const handleProgressChange = (index: number, newStatus: ProgressStatus) => {
    const newProgress = [...task.progress];
    const currentStep = newProgress[index];
    currentStep.status = newStatus;

    if (newStatus === ProgressStatus.Completed || newStatus === ProgressStatus.Rejected) {
      currentStep.timestamp = new Date().toLocaleString('vi-VN');
    } else {
      currentStep.timestamp = undefined;
    }
    
    if (newStatus === ProgressStatus.Pending) {
        currentStep.timestamp = undefined;
        currentStep.documentNumber = undefined;
    }


    // Logic to update subsequent steps
    if (newStatus === ProgressStatus.Completed && index < newProgress.length - 1) {
      newProgress[index + 1].status = ProgressStatus.InProgress;
    }
    
    // Reset statuses after the current one if it's set to pending or in progress
    if(newStatus === ProgressStatus.InProgress || newStatus === ProgressStatus.Pending) {
       for(let i = index + 1; i < newProgress.length; i++) {
           newProgress[i].status = ProgressStatus.Pending;
           newProgress[i].timestamp = undefined;
           newProgress[i].documentNumber = undefined;
       }
    }


    setTask({ ...task, progress: newProgress });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.name && task.assignee && task.issuingUnit) {
      onSave(task);
    } else {
      alert("Vui lòng điền đầy đủ các thông tin bắt buộc.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 m-4 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-blue-900">
            {taskToEdit ? 'Chỉnh sửa Công việc' : 'Thêm Công việc mới'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <i className="fa-solid fa-times text-2xl"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-800">Tên việc cần làm</label>
            <input type="text" name="name" id="name" value={task.name} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="assignee" className="block text-sm font-medium text-gray-800">Người được giao việc</label>
            <input type="text" name="assignee" id="assignee" value={task.assignee} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="issuingUnit" className="block text-sm font-medium text-gray-800">Đơn vị ký phát hành</label>
            <input type="text" name="issuingUnit" id="issuingUnit" value={task.issuingUnit} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" />
          </div>
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-blue-900">Cập nhật tiến độ</h3>
            <div className="space-y-3 mt-2">
              {task.progress.map((step, index) => (
                <div key={index} className="p-3 rounded-md bg-gray-50">
                  <p className="font-semibold text-gray-800">{step.name}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    {Object.values(ProgressStatus).map(statusValue => (
                      <div key={statusValue} className="flex items-center">
                        <input
                          type="radio"
                          id={`${task.id}_${index}_${statusValue}`}
                          name={`${task.id}_step_${index}`}
                          checked={step.status === statusValue}
                          onChange={() => handleProgressChange(index, statusValue)}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                        />
                        <label htmlFor={`${task.id}_${index}_${statusValue}`} className="ml-2 block text-sm text-gray-800">
                          {statusValue}
                        </label>
                      </div>
                    ))}
                  </div>
                   { (step.status !== ProgressStatus.Pending) && (
                      <div className="mt-2">
                        <label htmlFor={`${task.id}_${index}_docNumber`} className="block text-xs font-medium text-gray-700">
                          Văn bản số
                        </label>
                        <input
                          type="text"
                          id={`${task.id}_${index}_docNumber`}
                          name="documentNumber"
                          value={step.documentNumber || ''}
                          onChange={(e) => handleProgressInputChange(index, e)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          placeholder="Ví dụ: 123/CV-PCCC"
                        />
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t space-x-3">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Hủy</button>
            <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900">Lưu</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;