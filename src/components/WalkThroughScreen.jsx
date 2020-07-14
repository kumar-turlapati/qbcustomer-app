import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native';
import { Screen1, Screen2, Screen3, Screen4, SkipButton } from '../icons/Icons';
import { theme } from '../theme/theme';
import Carousel from 'react-native-snap-carousel';
import { colors } from '../theme/colors';

const { width: winWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container
  },
  onboardingViewStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 160,
  },
  textStyles: {
    ...theme.viewStyles.textCommonStyles,
    marginTop: 40,
    fontSize: 15,
  },
  subTextStyle: {
    ...theme.viewStyles.textCommonStyles,
    marginTop: 10,
    paddingHorizontal: 42,
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 15,
  },
  sliderDotStyle: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    marginTop: 9,
  },
  skipViewStyles: {
    position: 'absolute',
    right: 26,
    bottom: 38,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const banners = [
  {
    id: 1,
    icon: <Screen1 />,
    title: 'Browse galleries',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc'
  },
  {
    id: 2,
    icon: <Screen2 />,
    title: 'Order from comfart location',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc'
  },
  {
    id: 3,
    icon: <Screen3 />,
    title: 'Track Live Order Status',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc'
  },
  {
    id: 4,
    icon: <Screen4 />,
    title: 'View your account any time',
    subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc'
  }
]

export const WalkThroughScreen = ({ navigation }) => {

  const [slideIndex, setSlideIndex] = useState(0);

  const renderDot = (active) => (
    <View style={[styles.sliderDotStyle, { backgroundColor: active ? colors.BLACK : colors.INACTIVE_DOT_COLOR }]} />
  );

  const renderSliderItem = ({ item, index }) => {
    return (
      <View style={styles.onboardingViewStyles}>
        {item.icon}
        <Text style={styles.textStyles}>{item.title}</Text>
        <Text style={styles.subTextStyle}>{item.subTitle}</Text>
      </View>
    );
  };

  const renderWalkthrough = () => {
    return (
      <View>
        <Carousel
          onSnapToItem={setSlideIndex}
          data={banners}
          renderItem={renderSliderItem}
          sliderWidth={winWidth}
          itemWidth={winWidth}
          loop={true}
          autoplay={true}
          autoplayDelay={3000}
          autoplayInterval={3000}
          layout={'default'}
        />
      </View>
    );
  }

  const renderSliderDotView = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
          alignSelf: 'center',
        }}
      >
        {banners.map((_, index) => (index == slideIndex ? renderDot(true) : renderDot(false)))}
      </View>
    );
  }

  const renderSkipButton = () => {
    return (
      <View style={styles.skipViewStyles}>
        <TouchableOpacity onPress={() => {
          console.log('skip clicked')
        }}>
          <SkipButton style={{ width: 52, height: 26, height: 40 }} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderWalkthrough()}
      {renderSliderDotView()}
      {renderSkipButton()}
    </View>
  );
};
