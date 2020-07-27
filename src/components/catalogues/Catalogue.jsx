import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {SideArrowIcon} from '../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {
  restEndPoints,
  requestHeaders,
  cdnUrl,
  clientCode,
} from '../../../qbconfig';
import CommonAlertView from '../UI/CommonAlertView';
import {Loader} from '../Loader';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR,
  },
  rowViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
    marginLeft: 20,
  },
  defaultTextStyles: {
    backgroundColor: theme.colors.RED,
    borderRadius: 10,
    ...theme.viewStyles.commonTextStyles,
    color: theme.colors.WHITE,
    height: 17,
    overflow: 'hidden',
    paddingHorizontal: 6,
    marginTop: 22,
    marginLeft: 10,
    lineHeight: 16,
  },
});

// const catalogue = [
//   {
//     id: 1,
//     title: 'Catalogue 1',
//     description: 'Material used for suits',
//     isDefault: true,
//   },
//   {
//     id: 2,
//     title: 'Catalogue 2',
//     description: 'Material for shirting',
//     isDefault: false,
//   },
//   {
//     id: 3,
//     title: 'Catalogue 3',
//     description: 'Material for Pants',
//     isDefault: false,
//   },
//   {
//     id: 4,
//     title: 'Catalogue 4',
//     description: 'Material for Pants',
//     isDefault: false,
//   },
// ];

export const Catalogue = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [errorText, setErrorText] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const {CATALOGS} = restEndPoints;

  useEffect(() => {
    const getCatalogs = async () => {
      setLoading(true);
      try {
        await axios
          .get(CATALOGS.URL, {headers: requestHeaders})
          .then((apiResponse) => {
            setLoading(false);
            // console.log(apiResponse, '----------------------');
            if (apiResponse.data.status === 'success') {
              setCatalogs(apiResponse.data.response.catalogs);
            } else {
              setErrorText('Catalogs are not yet created :(');
            }
          })
          .catch((error) => {
            // console.log(
            //   error,
            //   '@@@@@@@@@@@@@@@@@@@@@@@@@@',
            //   CATALOGS.URL,
            //   requestHeaders,
            // );
            setLoading(false);
            setErrorText(error.response.data.errortext);
            setShowAlert(true);
          });
      } catch {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        setLoading(false);
        setErrorText('Network Error. Please try again.');
        setShowAlert(true);
      }
    };
    getCatalogs();
  }, []);

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        data={catalogs}
        renderItem={({item, index}) => renderRow(item)}
        keyExtractor={(item) => item.catalogCode}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Catalogue'}
        isTabView={true}
        onPressRightButton={() => {}}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {}}
      />
    );
  };

  const renderRow = (item) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.push(ScreenNamesCustomer.TABBAR, {
              catalogCode: item.catalogCode,
            });
          }}>
          <View style={styles.rowViewStyle}>
            <View>
              <View style={{flexDirection: 'row', marginLeft: 20}}>
                <Text style={styles.titleTextStyle}>{item.catalogName}</Text>
                {parseInt(item.isDefault, 10) === 1 && (
                  <Text style={styles.defaultTextStyles}>Latest</Text>
                )}
              </View>
              <Text style={styles.descriptionTextStyle}>
                {item.catalogDesc}
              </Text>
            </View>
            <SideArrowIcon
              style={{width: 24, height: 24, marginTop: 33, marginRight: 20}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {showAlert && (
        <CommonAlertView
          showLoader={false}
          showSuceessPopup
          onPressSuccessButton={() => {
            setShowAlert(false);
          }}
          successTitle={errorText}
        />
      )}
    </View>
  );
};
