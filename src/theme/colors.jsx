const white = 'white';
const black = 'black';
const clear = 'transparent';
const sliderinactiveColor = 'rgba(0,0,0,0.5)';

const seperatorColor = 'rgba(0,0,0,0.2)';

const red = '#C3111A';
const lightGary = '#C4C4C4';

const TabBar = {
  TAB_BAR_ACTIVE_TINT_COLOR: black,
  TAB_BAR_INACTIVE_TINT_COLOR: sliderinactiveColor,
};

const Buttons = {
  BUTTON_BG: red,
  BUTTON_TEXT: white,
};

const Common = {
  BLACK: black,
  WHITE: white,
  RED: red,
  CLEAR: clear,
  DEFAULT_BACKGROUND_COLOR: white,
  INACTIVE_DOT_COLOR: sliderinactiveColor,
  HEADER_LEFT_TITLE_COLOR: black,
  BLACK_WITH_OPACITY: sliderinactiveColor,
  IN_STOCK_BACKGROUND_COLOR: '#4A4A4A',
  LIGHT_GRAY: lightGary,
  SEPERATOR_COLOR: seperatorColor,
};

const Product = {
  PRODUCT_LIST_TEXT_COLOR: black,
  PRODUCT_LIST_SPECIAL_TEXT_COLOR: black,
  PRODUCT_LIST_ORIGINAL_TEXT_COLOR: sliderinactiveColor,
  PRODUCT_LIST_DISCOUNT_TEXT_COLOR: red,
};

const Carousel = {
  ACTIVE_CAROUSEL_COLOR: '#4A4A4A',
  IN_ACTIVE_CAROUSEL_COLOR: 'rgba(196,196,196,0.6)',
};

const Slider = {
  SLIDER_THUMB_COLOR: black,
};

export const colors = {
  ...Buttons,
  ...Common,
  ...TabBar,
  ...Product,
  ...Slider,
  ...Carousel,
};
