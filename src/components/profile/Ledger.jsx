import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, Text } from 'react-native';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import { ScreenNamesCustomer } from '../navigationController/ScreenNames';
import { ScrollView } from 'react-native-gesture-handler';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR
  },
  transactionViewStyles: {
    borderTopColor: theme.colors.BORDER_COLOR,
    borderTopWidth: 1,
    borderBottomColor: theme.colors.BORDER_COLOR,
    borderBottomWidth: 1,
    height: 80,
  },
  titleRowTextStyle: {
    fontWeight: '600',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 16,
    marginTop: 15,
  },
  amountStyle: {
    fontWeight: 'normal',
    fontSize: 15,
    lineHeight: 22,
    letterSpacing: -0.41,
    marginLeft: 16,
    marginTop: 8,
  },
  textStyle: {
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: - 0.41
  },
  titleTextStyle: {
    marginLeft: 17,
    paddingBottom: 10
  },
  rowStyle: {
    height: 80, width: width / 4,
    borderRightColor: theme.colors.BORDER_COLOR,
    borderRightWidth: 1,
    backgroundColor: theme.colors.WHITE,
    borderBottomColor: theme.colors.BORDER_COLOR,
    borderBottomWidth: 1,
  },
  descriptionViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.BLACK_WITH_OPACITY_2
  }
})

const amounts = [
  {
    title: 'Opening',
    amount: '10,000',
  },
  {
    title: 'Debits',
    amount: '20,000',
  },
  {
    title: 'Credits',
    amount: '10,000',
  },
  {
    title: 'Closing',
    amount: '10,000',
  },
];
export const Ledger = ({ navigation }) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Ledger'}
        isTabView={false}
        onPressLeftButton={() => {
          navigation.goBack();
        }}
        onPressRightButton={() => {
          navigation.push(ScreenNamesCustomer.CARTVIEW);
        }}
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
      <View style={styles.rowStyle}>
        <Text style={styles.titleRowTextStyle}>{item.title}</Text>
        {item.title === 'Debits' ?
          <Text style={[styles.amountStyle, { fontWeight: 'bold', color: theme.colors.RED }]}>{item.amount}</Text>
          :
          <>
            {
              item.title === 'Credits' ?
                <Text style={[styles.amountStyle, { color: theme.colors.GREEN, fontWeight: 'bold' }]}>{item.amount}</Text>
                :
                <Text style={styles.amountStyle}>{item.amount}</Text>
            }
          </>
        }
      </View>
    );
  };

  const renderTransaction = () => {
    return (
      <View style={{ height: 80 }}>
        <FlatList
          style={styles.transactionViewStyles}
          data={amounts}
          numColumns={4}
          renderItem={({ item, index }) => renderRow(item, index)}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View style={{ marginTop: 8, width: width, backgroundColor: theme.colors.WHITE }}>
        <View style={styles.descriptionViewStyle}>
          <Text
            style={[styles.textStyle, styles.titleTextStyle]}
          >
            Date and Description
          </Text>
          <Text
            style={[
              styles.textStyle,
              {
                marginRight: 17,
                paddingBottom: 10,
              },
            ]}>
            Transaction
          </Text>
        </View>
        <View style={styles.descriptionViewStyle}>
          <View>
            <Text
              style={[styles.textStyle, styles.titleTextStyle]}
            >
              06-06-2020
            </Text>
            <Text
              style={[styles.textStyle, theme.viewStyles.ledgerDescriptionTextStyles]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, theme.viewStyles.ledgerTextStyles]}
          >
            10,000</Text>
        </View>
        <View style={styles.descriptionViewStyle}>
          <View>
            <Text
              style={[styles.textStyle, styles.titleTextStyle]}
            >
              07-06-2020
            </Text>
            <Text
              style={[styles.textStyle, theme.viewStyles.ledgerDescriptionTextStyles]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, theme.viewStyles.ledgerTextStyles]}
          >
            10,000</Text>
        </View>
        <View style={styles.descriptionViewStyle}>
          <View>
            <Text
              style={[styles.textStyle, styles.titleTextStyle]}
            >
              08-06-2020
            </Text>
            <Text
              style={[styles.textStyle, theme.viewStyles.ledgerDescriptionTextStyles]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[
              styles.textStyle,
              {
                marginRight: 17,
                paddingBottom: 10,
                color: theme.colors.RED,
                fontWeight: 'bold',
                marginTop: 1,
              },
            ]}>
            -10,000
          </Text>
        </View>
        <View style={styles.descriptionViewStyle}>
          <View>
            <Text
              style={[styles.textStyle, styles.titleTextStyle]}
            >
              09-06-2020
            </Text>
            <Text
              style={[styles.textStyle, theme.viewStyles.ledgerDescriptionTextStyles]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, theme.viewStyles.ledgerTextStyles]}
          >
            10,000</Text>
        </View>
        <View style={styles.descriptionViewStyle}>
          <View>
            <Text
              style={[styles.textStyle, styles.titleTextStyle]}
            >
              10-06-2020
            </Text>
            <Text
              style={[styles.textStyle, theme.viewStyles.ledgerDescriptionTextStyles]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, theme.viewStyles.ledgerTextStyles]}
          >
            10,000</Text>
        </View>
        <View style={styles.descriptionViewStyle}>
          <View>
            <Text
              style={[styles.textStyle, styles.titleTextStyle]}
            >
              11-06-2020
            </Text>
            <Text
              style={[styles.textStyle, theme.viewStyles.ledgerDescriptionTextStyles]}
            >
              Sales (Dr.) 10000 Ref: 10000980
            </Text>
          </View>
          <Text
            style={[styles.textStyle, theme.viewStyles.ledgerTextStyles]}
          >
            10,000</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {renderTransaction()}
      {renderDescription()}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};
