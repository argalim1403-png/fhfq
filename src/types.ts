export interface Student {
  id: number;
  name: string;
  isPresent: boolean;
  avatarColor: string;
  gender: 'female' | 'male';
  markedAt?: string;
  confidence?: number;
}

export interface AttendanceSummary {
  total: number;
  present: number;
  absent: number;
  rate: number;
  checkedAt: string;
}

export interface AITaskType {
  id: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  example: string;
  relationToSchool: string;
}
