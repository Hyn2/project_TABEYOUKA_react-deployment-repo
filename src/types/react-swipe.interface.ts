import { CSSProperties } from 'react';
import { Style } from 'react-swipe';

export interface SwipeStyle extends Style {
  container: {
    overflow: 'hidden' | CSSProperties['overflow'];
    visibility: 'hidden' | CSSProperties['visibility'];
    position: 'relative' | CSSProperties['position'];
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
  };
  wrapper: {
    overflow: 'hidden' | CSSProperties['overflow'];
    position: 'relative' | CSSProperties['position'];
    display?: CSSProperties['display'];
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    justifyContent?: CSSProperties['justifyContent'];
    alignItems?: CSSProperties['alignItems'];
  };
  child: {
    float: 'left' | CSSProperties['float'];
    width: '100%' | CSSProperties['width'];
    position: 'relative' | CSSProperties['position'];
    transitionProperty: 'transform' | CSSProperties['transitionProperty'];
    height?: CSSProperties['height'];
  };
}
