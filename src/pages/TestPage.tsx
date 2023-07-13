import { Box, Container } from '@mui/material';
import Layout from '../components/layout';
import CreateReviewModal from '../components/ui/modal/CreateReviewModal';
import useToggle from '../hooks/useToggle';
import ModalButton from '../components/common/button/ModalButton';
import { LocationOnOutlined } from '@mui/icons-material';

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
