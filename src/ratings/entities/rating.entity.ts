export type RatingFromRole = 'brand' | 'creator';

export interface Rating {
  id: string;
  projectId: string;
  fromRole: RatingFromRole;
  toCreatorId: string; // saat ini penilaian difokuskan ke arah creator
  score: number; // 1-5
  comment?: string;
  createdAt: Date;
}
