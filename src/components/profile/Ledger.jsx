import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: 'rgba(196,196,196,0.1)'
  },
  transactionViewStyles: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    height: 80,
  },
  titleTextStyle: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: - 0.41,
    marginLeft: 16,
    marginTop: 15
  },
  amountStyle: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: - 0.41,
    marginLeft: 16,
    marginTop: 8
  },
  textStyle: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: - 0.41
  }
})

const amounts = [
  {
    "title": 'Opening',
    "amount": '10,000'
  },
  {
    "title": 'Debits',
    "amount": '20,000'
  },
  {
    "title": 'Credits',
    "amount": '10,000'
  },
  {
    "title": 'Closing',
    "amount": '10,000'
  }
]
export const Ledger = ({ navigation }) => {

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Ledger'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack()
        }}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW)
        }}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {
          navigation.push(ScreenNamesCustomer.WISHLIST)
        }}
      />
    );
  }

  const renderRow = (item, index) => {
    return (
      <View style={{
        height: 80, width: width / 4, borderRightColor: 'rgba(0,0,0,0.1)', borderRightWidth: 1, backgroundColor: 'white', borderBottomColor: 'rgba(0,0,0,0.1)',
        borderBottomWidth: 1,
      }}>
        <Text style={styles.titleTextStyle}>{item.title}</Text>
        {item.title === 'Debits' ?
          <Text style={[styles.amountStyle, { fontWeight: 'bold', color: theme.colors.RED }]}>{item.amount}</Text>
          :
          <>
            {
              item.title === 'Credits' ?
                <Text style={[styles.amountStyle, { color: '#34C759', fontWeight: 'bold' }]}>{item.amount}</Text>
                :
                <Text style={styles.amountStyle}>{item.amount}</Text>
            }
          </>
        }

      </View>
    );
  }

  const renderTransaction = () => {
    return (
      <View style={{ height: 80 }}>
        <FlatList
          style={
            styles.transactionViewStyles
          }
          data={amounts}
          numColumns={4}
          renderItem={({ item, index }) => renderRow(item, index)}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    )
  }

  const renderDescription = () => {
    return (
      <View style={{ marginTop: 8, width: width, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <Text
            style={[styles.textStyle, {
              marginLeft: 17,
              paddingBottom: 10
            }]}
          >
            Date and Description
            </Text>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10
            }]}
          >
            Transaction</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <View>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10
              }]}
            >
              06-06-2020
            </Text>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10,
                marginTop: -10,
                color: "rgba(0,0,0,0.6)"
              }]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10,
              color: '#34C759',
              fontWeight: 'bold',
              marginTop: 1
            }]}
          >
            10,000</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <View>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10
              }]}
            >
              07-06-2020
            </Text>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10,
                marginTop: -10,
                color: "rgba(0,0,0,0.6)"
              }]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10,
              color: '#34C759',
              fontWeight: 'bold',
              marginTop: 1
            }]}
          >
            10,000</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <View>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10
              }]}
            >
              08-06-2020
            </Text>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10,
                marginTop: -10,
                color: "rgba(0,0,0,0.6)"
              }]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10,
              color: theme.colors.RED,
              fontWeight: 'bold',
              marginTop: 1
            }]}
          >
            -10,000</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <View>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10
              }]}
            >
              09-06-2020
            </Text>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10,
                marginTop: -10,
                color: "rgba(0,0,0,0.6)"
              }]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10,
              color: '#34C759',
              fontWeight: 'bold',
              marginTop: 1
            }]}
          >
            10,000</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <View>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10
              }]}
            >
              10-06-2020
            </Text>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10,
                marginTop: -10,
                color: "rgba(0,0,0,0.6)"
              }]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10,
              color: '#34C759',
              fontWeight: 'bold',
              marginTop: 1
            }]}
          >
            10,000</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginVertical: 8, borderBottomWidth: 2, borderBottomColor: 'rgba(0,0,0,0.2)' }}>
          <View>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10
              }]}
            >
              11-06-2020
            </Text>
            <Text
              style={[styles.textStyle, {
                marginLeft: 17,
                paddingBottom: 10,
                marginTop: -10,
                color: "rgba(0,0,0,0.6)"
              }]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, {
              marginRight: 17,
              paddingBottom: 10,
              color: '#34C759',
              fontWeight: 'bold',
              marginTop: 1
            }]}
          >
            10,000</Text>
        </View>
      </View >
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >
      {renderHeader()}
      {renderTransaction()}
      {renderDescription()}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};
