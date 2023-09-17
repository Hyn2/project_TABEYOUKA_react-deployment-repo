import { Box, Container, Skeleton } from '@mui/material';
import Layout from '../components/layout';
import ReviewItem from '../components/review/ReviewItem';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Review } from '../types/review.interface';
import usePage, { MoreDataFn } from '../hooks/usePage';
import { getReviews } from '../services/review.service';

const ReviewPage = () => {
  const { search } = useLocation();
  const params = queryString.parse(search);
  const initPage = (params.page ? params.page : '1') as string;
  const initCount = (params.count ? params.count : '10') as string;

  const moreReviews: MoreDataFn<Review> = (page, count) => {
    return getReviews(page, count);
  };

  const {
    data: reviews,
    endOfPage,
    unobserve,
    setPage,
    setCount,
  } = usePage<Review, MoreDataFn<Review>>(initPage, initCount, moreReviews);

  return (
    <Layout>
      <Box pt={9} />
      <Box p={2}>
        <Container>
          {reviews.length
            ? reviews.map((data) => <ReviewItem key={data.id} review={data} />)
            : Array.from({ length: +initCount }, (_, i) => i).map(() => (
                <Skeleton
                  variant="rectangular"
                  width="650px"
                  height="300px"
                  animation="wave"
                  sx={{ marginTop: '1rem' }}
                />
              ))}
        </Container>

        {/* FIXME: test용 div */}
        <div style={{ height: '500px' }}></div>

        {/* 무한스크롤 관찰하는 대상 */}
        <div ref={endOfPage}></div>
      </Box>
    </Layout>
  );
};

export default ReviewPage;
