import React from 'react';
import { Image, ImageProps } from 'react-native';

const getIconStyle = (size) => {
  if (size === 'sm') return { width: 24, height: 24 };
  if (size === 'sm_l') return { width: 18, height: 21 };
  if (size === 'md_l') return { width: 54, height: 54 };
  if (size === 'lg') return { width: 64, height: 64 };
  return { width: 48, height: 48 };
};

export const IconBase = ({ size, style, ...props }) => (
  <Image style={[getIconStyle(size), style]} {...props} />
);

export const Logo = (props) => (
  <IconBase {...props} source={require('./Logo.png')} resizeMode={'contain'} />
);

export const TextBoxSelect = (props) => (
  <IconBase {...props} source={require('./TextBoxSelect.png')} resizeMode={'contain'} />
);

export const QLogo = (props) => (
  <IconBase {...props} style={{ width: 121, height: 54 }} source={require('./QLogo.png')} resizeMode={'contain'} />
);