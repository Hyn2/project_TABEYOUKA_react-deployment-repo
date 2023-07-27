import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Rating,
  Skeleton,
  SxProps,
  Typography,
} from '@mui/material';
import Layout from '../components/layout';
import { EditorOnlyRead } from '../components/common/CKEditor';
import { Review } from '../types/review.interface';
import { useLayoutEffect, useState } from 'react';
import { checkLikeReview, getReviewByReviewId, toggleLikeReview } from '../services/review.service';
import { FavoriteBorder, NavigateBefore, NavigateNext } from '@mui/icons-material';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import RestaurantBanner from '../components/review/RestaurantBanner';

const reviewItemStyle: SxProps = {
  width: '650px',
  pt: '15px',
  pb: '20px',

  // mobile interactive design
  '@media (max-width: 840px)': {
    width: '100%',
  },
};

const user_id = 'laravel1@gmail.com';

const ReviewDetailPage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const review_id = +(queryString.parse(search).id || 0);

  const [review, setReview] = useState<Review>();
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const handleLike = () => {
    toggleLikeReview(review_id, user_id);
    setAlreadyLiked(!alreadyLiked);
  };

  const redirectToProfile = () => {
    navigate(`/profile?user_id=${review?.user.id}`);
  };

  const redirectToRestaurant = () => {
    navigate(`/store?id=${review?.restaurant.id}`);
  };

  useLayoutEffect(() => {
    if (!review_id) navigate('/reviews');

    getReviewByReviewId(review_id)
      .then((review) => {
        setReview(review);
      })
      .catch((e) => {
        // TODO: 만약 review가 not found일 때, not found 페이지로 이동하거나 notfound를 컴포넌트에 띄어야 하는지 고민
        navigate('/reviews');
      });

    checkLikeReview(review_id, user_id).then((isLike) => {
      setAlreadyLiked(isLike);
    });
  }, []);

  return (
    <Layout>
      <Box pt={9} />
      <Box p={2}>
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={() => {
            navigate(-1);
          }}
        >
          {'< back'}
        </Button>
        <Container>
          {review ? (
            <Box sx={reviewItemStyle}>
              {/* review header */}
              <Box border="1px solid rgba(0, 0, 0, 0.1)">
                {/* review header */}
                <Box pl="8px">
                  <Box
                    display="flex"
                    alignItems="center"
                    gap="1rem"
                    m={2}
                    sx={{
                      '@media (max-width: 840px)': {
                        flexWrap: 'wrap',
                      },
                    }}
                  >
                    <Avatar src={review.user.profile_image} />
                    <Box>
                      <Typography fontWeight={600}>{review.user.nickname}</Typography>
                      <Box display="flex">
                        {/* TODO: 나중에 갯수 계산하는 것도 추가해야함(백엔드 측), */}
                        <Typography>口コミ 1000件</Typography>
                        j
                        <Box width="1rem" />
                        <Typography>フォロワー {review.user.follower}</Typography>
                      </Box>
                    </Box>
                    <Typography
                      marginTop="auto"
                      marginLeft="auto"
                      fontSize="14px"
                      marginRight="1rem"
                      fontStyle="italic"
                    >
                      {review.user.bio}
                    </Typography>
                  </Box>
                </Box>

                <Divider variant="middle" />

                {/* review information */}
                <Box pl="8px">
                  <Box display="flex" alignItems="center" gap="1rem" m={2}>
                    <Rating
                      name="rating"
                      value={review.score}
                      readOnly
                      sx={{
                        '@media (max-width: 480px)': {
                          fontSize: '1rem',
                        },
                      }}
                    />
                    <span>{review.score}</span>
                    <Typography
                      marginTop="auto"
                      marginLeft="auto"
                      fontSize="14px"
                      marginRight="1rem"
                    >
                      {moment(review.created_at).format('YYYY-MM-DD')}
                    </Typography>
                  </Box>
                </Box>

                <Divider variant="middle" />

                {/* review content */}
                <Box
                  display="flex"
                  alignItems="center"
                  gap="1rem"
                  m={2}
                  fontFamily="Apple SD Gothic Neo, Noto Sans, Helvetica, Arial, Tahoma, Verdana, Sans-Serif"
                >
                  <Box width="100%">
                    <EditorOnlyRead data={review.content} />
                    <Box height="1rem" />
                    <Box display="flex" flexWrap="wrap" gap={1}>
                      {review.images.map((image, idx) => {
                        return (
                          <img
                            key={idx}
                            src={`http://localhost:7000/${image}`}
                            alt="review"
                            style={{ width: '125px', maxWidth: '100%' }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                </Box>

                <Divider variant="middle" />

                <Box m={2} sx={{ cursor: 'pointer' }}>
                  <div onClick={redirectToRestaurant}>
                    <RestaurantBanner data={review.restaurant} />
                  </div>
                </Box>

                <Divider variant="middle" />

                <Box width="100%" display="flex" justifyContent="center">
                  <ButtonGroup>
                    <IconButton>
                      <NavigateBefore />
                    </IconButton>
                    <Button variant="text" onClick={redirectToProfile}>
                      レビュアーの投稿をもっと見る!
                    </Button>
                    <IconButton>
                      <NavigateNext />
                    </IconButton>
                  </ButtonGroup>
                </Box>

                <Divider variant="middle" />

                {/* footer */}
                <Box m={2} display="flex" alignItems="center">
                  <Button
                    size="small"
                    variant={alreadyLiked ? 'outlined' : 'contained'}
                    color="warning"
                    onClick={handleLike}
                  >
                    <FavoriteBorder />
                    <Box width="0.5rem" />
                    <Typography>{alreadyLiked ? '取り消し' : 'いいね！'}</Typography>
                    <Typography
                      marginLeft="1rem"
                      fontSize={13}
                      fontWeight={400}
                      alignItems="center"
                      display="flex"
                    >
                      {review.like}
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Skeleton variant="rectangular" width="650px" height="300px" animation="wave" />
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default ReviewDetailPage;
