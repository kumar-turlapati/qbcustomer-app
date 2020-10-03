import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Text, FlatList, BackHandler} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {SideArrowIcon} from '../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../qbconfig';
// import CommonAlertView from '../UI/CommonAlertView';
import {Loader} from '../Loader';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import _find from 'lodash/find';
import _compact from 'lodash/compact';
import _startCase from 'lodash/startCase';
import _toLower from 'lodash/toLower';
import {NoDataMessage} from '../NoDataMessage';
import {useIsFocused} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

// import {CommonActions} from '@react-navigation/native';

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

export const Catalogue = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [catalogs, setCatalogs] = useState([]);
  const [errorText, setErrorText] = useState('');
  // const [showAlert, setShowAlert] = useState(false);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const {CATALOGS} = restEndPoints;
  // const {brandName, categoryId, subCategoryId} = route.params;
  const brandName =
    route.params && route.params.brandName ? route.params.brandName : '';
  const categoryId =
    route.params && route.params.categoryId ? route.params.categoryId : 0;
  const subCategoryId =
    route.params && route.params.subCategoryId ? route.params.subCategoryId : 0;
  const [errorMessage, setErrorMessage] = useState('');
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // BackHandler.exitApp();
        // return true;
        navigation.navigate(ScreenNamesCustomer.NEWHOME);
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  useEffect(() => {
    const getCatalogs = async () => {
      setLoading(true);
      const catalogsUrl = `${CATALOGS.URL}?categoryID=${categoryId}&subCategoryID=${subCategoryId}`;
      try {
        await axios
          .get(catalogsUrl, {
            headers: requestHeaders,
          })
          .then((apiResponse) => {
            // console.log(apiResponse, '----------------------');
            setLoading(false);
            if (apiResponse.data.status === 'success') {
              const catalogs = apiResponse.data.response.catalogs;
              const arrangedCatalogs = _find(catalogs, ['isDefault', '1']);
              const otherCatalogs = catalogs.map((catalogDetails) => {
                if (catalogDetails.isDefault === '0') return catalogDetails;
              });
              const finalCatalogs = _compact([
                arrangedCatalogs,
                ...otherCatalogs,
              ]);
              setCatalogs(finalCatalogs);
            } else {
              // console.log('here.............................');
              setErrorText('Catalogs are not yet created :(');
            }
          })
          .catch((error) => {
            setLoading(false);
            setShowNoDataMessage(true);
            setErrorMessage('Catalogs are coming soon :)');
          });
      } catch (error) {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        setLoading(false);
        setShowNoDataMessage(true);
        setErrorMessage('Network Error. Please try again.');
      }
    };
    if (isFocused) getCatalogs();
    return () => {
      setCatalogs([]);
      setShowNoDataMessage(false);
      navigation.setParams({
        categoryId: undefined,
        subCategoryId: undefined,
        brandName: undefined,
      });
    };
  }, [isFocused]);

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        data={catalogs}
        renderItem={({item}) => renderRow(item)}
        keyExtractor={(item) => item.catalogCode}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={`${_startCase(_toLower(brandName))} Catalogs`}
        isTabView={false}
        onPressRightButton={() => {}}
        onPressLeftButton={() => {
          navigation.navigate(ScreenNamesCustomer.NEWHOME);
        }}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {
          navigation.push(ScreenNamesCustomer.WISHLIST);
        }}
      />
    );
  };

  const renderRow = (item) => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(ScreenNamesCustomer.HOME, {
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
  ) : showNoDataMessage ? (
    <NoDataMessage message={errorMessage} />
  ) : (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {/* {showAlert && (
        <CommonAlertView
          showLoader={false}
          showSuceessPopup
          onPressSuccessButton={() => {
            setShowAlert(false);
          }}
          successTitle={errorText}
        />
      )} */}
    </View>
  );
};
