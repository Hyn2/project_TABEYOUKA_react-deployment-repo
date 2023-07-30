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
import { RestaurantHOTPP } from '../../../types/restaurant.interface';
import RestaurantSelector from './RestaurantSelector';
import useToggle from '../../../hooks/useToggle';
import ModalButton from '../../common/button/ModalButton';

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

const Photos = ({
  photos,
  deleteHandler,
  inputHandler,
}: {
  photos: File[];
  deleteHandler: (index: number) => void;
  inputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Box
      display="flex"
      width="100%"
      position="relative"
      justifyContent="center"
      alignItems="center"
    >
      <ImageCarousel photos={photos} deleteHandler={deleteHandler} />
      <Box
        display="flex"
        flexDirection="column"
        position="absolute"
        sx={{
          ...(photos.length ? { bottom: '-10%' } : { bottom: 'calc(50% - 2.5rem)' }),
          transition: 'all 0.5s ease-in-out',
        }}
      >
        <label htmlFor="uploadPhoto">
          <AddBoxIcon
            sx={{
              opacity: 1,
              width: '5rem',
              height: '5rem',
              cursor: 'pointer',
              transition: 'all 0.5s ease-in-out',
              ...(photos.length && {
                opacity: 0.1,
                backdropFilter: 'blur(5px)',
                ':hover': { opacity: 1 },
              }),
            }}
          />
        </label>
      </Box>
      <input
        type="file"
        name="photo"
        id="uploadPhoto"
        multiple
        onChange={inputHandler}
        hidden={true}
        accept="image/jpg, image/png, image/jpeg, image/gif"
      />
    </Box>
  );
};

const ContentWorkspace = ({
  scoreHandler,
  contentHandler,
  restaurantHandler,
}: {
  scoreHandler: (e: SyntheticEvent<Element, Event>, value: number | null) => void;
  contentHandler: (data: string) => void;
  restaurantHandler: (restaurant_id: string) => void;
}) => {
  const ckeditor = useRef<CKEditor<BalloonEditor>>(null);
  const editor = ckeditor.current?.editor;
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantHOTPP | null>(null);
  const [emoji, setEmoji] = useState(false);
  const {
    setTrue: openRestaurantSelector,
    setFalse: closeRestaurantSelector,
    value: isOpen,
  } = useToggle();

  const handleRestaurant = (restaurant: RestaurantHOTPP | null) => {
    setSelectedRestaurant(restaurant);

    restaurantHandler(restaurant ? restaurant.id : '');
  };

  const addEmoji = (emoji: string) => {
    const element = editor?.ui.view.editable.element as HTMLElement;

    let content = '';

    if (element.childNodes.length <= 0) return editor?.data.set(emoji), setEmoji(false);

    for (let i = 0; i < element.childNodes.length - 1; i++) {
      const node = element.childNodes[i] as HTMLElement;
      content += node.outerHTML;
    }

    const lastElement = element.lastElementChild as HTMLElement;
    content += `<${lastElement.tagName}>${lastElement.innerText}${emoji}</${lastElement.tagName}>`;

    editor?.data.set(content);
  };

  return (
    <Box width="100%">
      {/* User Information */}
      <Box display="flex" alignItems="center" gap="1rem">
        <Avatar {...stringAvatar(preInfo.nickname)} src={preInfo.profile_image} />
        <Typography>{preInfo.nickname}</Typography>
      </Box>

      {/* Restaurant Information */}
      <Box>
        {/* TODO: 만약 위치정보를 허락한 상태 ? 근처의 레스토랑 출력 : 위치정보 수락 버튼 */}
        <ModalButton
          title={selectedRestaurant?.name || '近くのレストラン'}
          Icon={AddBoxIcon}
          iconColor="green"
          handleOpen={openRestaurantSelector}
        />
        <RestaurantSelector
          value={isOpen}
          setFalse={closeRestaurantSelector}
          selectedRestaurant={selectedRestaurant}
          restaurantHandler={handleRestaurant}
        />
      </Box>

      {/* rating */}
      <Box p={2} display="flex">
        {/* TODO: 스타일 수정해야 함 */}
        <Rating name="score" defaultValue={5} precision={1} onChange={scoreHandler} />
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
            data=""
            onChange={(event, editor) => {
              contentHandler(editor.getData());
            }}
            onBlur={(event, editor) => {}}
            onFocus={(event, editor) => {}}
            ref={ckeditor}
          />
        </Box>

        {/* utils */}
        <Box display="flex" justifyContent="space-between">
          <Box position="relative">
            <IconButton sx={{ m: 0.5 }} onClick={() => setEmoji(!emoji)}>
              <InsertEmoticonIcon />
            </IconButton>
            {emoji && (
              <Box
                display="flex"
                position="absolute"
                width="18rem"
                alignItems="center"
                gap="1rem"
                flexWrap="wrap"
                p={1}
              >
                {['😂', '❤️', '😍', '🤣', '😊', '🙏', '😭', '👍'].map((emoji, i) => (
                  <IconButton
                    key={i}
                    onClick={() => {
                      addEmoji(emoji);
                      setEmoji(false);
                    }}
                    sx={{ width: '2rem', height: '2rem' }}
                  >
                    <Typography fontSize="1.1rem">{emoji}</Typography>
                  </IconButton>
                ))}
              </Box>
            )}
          </Box>
          <Box display="flex" alignItems="end" margin={1}>
            <Typography>{`${
              editor?.ui.view.editable.element?.innerText.length || 0
            }/5000`}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const CreateReviewModal = ({ value, setFalse }: Omit<UseToggle, 'setTrue'>) => {
  const [loading, setLoading] = useState(false);

  // FIXME: user_id 수정해야됨
  const [payload, setPayload] = useState<CreateReviewPayload>({
    content: '',
    photos: [],
    score: 5,
    restaurant_id: '',
    user_id: 'laravel1@gmail.com',
  });

  const handleInputPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newPhoto = e.target.files;

    setPayload({ ...payload, photos: [...payload.photos, ...newPhoto] });

    e.target.value = '';
  };

  const handleContent = (data: string) => {
    setPayload({ ...payload, content: data });
  };

  const handleDeletePhoto = (index: number) => {
    setPayload({ ...payload, photos: payload.photos.filter((_, i) => i !== index) });
  };

  const handleScore = (e: any, value: number | null) => {
    setPayload({ ...payload, score: value as number });
  };

  const handleRestaurant = (restaurant_id: string) => {
    setPayload({ ...payload, restaurant_id });
  };

  const handleCreateReview = () => {
    setLoading(true);

    createReview(payload)
      .then(() => {
        setPayload({
          photos: [],
          content: '',
          score: 5,
          restaurant_id: '',
          user_id: '',
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
        setFalse();
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
              ...(payload.photos.length && { width: '100%' }),
            }}
          >
            {/* header: ModalHeader Component */}
            {payload.photos.length ? (
              <ModalHeader
                onClose={setFalse}
                title="리뷰 작성"
                nextButton={{
                  text: '공유',
                  onClick: handleCreateReview,
                }}
              />
            ) : (
              <ModalHeader onClose={setFalse} title="리뷰 작성" />
            )}

            {/* body */}
            <Box
              height="100%"
              display="flex"
              justifyContent="space-between"
              gap="3rem"
              p="2rem"
              sx={{ '@media (max-width: 850px)': { flexWrap: 'wrap' } }}
            >
              {/* Main Photo: Photos Component */}
              <Photos
                photos={payload.photos}
                deleteHandler={handleDeletePhoto}
                inputHandler={handleInputPhoto}
              />

              {/* when exist Photo */}
              {payload.photos.length ? (
                <ContentWorkspace
                  contentHandler={handleContent}
                  scoreHandler={handleScore}
                  restaurantHandler={handleRestaurant}
                />
              ) : null}
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CreateReviewModal;
