import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Linking,
  BackHandler,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Logo, TextBoxSelect, QLogo} from '../icons/Icons';
import {theme} from '../theme/theme';
import {
  isMobileNumberValid,
  isMobileNumberValidWithReason,
} from '../utils/Validators';
import CommonButton from './UI/CommonButton';
import {colors} from '../theme/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNamesCustomer} from './navigationController/ScreenNames';
import axios from 'axios';
import {restEndPoints, requestHeaders, qbUrl, clientCode} from '../../qbconfig';
import useAsyncStorage from '../components/customHooks/async';
import {useFocusEffect} from '@react-navigation/native';
import {Loader} from './Loader';
import {NoDataMessage} from './NoDataMessage';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  subContainer: {
    marginHorizontal: 32,
    marginTop: 60,
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
  otpTextStyle: {
    ...theme.viewStyles.subTextCommonStyles,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 'normal',
    marginTop: 2,
    color: colors.RED,
    fontWeight: '700',
  },
});

export const Login = ({navigation}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [showOTPView, setShowOTPView] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [showOtpButton, setShowOTPButton] = useState(true);
  const [disableResendOtp, setDisableResendOtp] = useState(false);
  const [uuid, setUuid] = useState('');
  const [apiErrorText, setApiErrorText] = useState('');
  const {LOGIN, RESEND_OTP, GET_TOKEN} = restEndPoints;
  const [loading, setLoading] = useState(false);
  const {updateStorageItem: storeUuid} = useAsyncStorage('@uuid');
  const {updateStorageItem: storeAccessToken} = useAsyncStorage('@accessToken');
  const {storageItem: storedAccessToken, tokenLoading} = useAsyncStorage(
    '@accessToken',
  );
  const [contactDetails, setContactDetails] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {CONTACT_INFORMATION} = restEndPoints;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        // return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  // console.log(tokenLoading, 'tokent loading..........');
  // console.log(contactDetails, '........contact details......');

  const showTickMark =
    mobileNumber.length === 10 && isMobileNumberValid(mobileNumber);

  const disableLoginButton = !(mobileNumber.length === 10 && otp.length === 4);

  useEffect(() => {
    SplashScreen.hide();
    const getAppDetails = async () => {
      const contactUrl = `${CONTACT_INFORMATION.URL()}?clientCode=${clientCode}`;
      setApiLoading(true);
      try {
        await axios
          .get(contactUrl, {headers: requestHeaders})
          .then((apiResponse) => {
            setApiLoading(false);
            // console.log(apiResponse.data, 'api response is.......');
            if (apiResponse.data.status === 'success') {
              setContactDetails(apiResponse.data.response.contactDetails);
            }
          })
          .catch((error) => {
            console.log(error.response.data);
            const errorMessage = error.response.data;
            setApiLoading(false);
            setShowNoDataMessage(true);
            setErrorMessage(errorMessage);
          });
      } catch (e) {
        const errorMessage = 'Network error. Please try again :(';
        setApiLoading(false);
        setErrorMessage(errorMessage);
        setShowNoDataMessage(true);
      }
    };
    getAppDetails();
  }, []);

  useEffect(() => {
    if (storedAccessToken && storeAccessToken.length > 0) {
      navigation.push(ScreenNamesCustomer.TABBAR);
    }
  }, [storedAccessToken]);

  const getOtp = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          LOGIN.URL,
          {
            mobileNo: mobileNumber,
          },
          {headers: requestHeaders},
        )
        .then((apiResponse) => {
          setLoading(false);
          if (apiResponse.data.status === 'success') {
            const uuid = apiResponse.data.response.response.uuid;
            setUuid(uuid);
            storeUuid(uuid);
            setShowOTPView(true);
            setShowLoginButton(true);
            setShowOTPButton(false);
          }
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          setApiErrorText(errorText);
          setLoading(false);
        });
    } catch {
      setLoading(false);
      setApiErrorText('Network error. Please try again after some time.');
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          RESEND_OTP.URL,
          {
            uuid: uuid,
          },
          {headers: requestHeaders},
        )
        .then((apiResponse) => {
          setLoading(false);
          // console.log(apiResponse, 'apiResponse Resend Otp');
          // if (apiResponse.data.status === 'success') {
          // }
        })
        .catch((error) => {
          // console.log(error, 'error in Resend Otp');
          const errorText = error.response.data.errortext;
          setApiErrorText(errorText);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      // console.log(e, 'error in Resend Otp Catch block');
      setApiErrorText('Network error. Please try again after some time.');
    }
  };

  const getAccessTokenFromApi = async () => {
    setLoading(true);
    try {
      await axios
        .post(
          GET_TOKEN.URL,
          {
            uuid: uuid,
            otp: otp,
          },
          {headers: requestHeaders},
        )
        .then((apiResponse) => {
          setLoading(false);
          if (apiResponse.data.status === 'success') {
            storeAccessToken(apiResponse.data.response.accessToken);
            navigation.push(ScreenNamesCustomer.WALKTHROUGHSCREEN);
          }
        })
        .catch((error) => {
          const errorText = error.response.data.errortext;
          setApiErrorText(errorText);
          setLoading(false);
        });
    } catch {
      setLoading(false);
      setApiErrorText('Network error. Please try again after some time.');
    }
  };

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
        <Text style={styles.phoneHeaderStyle}>Mobile Number</Text>
        <View
          style={{
            marginTop: 11,
          }}>
          <TextInput
            style={styles.textInputStyles}
            placeholder="Type your mobile number"
            onChangeText={(changedText) => {
              setApiErrorText('');
              setShowLoginButton(false);
              setShowOTPButton(true);
              setShowOTPView(false);
              setMobileNumber(changedText);
            }}
            maxLength={10}
            keyboardType="number-pad"
            onEndEditing={(e) => {
              const validateMobileNumber = isMobileNumberValidWithReason(
                e.nativeEvent.text,
              );
              if (validateMobileNumber && !validateMobileNumber.status)
                setApiErrorText(validateMobileNumber.reason);
            }}
            textContentType="telephoneNumber"
            dataDetectorTypes="phoneNumber"
          />
          {showTickMark && (
            <TextBoxSelect
              style={{
                width: 21,
                height: 21,
                top: 15,
                right: 17,
                position: 'absolute',
              }}
            />
          )}
        </View>
        {showOTPView && (
          <View>
            <TextInput
              style={[styles.textInputStyles, {marginTop: 15}]}
              placeholder="OTP"
              onChangeText={(otp) => {
                setOTP(otp);
              }}
              maxLength={4}
              keyboardType="number-pad"
              onEndEditing={(e) => {
                const otp = e.nativeEvent.text;
                getAccessTokenFromApi();
              }}
              textContentType="oneTimeCode"
            />
            <Text style={styles.otpTextStyle}>
              If you have any issues with OTP please call us on{' '}
              {contactDetails &&
              contactDetails.appContactTech &&
              contactDetails.appContactTech.length > 0
                ? contactDetails.appContactTech
                : ''}
            </Text>
          </View>
        )}
      </>
    );
  };

  const renderButtonGetOtp = () => {
    return (
      <CommonButton
        buttonTitle="GET OTP"
        onPressButton={() => {
          getOtp();
        }}
        propStyle={{marginTop: 16}}
        disabled={!showTickMark || loading}
        disableButton={!showTickMark || loading}
      />
    );
  };

  const renderButtonLogin = () => {
    return (
      <CommonButton
        buttonTitle="LOGIN"
        onPressButton={() => {
          getAccessTokenFromApi();
        }}
        propStyle={{marginTop: 16}}
        disabled={disableLoginButton || loading}
        disableButton={disableLoginButton || loading}
      />
    );
  };

  const renderErrorMessage = () => {
    return (
      <>
        {apiErrorText.length > 0 ? (
          <Text style={styles.errorTextStyles}>{apiErrorText}</Text>
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
    // console.log('disableResendOtp', disableResendOtp);
    return (
      <>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setDisableResendOtp(true);
            resendOtp();
            setTimeout(() => {
              setDisableResendOtp(false);
            }, 5000);
          }}
          disabled={disableResendOtp}>
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
              Didn't receive OTP?{' '}
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
        <TouchableOpacity
          onPress={() => Linking.openURL(qbUrl)}
          activeOpacity={1}>
          <QLogo />
        </TouchableOpacity>
      </View>
    );
  };

  return tokenLoading || apiLoading ? (
    <Loader />
  ) : showNoDataMessage ? (
    <NoDataMessage message={errorMessage} />
  ) : (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Logo style={{width: 55, height: 74}} />
        {renderWelcomeName()}
        {renderPhoneField()}
        {showOtpButton && renderButtonGetOtp()}
        {showLoginButton && renderButtonLogin()}
        {apiErrorText.length > 0 && renderErrorMessage()}
        {showOTPView && renderResendOTPView()}
      </View>
      {renderFooterView()}
    </View>
  );
};
