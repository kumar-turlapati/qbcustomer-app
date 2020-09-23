import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RaymondLinenLogo,
  RaymondLogo,
  SiyaramsLogo,
  Zaccari,
} from '../../icons/Icons';
import {colors} from '../../theme/colors';
import {theme} from '../../theme/theme';
import CommonSearchHeader from '../UI/CommonSearchHeader';
import _orderBy from 'lodash/orderBy';
import {cdnUrl, clientCode} from '../../../qbconfig';
import {Image} from 'react-native-elements';
import {Loader} from '../Loader';
import _startCase from 'lodash/startCase';
import _toLower from 'lodash/toLower';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  brandRowStyles: {
    width: width / 2,
    height: 180,
    borderRightWidth: 0.5,
    borderRightColor: colors.SEPERATOR_COLOR,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SEPERATOR_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    backgroundColor: colors.SNOW,
    paddingVertical: 15,
    paddingLeft: 20,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
  searchRowStyles: {
    height: 44,
    backgroundColor: theme.colors.WHITE,
    width: width,
    borderBottomColor: theme.colors.SEPERATOR_COLOR,
    borderBottomWidth: 0.5,
  },
  searchRowTextStyles: {
    paddingLeft: 15,
    paddingTop: 10,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: theme.colors.BLACK,
  },
});

const genderData = [
  {
    id: 1,
    title: 'Men',
    image: <RaymondLogo style={{width: 150, height: 150}} />,
  },
  {
    id: 2,
    title: 'Women',
    image: <RaymondLinenLogo style={{width: 150, height: 150}} />,
  },
  {
    id: 3,
    title: 'Boy',
    image: <Zaccari style={{width: 150, height: 150}} />,
  },
  {
    id: 4,
    title: 'Girl',
    image: <SiyaramsLogo style={{width: 150, height: 150}} />,
  },
];

export const ShowBrands = ({route, navigation}) => {
  const {title, catsSubcats, categoryId} = route.params;

  const [showSearch, setShowSearch] = useState(false);
  const [searchData, setSearchData] = useState(genderData);

  let brands = [];
  catsSubcats.map((catSubCatDetails) => {
    if (parseInt(catSubCatDetails.parentID) === parseInt(categoryId))
      brands.push(catSubCatDetails);
  });

  const orderedBrands = _orderBy(brands, ['weight'], ['asc']);

  useEffect(() => {
    return () => {
      setShowSearch(false);
    };
  }, []);

  const renderHeader = () => {
    return (
      <CommonSearchHeader
        leftSideText={'Shop Name'}
        isSearch={showSearch}
        isTabView={false}
        onPressSearchIcon={() => {
          console.log('onPressSearchIcon');
          setShowSearch(true);
        }}
        onPressSearchCloseButton={() => {
          console.log('onPressSearchCloseButton');
          setSearchData(genderData);
        }}
        onTextChange={(changedText) => {
          console.log('onTextChange', changedText);
          let filteredArray = genderData.filter((str) => {
            return (
              str.title.toLowerCase().indexOf(changedText.toLowerCase()) >= 0
            );
          });
          setSearchData(filteredArray);
          console.log('filteredArray', filteredArray);
        }}
        onPressBackButton={() => {
          console.log('onPressBackButton');
          setShowSearch(false);
        }}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
      />
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={orderedBrands}
        numColumns={2}
        renderItem={({item}) => renderRow(item)}
        keyExtractor={(item) => item.categoryCode}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderRow = (item) => {
    const imageUrl = encodeURI(
      `${cdnUrl}/${clientCode}/categories/${item.imageName}`,
    );
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
          navigation.navigate(ScreenNamesCustomer.CATALOGUE, {
            brandName: item.categoryName,
            categoryId: categoryId,
            subCategoryId: item.categoryID,
          });
        }}>
        <Image
          source={{uri: imageUrl}}
          style={{width: 150, height: 150}}
          resizeMode="stretch"
          PlaceholderContent={<Loader />}
        />
      </TouchableOpacity>
    );
  };

  const renderSearchView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          position: 'absolute',
          marginTop: 88,
          height: height - 88,
          backgroundColor: theme.colors.BLACK_WITH_OPACITY_5,
        }}
        data={searchData}
        renderItem={({item}) => renderSearchRow(item)}
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderSearchRow = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.searchRowStyles}
        onPress={() => {}}>
        <Text style={styles.searchRowTextStyles}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      <Text style={styles.titleStyle}>
        {_startCase(_toLower(title))}'s Collection
      </Text>
      {renderListView()}
      {showSearch && renderSearchView()}
    </View>
  );
};
