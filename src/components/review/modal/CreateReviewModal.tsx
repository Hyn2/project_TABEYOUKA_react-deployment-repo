import '../../../styles/ckeditor.css';
import { useState, useRef, SyntheticEvent } from 'react';
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
  CircularProgress,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import BalloonEditor from '@ckeditor/ckeditor5-build-balloon';

import { UseToggle } from '../../../types/hooks.interface';
import { stringAvatar } from '../../../utils/stringAvator';
import { createReview } from '../../../services/review.service';

import ImageCarousel from '../../common/carousel/ImageCarousel';
import { CreateReviewPayload } from '../../../types/review.interface';

type ModalProps = Omit<UseToggle, 'setTrue'>;

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

// FIXME: 임시로 만든 유저 정보
const preInfo = {
  id: 'laravel1@gmail.com',
  nickname: 'juhyeon',
  profile_image: 'https://github.com/d556f8.png',
  restaurant_id: 'J001051651',
};

const modalContainerStyle: SxProps = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30rem',
  maxWidth: '50rem',

  display: 'flex',
  flexDirection: 'column',

  transition: 'all 300ms ease-out',

  bgcolor: 'background.paper',
  borderRadius: '12px',
  border: '1px solid #BBBBBB',
  boxShadow: 24,
  p: 2,

  // mobile interactive design
  '@media (max-width: 840px)': {
    width: '100%',
    height: '100%',
  },

  '@media (max-height: 500px)': {
    width: '100%',
    height: '100%',
  },
};

const CreateReviewModal = ({ value, setFalse }: ModalProps) => {
  const [loading, setLoading] = useState(false);

  const [photos, setPhotos] = useState<File[]>([]);
  const [content, setContent] = useState('');
  const [score, setScore] = useState(5);

  const ckeditor = useRef<CKEditor<BalloonEditor>>(null);
  const editor = ckeditor.current?.editor;

  const handleInputPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newPhoto = e.target.files;

    setPhotos([...photos, ...newPhoto]);

    e.target.value = '';
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleScore = (e: SyntheticEvent<Element, Event>, value: number | null) => {
    setScore(value as number);
  };

  const handleCreateReview = () => {
    const payload: CreateReviewPayload = {
      photos,
      content,
      score,
      restaurant_id: preInfo.restaurant_id,
      user_id: preInfo.id,
    };

    setLoading(true);
    createReview(payload).then((res) => {
      setLoading(false);
      setFalse();
      setPhotos([]);
      setContent('');
      setScore(5);
    });
  };
  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <Modal
          open={value}
          onClose={setFalse}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...modalContainerStyle,
              ...(photos.length ? { width: '100%' } : { width: '40rem' }),
            }}
          >
            {/* header */}
            <ModalHeader
              onClose={setFalse}
              title="리뷰 작성"
              nextButton={{
                text: '공유',
                onClick: handleCreateReview,
              }}
            />

            {/* body */}
            <Box
              height="100%"
              display="flex"
              justifyContent="space-between"
              gap="3rem"
              p="2rem"
              sx={{ '@media (max-width: 850px)': { flexWrap: 'wrap' } }}
            >
              {/* Main Photo */}
              <Box
                display="flex"
                width="100%"
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
                  accept="image/jpg, image/png, image/jpeg, image/gif"
                />
              </Box>

              {/* when exist Photo */}
              {photos.length ? (
                <Box width="100%">
                  {/* User Information */}
                  <Box display="flex" alignItems="center" gap="1rem">
                    <Avatar {...stringAvatar(preInfo.nickname)} src={preInfo.profile_image} />
                    <Typography>{preInfo.nickname}</Typography>
                  </Box>

                  {/* Restaurant Information */}
                  <Box>
                    {/* TODO: 만약 위치정보를 허락한 상태 ? 근처의 레스토랑 출력 : 위치정보 수락 버튼 */}
                  </Box>

                  {/* rating */}
                  <Box>
                    {/* TODO: 스타일 수정해야 함 */}
                    <Typography>별점</Typography>
                    <Rating name="score" defaultValue={5} precision={1} onChange={handleScore} />
                  </Box>

                  {/* content */}
                  <Box border="1px solid rgba(0,0,0, 0.1)" borderRadius="5px">
                    {/* real content */}
                    <Box
                      id="modal-modal-description"
                      sx={{
                        fontFamily:
                          'Apple SD Gothic Neo, Noto Sans, Helvetica, Arial, Tahoma, Verdana, Sans-Serif',
                      }}
                    >
                      <CKEditor
                        editor={BalloonEditor}
                        data="안녕하세요"
                        onChange={(event, editor) => {
                          setContent(editor.getData());
                        }}
                        onBlur={(event, editor) => {}}
                        onFocus={(event, editor) => {}}
                        ref={ckeditor}
                      />
                    </Box>

                    {/* utils */}
                    <Box display="flex" justifyContent="space-between">
                      <Box position="relative">
                        <IconButton onClick={() => console.log(1)}>
                          <InsertEmoticonIcon fontSize="large" />
                        </IconButton>
                        <Box
                          display="flex"
                          position="absolute"
                          width="18rem"
                          alignItems="center"
                          gap="1rem"
                          flexWrap="wrap"
                        >
                          {['😂', '❤️', '😍', '🤣', '😊', '🙏', '😭', '👍'].map((emoji, i) => (
                            <IconButton
                              key={i}
                              onClick={() => {
                                const element = editor?.ui.view.editable.element as HTMLElement;

                                let content = '';
                                for (let i = 0; i < element.childNodes.length - 1; i++) {
                                  const node = element.childNodes[i] as HTMLElement;
                                  content += node.outerHTML;
                                }

                                const lastElement = element.lastElementChild as HTMLElement;
                                content += `<${lastElement.tagName}>${lastElement.innerText}${emoji}</${lastElement.tagName}>`;

                                editor?.data.set(content);
                              }}
                            >
                              <Icon resource="">{emoji}</Icon>
                            </IconButton>
                          ))}
                        </Box>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Typography>{`${
                          editor?.ui.view.editable.element?.innerText.length || 0
                        }/5000`}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CreateReviewModal;
