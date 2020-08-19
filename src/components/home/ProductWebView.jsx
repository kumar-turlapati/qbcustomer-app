import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {externalGalleryUrl} from '../../../qbconfig';
import {WebView} from 'react-native-webview';

const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
});

export const ProductWebView = ({route, navigation}) => {
  const brandUrl = route.params.brandUrl;

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={externalGalleryUrl}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
      />
    );
  };

  return (
    <View style={[styles.container, {height: height}]}>
      {renderHeader()}
      <WebView
        source={{uri: brandUrl}}
        bounces={false}
        scrollEnabled={false}
        scalesPageToFit={false}
      />
    </View>
  );
};
