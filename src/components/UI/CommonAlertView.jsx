import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
// import {Loader} from '../../icons/Icons';
import {theme} from '../../theme/theme';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  alertView: {
    backgroundColor: theme.colors.WHITE,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.5,
    color: theme.colors.BLACK,
    paddingHorizontal: 10,
    marginTop: -8,
  },
  successViewStyle: {
    backgroundColor: theme.colors.WHITE,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  buttonStyle: {
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.5,
    color: theme.colors.RED,
  },
  alertSeperatorStyle: {
    backgroundColor: theme.colors.BLACK,
    opacity: 0.1,
    height: 1,
    marginTop: 20,
    width: width - 104,
  },
  buttonAlertStyle: {
    height: 44,
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: width - 104,
  },
});

export default CommonAlertView = ({
  showLoader,
  showSuceessPopup,
  onPressSuccessButton,
  successTitle,
}) => {
  const renderSuccessAlertView = () => {
    return (
      <View style={styles.successViewStyle}>
        <Text
          style={[
            styles.titleStyle,
            {fontSize: 14, paddingTop: 25, paddingHorizontal: 12},
          ]}>
          {successTitle}
        </Text>
        <View style={styles.alertSeperatorStyle} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onPressSuccessButton();
          }}>
          <View style={styles.buttonAlertStyle}>
            <Text style={styles.buttonStyle}>{'OK'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLoadingAlertView = () => {
    return (
      <View style={styles.alertView}>
        <ActivityIndicator
          size="large"
          color={theme.colors.RED}
          style={{
            width: 39,
            height: 39,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
          }}
        />
        {/* <Loader style={{width: 39, height: 39, marginTop: 10, marginLeft: 5}} /> */}
        {/* <Text style={styles.titleStyle}>{'Loading...'}</Text> */}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.subViewContainer} />
      {showLoader && renderLoadingAlertView()}
      {showSuceessPopup && renderSuccessAlertView()}
    </View>
  );
};
