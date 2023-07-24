import ReactSwipe from 'react-swipe';
import { useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import { SwipeStyle } from '../../../types/react-swipe.interface';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CloseIcon from '@mui/icons-material/Close';

interface ImageCarouselProps {
  photos: File[];
  deleteHandler?: (index: number) => void;
}

const swipeStyle: SwipeStyle = {
  container: {
    overflow: 'hidden',
    visibility: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  child: {
    float: 'left',
    width: '100%',
    position: 'relative',
    transitionProperty: 'transform',
  },
};

// 나중에 훅써서 리팩토링하면 될 듯
const ImageCarousel = ({ photos, deleteHandler }: ImageCarouselProps) => {
  let reactSwipeEl: ReactSwipe;

  useEffect(() => {
    reactSwipeEl.slide(photos.length ? photos.length - 1 : 0, 0);
  }, [photos]);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '400px',
        height: '400px',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box display="flex" width="100%" height="100%" justifyContent="center" alignItems="center">
        <ReactSwipe
          className="carousel"
          swipeOptions={{ continuous: false }}
          ref={(el) => (reactSwipeEl = el as ReactSwipe)}
          childCount={photos.length}
          style={swipeStyle}
        >
          {photos.map((photo, i) => (
            <Box key={i} height="100%" position="relative">
              <img
                src={URL.createObjectURL(photo)}
                style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }}
                alt="reviewPhoto"
              />
              {deleteHandler && (
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    zIndex: 100,
                    backdropFilter: 'contrast(70%)',
                  }}
                  onClick={() => deleteHandler(i)}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Box>
          ))}
        </ReactSwipe>
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{ left: 0, backdropFilter: 'contrast(50%)' }}
            onClick={() => reactSwipeEl.prev()}
          >
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton
            sx={{ right: 0, backdropFilter: 'contrast(50%)' }}
            onClick={() => reactSwipeEl.next()}
          >
            <NavigateNextIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageCarousel;
