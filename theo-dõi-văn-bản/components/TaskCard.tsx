
import React, { useState, useMemo } from 'react';
import { Task, ProgressStatus } from '../types';
import ProgressTracker from './ProgressTracker';
import PencilIcon from './icons/PencilIcon';
import WarningIcon from './icons/WarningIcon';

interface TaskCardProps {
  task: Task;
  isAdmin: boolean;
  onEdit: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, isAdmin, onEdit }) => {
  const isRejected = useMemo(() => task.progress.some(p => p.status === ProgressStatus.Rejected), [task.progress]);
  const isInProgress = useMemo(() => task.progress.some(p => p.status === ProgressStatus.InProgress), [task.progress]);
  
  const [isExpanded, setIsExpanded] = useState(isRejected || isInProgress);

  const statusInfo = useMemo(() => {
    const rejectedStep = task.progress.find(p => p.status === ProgressStatus.Rejected);
    if (rejectedStep) {
      return {
        text: `Bị trả lại ở bước: ${rejectedStep.name}`,
        color: 'text-red-700',
        icon: <WarningIcon className="w-5 h-5 mr-2" />
      };
    }

    const currentStep = task.progress.find(p => p.status === ProgressStatus.InProgress);
    if (currentStep) {
      return {
        text: `Đang xử lý ở bước: ${currentStep.name}`,
        color: 'text-amber-600',
        icon: <i className="fa-solid fa-arrow-right fa-beat-fade mr-2"></i>,
      };
    }
    
    const isCompleted = task.progress.length > 0 && task.progress[task.progress.length - 1].status === ProgressStatus.Completed;
    if (isCompleted) {
       return {
        text: 'Đã hoàn thành',
        color: 'text-green-600',
        icon: <i className="fa-solid fa-check-circle mr-2"></i>,
      };
    }
    
    const lastCompletedStep = [...task.progress].reverse().find(p => p.status === ProgressStatus.Completed);
    if (lastCompletedStep) {
      return {
        text: `Hoàn thành tới bước: ${lastCompletedStep.name}`,
        color: 'text-gray-600',
        icon: <i className="fa-solid fa-check mr-2"></i>,
      };
    }

    return {
      text: 'Chưa bắt đầu',
      color: 'text-gray-500',
      icon: <i className="fa-regular fa-clock mr-2"></i>,
    };
  }, [task.progress]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border-l-4 border-red-700 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex-1 pr-4">
          <h3 className="text-lg font-bold text-blue-900">{task.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-semibold">Người thực hiện:</span> {task.assignee}
          </p>
           <p className="text-sm text-gray-600">
             <span className="font-semibold">Đơn vị:</span> {task.issuingUnit}
           </p>
           <div className={`flex items-center mt-3 text-sm font-semibold ${statusInfo.color}`}>
              {statusInfo.icon}
              <span>{statusInfo.text}</span>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            {isAdmin && (
                <button
                onClick={() => onEdit(task)}
                className="text-gray-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Chỉnh sửa công việc"
                >
                <PencilIcon className="w-5 h-5" />
                </button>
            )}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition"
                aria-label={isExpanded ? "Thu gọn" : "Xem chi tiết"}
            >
                <i className={`fa-solid ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </button>
        </div>
      </div>
      
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
          <ProgressTracker progress={task.progress} />
      </div>
    </div>
  );
};

export default TaskCard;
