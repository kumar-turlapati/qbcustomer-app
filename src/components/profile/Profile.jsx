import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {
  SideArrowIcon,
  OrderIcon,
  WishListIcon,
  LedgerIcon,
  LogoutIcon,
} from '../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import AsyncStorage from '@react-native-community/async-storage';
import packageJson from '../../../package.json';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../qbconfig';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR,
  },
  rowViewStyle: {
    borderBottomColor: theme.colors.BORDER_COLOR,
    borderBottomWidth: 1,
    backgroundColor: theme.colors.WHITE,
    marginTop: 2,
  },
  titleTextStyle: {
    ...theme.viewStyles.buttonTextStyles,
    color: theme.colors.BLACK,
    marginTop: 24,
  },
  descriptionTextStyle: {
    ...theme.viewStyles.productListTextStyles,
    fontWeight: 'normal',
    color: theme.colors.BLACK_WITH_OPACITY,
    marginBottom: 24,
  },
});

const profileOptions = [
  {
    id: 1,
    title: 'Orders',
    description: 'All about your orders',
    icon: <OrderIcon style={{width: 34, height: 34, marginTop: 30}} />,
  },
  {
    id: 2,
    title: 'Wishlist',
    description: 'List of what you like to order',
    icon: (
      <WishListIcon
        style={{
          width: 20,
          height: 20,
          marginTop: 35,
          marginLeft: 6,
          marginRight: 8,
        }}
      />
    ),
  },
  {
    id: 3,
    title: 'Ledger',
    description: 'Check your Transactions & Balance',
    icon: (
      <LedgerIcon
        style={{
          width: 24,
          height: 26,
          marginTop: 30,
          marginLeft: 6,
          marginRight: 4,
        }}
      />
    ),
  },
  {
    id: 4,
    title: 'Logout',
    description: 'Exit from the app',
    icon: (
      <LogoutIcon
        style={{
          width: 24,
          height: 26,
          marginTop: 30,
          marginLeft: 6,
          marginRight: 4,
        }}
      />
    ),
  },
];

export const Profile = ({navigation}) => {
  const [apiLoading, setApiLoading] = useState(true);
  const [contactDetails, setContactDetails] = useState([]);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {CONTACT_INFORMATION} = restEndPoints;

  // console.log(contactDetails, 'contact details...................');

  useEffect(() => {
    const getAppDetails = async () => {
      setApiLoading(true);
      try {
        await axios
          .get(CONTACT_INFORMATION.URL(), {headers: requestHeaders})
          .then((apiResponse) => {
            setApiLoading(false);
            if (apiResponse.data.status === 'success') {
              setContactDetails(apiResponse.data.response.contactDetails);
            }
          })
          .catch((error) => {
            // console.log(error.response.data);
            const errorMessage = error.response.data;
            setShowNoDataMessage(true);
            setErrorMessage(errorMessage);
          });
      } catch (e) {
        const errorMessage = 'Network error. Please try again :(';
        setErrorMessage(errorMessage);
        setShowNoDataMessage(true);
      }
    };
    getAppDetails();
  }, []);

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText="My Account"
        isTabView={true}
        onPressRightButton={() => {}}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {
          navigation.push(ScreenNamesCustomer.WISHLIST);
        }}
      />
    );
  };

  const renderRow = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            if (index === 0) {
              navigation.navigate(ScreenNamesCustomer.ORDER);
            } else if (index === 1) {
              navigation.push(ScreenNamesCustomer.WISHLIST);
            } else if (index === 2) {
              navigation.push(ScreenNamesCustomer.LEDGER);
            } else if (index === 3) {
              AsyncStorage.clear();
              navigation.push(ScreenNamesCustomer.LOGIN);
            }
          }}>
          <View style={styles.rowViewStyle}>
            <View
              style={{
                marginHorizontal: 20,
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row'}}>
                {item.icon}
                <View style={{marginLeft: 30}}>
                  <Text style={styles.titleTextStyle}>{item.title}</Text>
                  <Text style={styles.descriptionTextStyle}>
                    {item.description}
                  </Text>
                </View>
              </View>
              <SideArrowIcon style={{width: 24, height: 24, marginTop: 33}} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        data={profileOptions}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderVersion = () => {
    return (
      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
          marginHorizontal: 20,
          fontSize: 12,
        }}>
        <Text style={theme.viewStyles.versionTextStyle}>
          Version No. {packageJson.version}
        </Text>
        <Text
          style={[
            theme.viewStyles.versionTextStyle,
            {marginTop: 5, color: 'darkgrey', fontSize: 11},
          ]}>
          If you encounter any bugs, delayed deliveries, billing errors or other
          technical problems in this Application, please call us on{' '}
          {contactDetails.appContactTech}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderVersion()}
      {showNoDataMessage && <NoDataMessage message={errorMessage} />}
    </View>
  );
};
