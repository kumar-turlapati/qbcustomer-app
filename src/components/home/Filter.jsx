import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import { CheckIcon, UnCheckIcon } from '../../icons/Icons';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import { Slider } from 'react-native-elements';
import _findIndex from 'lodash/findIndex';
import _uniq from 'lodash/uniq';
import _remove from 'lodash/remove';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  rowStyles: {
    marginHorizontal: 16,
    borderBottomColor: theme.colors.BLACK_WITH_OPACITY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowTextStyle: {
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK,
    marginTop: 6,
  },
  iconHeartStyle: {
    marginTop: 9,
    height: 16,
    width: 16,
    marginLeft: 2,
  },
  heartIconViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 40,
  },
  sectionHeaderStyles: {
    fontSize: 12,
    lineHeight: 14,
    marginHorizontal: 16,
    color: theme.colors.BLACK_WITH_OPACITY,
    marginTop: 35,
  },
  sliderView: {
    marginHorizontal: 16,
    borderBottomColor: theme.colors.BLACK_WITH_OPACITY,
    borderBottomWidth: 1,
    marginTop: 10
  },
  buttonViewStyles: {
    height: 70,
    position: 'absolute',
    backgroundColor: theme.colors.WHITE,
    width: '100%',
    bottom: 0,
    borderTopColor: theme.colors.BLACK_WITH_OPACITY,
    borderTopWidth: 1,
  },
  buttonStyles: {
    height: 46,
    marginTop: 12,
    borderColor: theme.colors.BLACK,
    borderWidth: 2,
    borderRadius: 3,
    width: width / 2 - 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.41,
  },
});

export const Filter = ({ route, navigation }) => {
  const {
    catalogBrands,
    catalogCategories,
    setBrandSelected,
    setCategorySelected,
    pricing,
    setPricingFilterValue,
  } = route.params;

  // console.log(setBrandSelected, setCategorySelected);

  const filterData = [
    {
      title: 'CATEGORY',
      data: catalogCategories,
    },
    {
      title: 'BRANDS',
      data: catalogBrands,
    },
  ];
  let selectedBrandStates = new Array();
  let selectedCategoryStates = new Array();
  catalogBrands.map((brandName) => {
    selectedBrandStates.push({ brandName: brandName, status: false });
  });
  catalogCategories.map((categoryName) => {
    selectedCategoryStates.push({ categoryName: categoryName, status: false });
  });

  const [filterOptions] = useState(filterData);
  const [sliderValue, setSliderValue] = useState(0);
  const [brandStates, setBrandStates] = useState(selectedBrandStates);
  const [categoryStates, setCategoryStates] = useState(selectedCategoryStates);
  const [brandsSelected, setBrandsSelected] = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState([]);

  // console.log(brandStates, 'brand states..............');

  const selectedBrandFilter = (brandName) => {
    const currentValue = _findIndex(
      brandStates,
      (brandDetails) => brandDetails.brandName === brandName,
    );
    const newValues = [...brandStates];
    newValues[currentValue] = {
      ...newValues[currentValue],
      status: !newValues[currentValue].status,
    };
    setBrandStates([...newValues]);

    if (!newValues[currentValue].status) {
      _remove(
        brandsSelected,
        (brandNameRemove) => brandNameRemove === brandName,
      );
    } else {
      setBrandsSelected([...brandsSelected, brandName]);
    }
  };

  const selectedCategoryFilter = (categoryName) => {
    const currentValue = _findIndex(
      categoryStates,
      (categoryDetails) => categoryDetails.categoryName === categoryName,
    );
    const newValues = [...categoryStates];
    newValues[currentValue] = {
      ...newValues[currentValue],
      status: !newValues[currentValue].status,
    };
    setCategoryStates([...newValues]);
    if (!newValues[currentValue].status) {
      _remove(
        categoriesSelected,
        (categoryRemove) => categoryRemove === categoryName,
      );
    } else {
      setCategoriesSelected([...categoriesSelected, categoryName]);
    }
  };

  // console.log(
  //   route.params.catalogBrands,
  //   route.params.catalogCategories,
  //   'params in filter.........',
  // );

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'FILTER'}
        isTabView={true}
        onPressRightButton={() => { }}
        isProduct={true}
        onPressFilterIcon={() => { }}
        onPressSortIcon={() => { }}
      />
    );
  };

  const renderRow = (item, index, title) => {
    return (
      <View style={styles.rowStyles}>
        <TouchableOpacity
          activeOpacity={1}
          style={{ width: 30, height: 30 }}
          onPress={() => {
            title === 'BRANDS'
              ? selectedBrandFilter(item)
              : selectedCategoryFilter(item);
          }}
          value={item}>
          {title === 'BRANDS' ? (
            brandStates[index].status ? (
              <CheckIcon style={styles.iconHeartStyle} />
            ) : (
                <UnCheckIcon style={styles.iconHeartStyle} />
              )
          ) : categoryStates[index].status ? (
            <CheckIcon style={styles.iconHeartStyle} />
          ) : (
                <UnCheckIcon style={styles.iconHeartStyle} />
              )}
        </TouchableOpacity>
        <Text style={styles.rowTextStyle}>{item}</Text>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <SectionList
        sections={filterOptions}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index, section: { title } }) =>
          renderRow(item, index, title)
        }
        renderSectionHeader={({ section: { title, index } }) => (
          <Text
            style={[
              styles.sectionHeaderStyles,
              { marginTop: index === 0 ? 100 : 35 },
            ]}>
            {title}
          </Text>
        )}
        ListFooterComponent={
          renderSliderView()
        }
      />
    );
  };

  const renderSliderView = () => {
    return (
      <View style={styles.sliderView}>
        <Text
          style={[
            styles.sectionHeaderStyles,
            {
              marginHorizontal: 0,
              marginTop: 15,
            },
          ]}>
          PRICE RANGE
        </Text>
        <Text style={[styles.rowTextStyle, { marginTop: 11 }]}>
          ₹{pricing.minimum} - ₹{pricing.maximum}
        </Text>
        <Slider
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value);
          }}
          thumbTintColor={theme.colors.SLIDER_THUMB_COLOR}
          style={{
            marginVertical: 5,
          }}
          minimumValue={pricing.minimum}
          maximumValue={pricing.maximum}
        />
      </View>
    );
  };

  const renderFloatingButtons = () => {
    return (
      <View style={styles.buttonViewStyles}>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonStyles}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={[styles.buttonTextStyle, { color: theme.colors.BLACK }]}>
              CANCEL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.buttonStyles,
              {
                marginLeft: 10,
                backgroundColor: theme.colors.RED,
                borderWidth: 0,
              },
            ]}
            onPress={() => {
              const brands = _uniq(brandsSelected);
              const categories = _uniq(categoriesSelected);
              // console.log(
              //   brands.join(),
              //   categories.join(),
              //   '+++++++++++++++++++++',
              // );
              setBrandSelected(brands.join());
              setCategorySelected(categories.join());
              setPricingFilterValue(sliderValue.toFixed(2));
              navigation.goBack();
            }}>
            <Text style={[styles.buttonTextStyle, { color: theme.colors.WHITE }]}>
              APPLY
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderFloatingButtons()}
    </View>
  );
};
