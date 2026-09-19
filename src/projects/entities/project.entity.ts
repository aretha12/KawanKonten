export type ProjectStatus = 'open' | 'matched' | 'in_progress' | 'completed';

export interface Project {
  id: string;
  brandId: string;
  title: string;
  category: string[];
  budgetMin: number;
  budgetMax: number;
  brief: string;
  status: ProjectStatus;
  matchedCreatorId?: string;
  createdAt: Date;
}
