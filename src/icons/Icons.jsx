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

export const Screen1 = (props) => (
  <IconBase {...props} style={{ width: 119, height: 154 }} source={require('./Screen1.png')} resizeMode={'contain'} />
);

export const Screen2 = (props) => (
  <IconBase {...props} style={{ width: 119, height: 154 }} source={require('./Screen1.png')} resizeMode={'contain'} />
);

export const Screen3 = (props) => (
  <IconBase {...props} style={{ width: 66, height: 126 }} source={require('./Screen4.png')} resizeMode={'contain'} />
);

export const Screen4 = (props) => (
  <IconBase {...props} style={{ width: 66, height: 126 }} source={require('./Screen4.png')} resizeMode={'contain'} />
);

export const SkipButton = (props) => (
  <IconBase {...props} source={require('./Skip.png')} resizeMode={'contain'} />
);

export const HomeUnselected = (props) => (
  <IconBase {...props} source={require('./Home.png')} resizeMode={'contain'} />
);

export const CatalogueUnselected = (props) => (
  <IconBase {...props} source={require('./Catalogue.png')} resizeMode={'contain'} />
);

export const OrdersUnselected = (props) => (
  <IconBase {...props} source={require('./Orders.png')} resizeMode={'contain'} />
);

export const ProfileUnselected = (props) => (
  <IconBase {...props} source={require('./Profile.png')} resizeMode={'contain'} />
);

export const HomeSelected = (props) => (
  <IconBase {...props} source={require('./Home.png')} resizeMode={'contain'} />
);

export const CatalogueSelected = (props) => (
  <IconBase {...props} source={require('./CatalogueSelected.png')} resizeMode={'contain'} />
);

export const OrdersSelected = (props) => (
  <IconBase {...props} source={require('./Orders.png')} resizeMode={'contain'} />
);

export const ProfileSelected = (props) => (
  <IconBase {...props} source={require('./Profile.png')} resizeMode={'contain'} />
);

export const HeartSelected = (props) => (
  <IconBase {...props} source={require('./FilledHeart.png')} resizeMode={'contain'} />
);

export const HeartUnSelected = (props) => (
  <IconBase {...props} source={require('./UnfilledHeart.png')} resizeMode={'contain'} />
);

export const SortIcon = (props) => (
  <IconBase {...props} style={{ width: 21, height: 24 }} source={require('./Sort.png')} resizeMode={'contain'} />
);

export const FilterIcon = (props) => (
  <IconBase {...props} style={{ width: 21, height: 23 }} source={require('./Filter.png')} resizeMode={'contain'} />
);

export const CartIcon = (props) => (
  <IconBase {...props} style={{ width: 20, height: 22 }} source={require('./Cart.png')} resizeMode={'contain'} />
);

export const Cloth1 = (props) => (
  <IconBase {...props} source={require('./Cloth1.png')} resizeMode={'contain'} />
);

export const Cloth2 = (props) => (
  <IconBase {...props} source={require('./Cloth2.png')} resizeMode={'contain'} />
);

export const Cloth3 = (props) => (
  <IconBase {...props} source={require('./Cloth3.png')} resizeMode={'contain'} />
);

export const Cloth4 = (props) => (
  <IconBase {...props} source={require('./Cloth4.png')} resizeMode={'contain'} />
);

export const BackIcon = (props) => (
  <IconBase {...props} source={require('./back.png')} resizeMode={'contain'} />
);

export const CheckIcon = (props) => (
  <IconBase {...props} source={require('./CheckIcon.png')} resizeMode={'contain'} />
);

export const UnCheckIcon = (props) => (
  <IconBase {...props} source={require('./UnCheckIcon.png')} resizeMode={'contain'} />
);