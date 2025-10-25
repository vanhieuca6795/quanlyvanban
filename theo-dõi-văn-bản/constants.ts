
import { ProgressStatus } from './types';

export const APPROVAL_STAGES = [
  'Trình Phó trưởng phòng',
  'Trưởng Phòng',
  'Tham mưu AN',
  'Phó Giám đốc',
  'Giám đốc',
  'Chủ tịch UBND',
];

export const getInitialProgress = () => APPROVAL_STAGES.map(name => ({
  name,
  status: ProgressStatus.Pending,
  timestamp: undefined,
  documentNumber: undefined,
}));