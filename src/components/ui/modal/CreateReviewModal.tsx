import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import {
  Box,
  Icon,
  Button,
  IconButton,
  Modal,
  SxProps,
  Typography,
  Avatar,
  Rating,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ImageCarousel from '../../common/carousel/ImageCarousel';
import ReactQuill from 'react-quill';

import { UseToggle } from '../../../types/hooks.interface';
import { stringAvatar } from '../../../utils/stringAvator';

type ModalProps = Omit<UseToggle, 'setTrue'>;

const modalContainerStyle: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40rem',
  maxWidth: '65rem',
  height: '40rem',

  display: 'flex',
  flexDirection: 'column',

  transition: 'all 300ms ease-out',

  bgcolor: 'background.paper',
  borderRadius: '12px',
  border: '1px solid #BBBBBB',
  boxShadow: 24,
  p: 2,

  // mobile interactive design
  '@media (max-width: 768px)': {
    width: '100%',
    height: '100%',
  },

  '@media (max-height: 767px)': {
    width: '100%',
    height: '100%',
  },
};

const ModalHeader = ({
  onClose,
  title,
  nextButton,
}: {
  onClose: () => void;
  title: string;
  nextButton?: {
    onClick: () => void;
    text: string;
  };
}) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box>
        <IconButton onClick={() => onClose()}>
          <Icon>X</Icon>
        </IconButton>
      </Box>
      <Box>
        <Typography fontSize="1.5rem" fontWeight={500} id="modal-modal-title">
          {title}
        </Typography>
      </Box>
      <Box>{nextButton && <Button onClick={nextButton.onClick}>{nextButton.text}</Button>}</Box>
    </Box>
  );
};

const userInfo = {
  name: 'juhyeon',
  avatar: 'https://github.com/d556f8.png',
};

const CreateReviewModal = ({ value, setFalse }: ModalProps) => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const handleInputPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newPhoto = e.target.files;

    setPhotos((ex) => {
      console.log(ex);
      console.log(newPhoto);
      return [...ex, ...newPhoto];
    });
    e.target.value = '';
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos((ex) => {
      return ex.filter((_, i) => i !== index);
    });
  };

  return (
    <Modal
      open={value}
      onClose={setFalse}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{ ...modalContainerStyle, ...(photos.length ? { width: '100%' } : { width: '40rem' }) }}
      >
        {/* header */}
        <ModalHeader
          onClose={setFalse}
          title="리뷰 작성"
          nextButton={{ onClick: () => console.log(1), text: '다음' }}
        />

        {/* body */}
        <Box height="100%" display="flex" justifyContent="space-between">
          {/* Main Photo */}
          <Box
            display="flex"
            width="100%"
            height="100%"
            position="relative"
            justifyContent="center"
            alignItems="center"
          >
            <ImageCarousel photos={photos} deleteHandler={handleDeletePhoto} />
            <Box
              display="flex"
              flexDirection="column"
              position="absolute"
              sx={{
                // FIXME: transition을 지정해주고 싶었음, auto 값은 지정이 안되서 나중에 찾아야됨
                ...(photos.length ? { bottom: '0%' } : { bottom: '50%' }),
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <label htmlFor="uploadPhoto">
                <AddBoxIcon
                  sx={{
                    width: '5rem',
                    height: '5rem',
                  }}
                />
              </label>
            </Box>
            <input
              type="file"
              name="photo"
              id="uploadPhoto"
              multiple
              onChange={handleInputPhoto}
              hidden={true}
            />
          </Box>

          {/* when exist Photo */}
          {photos.length ? (
            <Box width="100%">
              {/* User Information */}
              <Box display="flex" alignItems="center" gap="1rem">
                <Avatar {...stringAvatar(userInfo.name)} src={userInfo.avatar} />
                <Typography>{userInfo.name}</Typography>
              </Box>

              {/* Restaurant Information */}
              <Box>
                {/* TODO: 만약 위치정보를 허락한 상태 ? 근처의 레스토랑 출력 : 위치정보 수락 버튼 */}
              </Box>

              {/* rating */}
              <Box>
                {/* TODO: 스타일 수정해야 함 */}
                <Typography>별점</Typography>
                <Rating name="rating" defaultValue={5} precision={0.5} />
              </Box>

              {/* content */}
              <Box>
                {/* real content */}
                <Box id="modal-modal-description">
                  <ReactQuill theme="snow" value={content} onChange={setContent} />
                </Box>

                {/* utils */}
                <Box></Box>
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateReviewModal;
