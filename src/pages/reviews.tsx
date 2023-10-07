import { Box, Button, Container, Skeleton, Typography } from "@mui/material";
import Layout from "../components/layout";
import ReviewItem from "../components/review/ReviewItem";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { Review } from "../types/review.interface";
import usePage, { MoreDataFn } from "../hooks/usePage";
import { getReviews } from "../services/review.service";
import CreateReviewModal from "../components/review/modal/CreateReviewModal";
import useToggle from "../hooks/useToggle";

const ReviewPage = () => {
  const { search } = useLocation();
  const params = queryString.parse(search);
  const initPage = (params.page ? params.page : "1") as string;
  const initCount = (params.count ? params.count : "10") as string;
  const { setTrue: createReviewModalOpen, ...createReviewModalProps } = useToggle(); 

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

  const boxStyle = {
    width: "fit-content",
    display: "flex",
    borderRadius: "5px",
    bgcolor: "#FFA41B",
    color: "white",
    boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
    border: "0.5px solid #787A91",
    "&:hover": {
      bgcolor: "#FFC107",
      transition: "all 0.4s ease-in-out",
    },
  };

  const navigate = useNavigate();

  return (
    <>
      <Box pt={9} />
      <Box p={2}>
        <Container>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            <Box sx={boxStyle}>
              <CreateReviewModal {...createReviewModalProps} />
              <Button
                sx={{
                  color: "black",
                  mx: 1,
                  flexGrow: 1,
                  py: 1.2,
                  justifyContent: "center",
                }}
                onClick={createReviewModalOpen}
              >
                <Typography variant="caption" sx={{ fontSize: "18px" }}>
                  レビューを作成
                </Typography>
              </Button>
            </Box>
          </Box>
          {reviews.length
            ? reviews.map((data) => <ReviewItem key={data.id} review={data} />)
            : Array.from({ length: +initCount }, (_, i) => i).map(() => (
                <Skeleton
                  variant="rectangular"
                  width="650px"
                  height="300px"
                  animation="wave"
                  sx={{ marginTop: "1rem" }}
                />
              ))}
        </Container>

        {/* FIXME: test용 div */}
        <div style={{ height: "500px" }}></div>

        {/* 무한스크롤 관찰하는 대상 */}
        <div ref={endOfPage}></div>
      </Box>
    </>
  );
};

export default ReviewPage;
