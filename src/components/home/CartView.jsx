import React from 'react';
import { Dimensions, StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import { Product, DeleteIcon } from '../../icons/Icons';
import { useState } from 'react';
import CommonAlertView from '../UI/CommonAlertView';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container
  },
  rowStyles: {
    height: 95,
    backgroundColor: theme.colors.WHITE,
    marginHorizontal: 16,
    flexDirection: 'row',
    width: winWidth - 32
  },
  rowTextStyles: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: - 0.41,
    color: theme.colors.BLACK
  },
  outOfStockView: {
    fontWeight: "normal",
    fontSize: 12,
    letterSpacing: - 0.41,
    color: theme.colors.WHITE,
    paddingHorizontal: 2,
    backgroundColor: theme.colors.RED,
    position: 'absolute',
    left: 8,
    bottom: 5,
    borderRadius: 5,
    overflow: 'hidden'
  },
  couponStyle: {
    fontSize: 12,
    color: theme.colors.BLACK,
    opacity: 0.5,
    lineHeight: 14
  },
  textInputStyles: {
    height: 45,
    width: 150,
    fontWeight: 'bold',
    fontSize: 12,
    color: theme.colors.BLACK,
    paddingLeft: 14
  },
  ledgerTextStyles: {
    fontWeight: 'normal',
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK
  }
})

const cartItems = [
  {
    id: 1,
    icon: <Product style={{ height: 95, width: 90 }} />,
    title: 'Grey Solid Suit 1',
    price: '₹2,754',
    quantity: 1,
    discount: '',
    inStock: true
  },
  {
    id: 2,
    icon: <Product style={{ height: 95, width: 90 }} />,
    title: 'Grey Solid Suit 2',
    price: '₹2,754',
    quantity: 1,
    discount: '50% OFF',
    inStock: true
  },
  {
    id: 3,
    icon: <Product style={{ height: 95, width: 90 }} />,
    title: 'Grey Solid Suit 3',
    price: '₹2,754',
    quantity: 1,
    discount: '',
    inStock: false
  }
]

export const CartView = ({ navigation }) => {

  const [couponText, setCouponText] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'My Cart'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack()
        }}
        onPressRightButton={() => { }}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {

        }}
      />
    );
  }

  const renderRow = (item, index) => {
    return (
      <View >
        <View style={{ backgroundColor: '#C4C4C4', opacity: 0.1, position: 'absolute', height: '100%', width: '100%' }} />
        {index === 0 && <View style={{ height: 16 }} />}
        <View style={styles.rowStyles}>
          {item.icon}
          <View style={{ marginLeft: 18, marginTop: 17 }}>
            <Text style={styles.rowTextStyles} > {item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ height: 30, backgroundColor: '#F9F9F9', marginTop: 10, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', width: 67 }}>
                <TouchableOpacity activeOpacity={1} onPress={() => { }}>
                  <Text style={{ paddingLeft: 8, paddingTop: 4 }}>-</Text>
                </TouchableOpacity>
                <Text style={{ paddingLeft: 4, paddingTop: 4 }}>1</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => { }}>
                  <Text style={{ paddingRight: 8, paddingTop: 4 }}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity activeOpacity={1} style={{ width: 40, height: 30, justifyContent: 'center', alignItems: 'center' }} onPress={() => { }}>
                <DeleteIcon style={{ width: 16, height: 16, marginTop: 15 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ top: 16, right: 25, position: 'absolute' }}>
            <Text style={[styles.rowTextStyles, { fontWeight: '600' }]}>{item.price}</Text>
            <Text style={[styles.rowTextStyles, { color: theme.colors.RED, marginTop: 10 }]}>{item.discount}</Text>
          </View>
          {!item.inStock && <Text style={styles.outOfStockView}>{'Out of stock'}</Text>}
        </View>
        {index === cartItems.length - 1 ?
          <View style={{ height: 16 }} />
          :
          <View style={{
            borderBottomWidth: 2,
            borderBottomColor: theme.colors.SEPERATOR_COLOR,
            marginHorizontal: 16
          }}
          />

        }
      </View>
    );
  }

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
        }}
        data={cartItems}
        renderItem={({ item, index }) => renderRow(item, index)}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    )
  }

  const renderCouponView = () => {
    return (
      <View style={{ marginTop: 5, marginHorizontal: 16 }}>
        <Text style={styles.couponStyle}>COUPON</Text>
        <View style={{ marginTop: 10, marginHorizontal: 0, borderColor: 'rgba(0,0,0,0.2)', borderWidth: 1, height: 45, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <TextInput
            style={styles.textInputStyles}
            placeholder={'Enter Coupon Code'}
            onChangeText={changedText => {
              setCouponText(changedText);
            }}
            value={couponText}
            maxLength={20}
            onEndEditing={e => {
            }}
          />
          <Text
            onPress={() => {

            }}
            style={{
              fontSize: 16,
              lineHeight: 19,
              color: theme.colors.RED,
              paddingVertical: 12,
              paddingHorizontal: 20,
            }}
          >
            Apply</Text>
          <View style={{ height: 45, width: 1, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.2)', top: 0, right: 80 }} />
        </View>
      </View >
    );
  }

  const renderLedger = () => {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 23 }}>
          <Text style={styles.ledgerTextStyles}>Bag Total</Text>
          <Text style={styles.ledgerTextStyles}>₹8,262</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={styles.ledgerTextStyles}>Bag discount</Text>
          <Text style={[styles.ledgerTextStyles, { color: theme.colors.RED }]}>₹1,377</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={styles.ledgerTextStyles}>Order Total</Text>
          <Text style={styles.ledgerTextStyles}>₹6,885</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 12 }}>
          <Text style={styles.ledgerTextStyles}>Delivery Charges</Text>
          <Text style={styles.ledgerTextStyles}>₹99</Text>
        </View>
        <View style={{ backgroundColor: 'black', opacity: 0.1, height: 1, marginTop: 20 }} />
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginTop: 13 }}>
          <Text style={[styles.ledgerTextStyles, { fontWeight: 'bold' }]}>Total</Text>
          <Text style={[styles.ledgerTextStyles, { fontWeight: 'bold' }]}>₹6984</Text>
        </View>
      </View>
    );
  }

  const renderButton = () => {
    return (
      <CommonButton
        buttonTitle={'PLACE ORDER'}
        onPressButton={() => {

          setShowLoader(true)
          setShowSuccessAlert(false)
          setShowAlert(true)

          setTimeout(() => {
            setShowSuccessAlert(true)
            setShowLoader(false)
          }, 1000);
        }}
        propStyle={{ marginTop: 34, marginHorizontal: 17, marginBottom: 25 }}
        propTextStyle={{
          fontWeight: 'bold',
          fontSize: 12,
          lineHeight: 22,
          letterSpacing: - 0.5
        }}
      />
    );
  }

  const renderAlert = () => {
    return (
      <CommonAlertView
        showLoader={showLoader}
        showSuceessPopup={showSuccessAlert}
        onPressSuccessButton={() => {
          setShowSuccessAlert(false)
          setShowAlert(false)
        }}
        successTitle={'Sorry, Order failed due technical reason. Please try again after some time'}
      />
    )
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      {renderHeader()}
      {renderListView()}
      {renderCouponView()}
      {renderLedger()}
      {renderButton()}
      {showAlert && renderAlert()}
    </ScrollView>
  );
};
