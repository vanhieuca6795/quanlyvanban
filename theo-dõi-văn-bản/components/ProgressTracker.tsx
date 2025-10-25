import React from 'react';
import { ProgressStep, ProgressStatus } from '../types';

interface ProgressTrackerProps {
  progress: ProgressStep[];
}

const statusConfig = {
  [ProgressStatus.Completed]: {
    icon: 'fa-solid fa-check',
    iconColor: 'text-white',
    bgColor: 'bg-green-500',
    textColor: 'text-gray-800',
    lineColor: 'bg-green-500',
  },
  [ProgressStatus.InProgress]: {
    icon: 'fa-solid fa-arrow-right',
    iconColor: 'text-white',
    bgColor: 'bg-amber-500 animate-pulse',
    textColor: 'text-amber-600 font-bold',
    lineColor: 'bg-gray-300',
  },
  [ProgressStatus.Pending]: {
    icon: 'fa-regular fa-clock',
    iconColor: 'text-gray-500',
    bgColor: 'bg-gray-300',
    textColor: 'text-gray-500',
    lineColor: 'bg-gray-300',
  },
  [ProgressStatus.Rejected]: {
    icon: 'fa-solid fa-xmark',
    iconColor: 'text-white',
    bgColor: 'bg-red-700',
    textColor: 'text-red-700 font-bold',
    lineColor: 'bg-gray-300',
  },
};

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-gray-600 mb-3">Tiến độ</h4>
      <ol className="relative border-l border-gray-300 ml-4">
        {progress.map((step, index) => {
          const config = statusConfig[step.status];
          return (
            <li key={index} className="mb-6 ml-8">
              <span className={`absolute flex items-center justify-center w-8 h-8 ${config.bgColor} rounded-full -left-4 ring-4 ring-white`}>
                <i className={`${config.icon} ${config.iconColor}`}></i>
              </span>
              <div className="flex flex-col">
                <h3 className={`text-md font-semibold ${config.textColor}`}>{step.name}</h3>
                <time className="block mb-2 text-xs leading-none text-gray-400">
                  {step.timestamp ? step.timestamp : step.status}
                </time>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProgressTracker;