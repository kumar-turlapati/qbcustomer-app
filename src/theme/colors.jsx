const white = 'white';
const black = 'black';
const clear = 'transparent';
const sliderinactiveColor = 'rgba(0,0,0,0.5)';

const red = '#C3111A';

const TabBar = {
  TAB_BAR_ACTIVE_TINT_COLOR: black,
  TAB_BAR_INACTIVE_TINT_COLOR: sliderinactiveColor
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
  BLACK_WITH_OPACITY: sliderinactiveColor
};

const Product = {
  PRODUCT_LIST_TEXT_COLOR: black,
  PRODUCT_LIST_SPECIAL_TEXT_COLOR: black,
  PRODUCT_LIST_ORIGINAL_TEXT_COLOR: sliderinactiveColor,
  PRODUCT_LIST_DISCOUNT_TEXT_COLOR: red,

};

export const colors = {
  ...Buttons,
  ...Common,
  ...TabBar,
  ...Product
};
