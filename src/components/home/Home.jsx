import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import { Cloth1, Cloth2, Cloth3, Cloth4, HeartUnSelected, HeartSelected, CheckIcon, UnCheckIcon } from '../../icons/Icons';

import CommonHeader from '../UI/CommonHeader';
import { Overlay } from 'react-native-elements';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container
  },
  rowStyles: {
    height: 210,
    marginBottom: 16,
    width: width / 2 - 24,
    marginLeft: 16,
  },
  rowTextStyle: {
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: - 0.41,
    color: theme.colors.PRODUCT_LIST_TEXT_COLOR,
    marginTop: 2
  },
  specialPriceStyle: {
    ...theme.viewStyles.productListTextStyles
  },
  originalPriceStyle: {
    ...theme.viewStyles.productListTextStyles,
    color: theme.colors.PRODUCT_LIST_ORIGINAL_TEXT_COLOR,
    textDecorationLine: 'line-through',
    marginLeft: 8
  },
  discountStyle: {
    ...theme.viewStyles.productListTextStyles,
    color: theme.colors.PRODUCT_LIST_DISCOUNT_TEXT_COLOR,
    fontWeight: 'normal',
    fontSize: 12,
    marginLeft: 8
  },
  iconHeartStyle: {
    marginTop: 8,
    marginLeft: 18,
    height: 14,
    width: 14
  },
  heartIconViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 40,
  },
  viewOverlay: {
    width: '100%',
    height: 127,
    backgroundColor: theme.colors.WHITE,
  },
  sortByTextStyle: {
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.BLACK_WITH_OPACITY,
    marginLeft: 18
  },
  sortPriceTextStyle: {
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK,
    marginLeft: 4,
    marginTop: 4
  }
})

const clothes = [
  {
    id: 1,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth1 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 2,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: <Cloth2 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 3,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth3 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 4,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: <Cloth4 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 5,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth1 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 6,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: <Cloth2 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 7,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth3 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 8,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: <Cloth4 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 9,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth1 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 10,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: <Cloth2 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 11,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth3 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 12,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: <Cloth4 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 13,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth1 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 14,
    name: 'Brown Suit Clothing',
    originalPrice: '2,500',
    discount: '',
    specialPrice: '',
    selected: false,
    icon: <Cloth2 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 15,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,500',
    discount: '',
    specialPrice: '2,754',
    selected: false,
    icon: <Cloth3 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
  {
    id: 16,
    name: 'Grey Solid Suit  Clothing',
    originalPrice: '3,000',
    discount: '20% off',
    specialPrice: '2,574',
    selected: false,
    icon: <Cloth4 style={{
      width: width / 2 - 24,
      height: 164
    }} />
  },
]

export const Home = ({ navigation }) => {

  const [arrayObjects, setArrayObjects] = useState(clothes)
  const [showSortView, setShowSortView] = useState(false)
  const [lowToHightSelected, setLowToHightSelected] = useState(true)

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Products'}
        isTabView={true}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW)
        }}
        isProduct={true}
        onPressFilterIcon={() => {
          navigation.push(ScreenNamesCustomer.FILTER)
        }}
        onPressSortIcon={() => {
          setShowSortView(!showSortView)
        }}
      />
    );
  }

  const renderRow = (item, index) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        navigation.push(ScreenNamesCustomer.PRODUCTDETAILS)
      }}>
        <View style={styles.rowStyles}>
          {item.icon}
          <Text style={styles.rowTextStyle}>{item.name}</Text>
          {item.specialPrice.length !== 0 ?
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.specialPriceStyle}>₹{item.specialPrice}</Text>
              <Text style={styles.originalPriceStyle}>₹{item.originalPrice}</Text>
              <Text style={styles.discountStyle}>{item.discount.toUpperCase()}</Text>
            </View>
            :
            <Text style={styles.specialPriceStyle}>₹{item.originalPrice}</Text>
          }
          <TouchableOpacity activeOpacity={1} style={styles.heartIconViewStyles} onPress={() => {
            clothes[index].selected = true
            setArrayObjects([...clothes])
          }}>
            {item.selected ? <HeartSelected style={styles.iconHeartStyle} /> : <HeartUnSelected style={styles.iconHeartStyle} />}
          </TouchableOpacity>
        </View>
      </TouchableOpacity >
    );
  }

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={arrayObjects}
        numColumns={2}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  const close = () => {
    setShowSortView(false)
  }

  const renderSortView = () => {
    return (
      <Overlay
        onRequestClose={() => close()}
        isVisible={showSortView}
        windowBackgroundColor={'rgba(0, 0, 0, 0.8)'}
        containerStyle={{
          marginBottom: 20,
        }}
        fullScreen
        transparent
        overlayStyle={{
          padding: 0,
          margin: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          overflow: 'hidden',
          elevation: 0,
        }}
      >
        <View
          style={{
            flexGrow: 1,
            backgroundColor: 'transparent',
          }}
        >
          {renderHeader()}
          <View style={styles.viewOverlay}>
            <Text style={styles.sortByTextStyle}>SORT BY</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, marginHorizontal: 18 }}>
              <TouchableOpacity activeOpacity={1} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                setLowToHightSelected(false)
              }}>
                {!lowToHightSelected ? <CheckIcon style={{ width: 16, height: 16 }} /> : <UnCheckIcon style={{ width: 16, height: 16 }} />}

              </TouchableOpacity>
              <Text style={styles.sortPriceTextStyle}>Price - High to Low</Text>
            </View>
            <View style={{ backgroundColor: 'black', opacity: 0.2, marginHorizontal: 18, height: 1, marginTop: 15 }} />
            <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 18 }}>
              <TouchableOpacity activeOpacity={1} style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                setLowToHightSelected(true)
              }}>
                {lowToHightSelected ? <CheckIcon style={{ width: 16, height: 16 }} /> : <UnCheckIcon style={{ width: 16, height: 16 }} />}
              </TouchableOpacity>
              <Text style={[styles.sortPriceTextStyle, { marginTop: 5 }]}>Price - Low to High</Text>
            </View>
          </View>
        </View>
      </Overlay>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {showSortView && renderSortView()}
    </View>
  );
};
