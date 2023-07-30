import axios from 'axios';
import { CreateReviewPayload, Review } from '../types/review.interface';

export async function createReview(data: CreateReviewPayload) {
  const { photos, content, score, restaurant_id, user_id } = data;

  const review = {
    content,
    score,
    restaurant_id,
    user_id,
  };

  const response = await axios.post('http://localhost:8000/api/review', review);

  const review_id = response.data['id'];

  photos.forEach((photo) => {
    const reviewImage = new FormData();
    reviewImage.append('image', photo);
    reviewImage.append('review_id', review_id.toString());

    axios
      .post('http://localhost:8000/api/review/image', reviewImage)
      .then((res) => {
        if (res.status !== 201) {
          throw new Error('사진 업로드에 실패했습니다.');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  return;
}

export async function getReviewByReviewId(review_id: number): Promise<Review> {
  const response = await axios.get(`http://localhost:8000/api/review?review_id=${review_id}`);

  return response.data;
}

export async function getReviewsByUserId(user_id: string): Promise<Review[]> {
  const response = await axios.get(`http://localhost:8000/api/review?user_id=${user_id}`);

  return response.data;
}

export async function getReviews(page: string, count: string): Promise<Review[]> {
  const query = new URLSearchParams();

  page && query.append('page', page);
  count && query.append('count', count);

  const response = await axios.get(`http://localhost:8000/api/reviews?${query}`);

  return response.data;
}

export async function toggleLikeReview(review_id: number, user_id: string) {
  const response = await axios.post(`http://localhost:8000/api/review/like`, {
    review_id,
    user_id,
  });

  return response.data;
}

export async function checkLikeReview(review_id: number, user_id: string): Promise<boolean> {
  const response = await axios.post('http://localhost:8000/api/review/like/check', {
    review_id,
    user_id,
  });

  return response.data;
}
