export interface TourLog {
  id: number;
  logDateTime: string;  // ISO string
  comment: string;
  difficulty: number;
  totalDistance: number;
  totalTime: string;
  rating: string;
}
