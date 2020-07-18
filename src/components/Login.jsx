import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Logo, TextBoxSelect, QLogo } from '../icons/Icons';
import { theme } from '../theme/theme';
import { isMobileNumberValid } from '../utils/Validators';
import CommonButton from './UI/CommonButton';
import { colors } from '../theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenNamesCustomer } from './navigationController/ScreenNames';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  subContainer: {
    marginHorizontal: 32,
    marginTop: 60
  },
  textStyles: {
    ...theme.viewStyles.textCommonStyles,
    marginTop: 11,
  },
  phoneHeaderStyle: {
    ...theme.viewStyles.subTextCommonStyles,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: 'normal',
    marginTop: 35,
  },
  textInputStyles: {
    ...theme.viewStyles.textInputStyles,
    paddingLeft: 16,
  },
  errorTextStyles: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: -0.24,
    marginTop: 25,
    color: colors.RED,
  },
  footerViewStyles: {
    height: 70,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    borderTopColor: theme.colors.BORDER_COLOR,
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Login = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState(null);
  const [otp, setOTP] = useState(null);
  const [isMobileNumberError, setIsMobileNumberError] = useState(false);
  const [isMobileAPIError, setIsMobileAPIError] = useState(false);

  const [showOTPView, setShowOTPView] = useState(false);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const renderWelcomeName = () => {
    return (
      <>
        <Text style={styles.textStyles}>Welcome</Text>
        <Text style={theme.viewStyles.subTextCommonStyles}>
          and sign in to continue
        </Text>
      </>
    );
  };

  const renderPhoneField = () => {
    return (
      <>
        <Text style={styles.phoneHeaderStyle}>Phone Number</Text>
        <View
          style={{
            marginTop: 11,
          }}>
          <TextInput
            style={styles.textInputStyles}
            placeholder="Mobile number"
            onChangeText={(changedText) => {
              setMobileNumber(changedText);
            }}
            maxLength={10}
            keyboardType="number-pad"
            onEndEditing={(e) => {
              const validateMobileNumber = isMobileNumberValid(
                e.nativeEvent.text,
              );
              if (validateMobileNumber && !validateMobileNumber.status) {
                // setMobileNumberError(validateMobileNumber.reason);
                setIsMobileNumberError(true);
              } else {
                // setMobileNumberError('');
                setIsMobileNumberError(false);
              }
            }}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
          />
          <TextBoxSelect
            style={{
              width: 21,
              height: 21,
              top: 15,
              right: 17,
              position: 'absolute',
            }}
          />
        </View>
        {showOTPView && (
          <TextInput
            style={[styles.textInputStyles, { marginTop: 15 }]}
            placeholder="3514"
            onChangeText={(changedText) => {
              setOTP(changedText);
            }}
            maxLength={5}
            keyboardType="number-pad"
            onEndEditing={(e) => { }}
          />
        )}
      </>
    );
  };

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={!showOTPView ? 'GET OTP' : 'LOGIN'}
        onPressButton={() => {
          if (!showOTPView) {
            setIsMobileAPIError(true);

            setTimeout(() => {
              setShowOTPView(true);
              setIsMobileAPIError(false);
            }, 1000);
          } else {
            navigation.push(ScreenNamesCustomer.WALKTHROUGHSCREEN);
          }
        }}
        propStyle={{ marginTop: 16 }}
      />
    );
  };

  const renderErrorMessage = () => {
    return (
      <>
        {isMobileAPIError ? (
          <Text style={styles.errorTextStyles}>
            We are sorry. You are not authorized to use this App. Please contact
            XXXXXXXX for your account activation.
          </Text>
        ) : (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                console.log('resend otp cliced');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 30,
                  marginTop: 20,
                }}>
                <Text
                  style={[
                    styles.errorTextStyles,
                    {
                      textAlign: 'center',
                      color: colors.BLACK,
                      marginTop: 0,
                    },
                  ]}>
                  Didn’t receive OTP?{' '}
                </Text>
                <Text
                  style={[
                    styles.errorTextStyles,
                    {
                      textAlign: 'center',
                      textDecorationLine: 'underline',
                      fontWeight: '500',
                      marginTop: 0,
                    },
                  ]}>
                  Resend
              </Text>
              </View>
            </TouchableOpacity>
          )}
      </>
    );
  };

  const renderResendOTPView = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            console.log('resend otp cliced');
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              height: 30,
              marginTop: 20,
            }}>
            <Text
              style={[
                styles.errorTextStyles,
                {
                  textAlign: 'center',
                  color: colors.BLACK,
                  marginTop: 0,
                },
              ]}>
              Didn’t receive OTP?{' '}
            </Text>
            <Text
              style={[
                styles.errorTextStyles,
                {
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  fontWeight: '500',
                  marginTop: 0,
                },
              ]}>
              Resend
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderFooterView = () => {
    return (
      <View style={styles.footerViewStyles}>
        <QLogo />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Logo style={{ width: 55, height: 74 }} />
        {renderWelcomeName()}
        {renderPhoneField()}
        {renderButton()}
        {isMobileAPIError && renderErrorMessage()}
        {showOTPView && renderResendOTPView()}
      </View>
      {renderFooterView()}
    </View>
  );
};
