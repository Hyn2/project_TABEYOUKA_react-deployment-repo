import { Box, Container } from '@mui/material';
import Layout from '../components/layout';
import useToggle from '../hooks/useToggle';
import ModalButton from '../components/common/button/ModalButton';
import { LocationOnOutlined } from '@mui/icons-material';
import CreateReviewModal from '../components/review/modal/CreateReviewModal';

function TestPage() {
  const { setTrue: createReviewModalOpen, ...createReviewModalProps } = useToggle();
  return (
    <Layout>
      <Box pt={9} />
      <Container>
        <ModalButton
          title="리뷰 작성하기"
          Icon={LocationOnOutlined}
          iconColor="green"
          handleOpen={createReviewModalOpen}
        />
        <CreateReviewModal {...createReviewModalProps} />
      </Container>
    </Layout>
  );
}

export default TestPage;
