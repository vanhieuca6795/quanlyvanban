export enum ProgressStatus {
  Pending = 'Chờ duyệt',
  InProgress = 'Đang trình',
  Completed = 'Đã duyệt',
  Rejected = 'Trễ hạn',
}

export interface ProgressStep {
  name: string;
  status: ProgressStatus;
  timestamp?: string;
  documentNumber?: string;
}

export interface Task {
  id: string;
  name: string;
  assignee: string;
  issuingUnit: string;
  progress: ProgressStep[];
}