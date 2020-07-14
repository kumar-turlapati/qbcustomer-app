const white = 'white';
const black = 'black';
const clear = 'transparent';
const sliderinactiveColor = 'rgba(0,0,0,0.5)';

const red = '#C3111A';

const TabBar = {
  TAB_BAR_ACTIVE_TINT_COLOR: white,
  TAB_BAR_INACTIVE_TINT_COLOR: 'rgba(2,71,91,0.6)',
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
  INACTIVE_DOT_COLOR: sliderinactiveColor
};

export const colors = {
  ...Buttons,
  ...Common,
  ...TabBar,
};
