import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {theme} from '../../theme/theme';

const styles = StyleSheet.create({
  mainButtonStyle: {
    ...theme.viewStyles.buttonStyle,
  },
  buttonTextStyles: {
    ...theme.viewStyles.buttonTextStyles,
  },
});

export default CommonButton = ({
  buttonTitle,
  onPressButton,
  propStyle,
  disableButton,
  propTextStyle,
}) => {
  const renderButtom = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            onPressButton();
          }}>
          <View
            style={[
              styles.mainButtonStyle,
              propStyle,
              {opacity: disableButton ? 0.5 : 1},
            ]}>
            <Text
              style={[styles.buttonTextStyles, propTextStyle]}
              textAlign={'center'}>
              {buttonTitle}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return <>{renderButtom()}</>;
};
