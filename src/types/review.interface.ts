import { RestaurantDB } from './restaurant.interface';
import { User } from './user.interface';

export type GetReviewsParams = { page?: string; count?: string };

export interface Review {
  id: number;
  content: string;
  score: number;
  like: number;
  created_at: string;
  updated_at: string;
  images: string[];
  user: User;
  restaurant: RestaurantDB;
  liked?: boolean;
}

export interface CreateReviewPayload {
  photos: File[];
  content: string;
  score: number;
  restaurant_id: string;
  user_id: string;
}
