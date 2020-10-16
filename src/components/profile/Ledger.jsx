import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Dimensions, Text} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {ScreenNamesCustomer} from '../navigationController/ScreenNames';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import {restEndPoints, requestHeaders} from '../../../qbconfig';
import {Loader} from '../Loader';
import {NoDataMessage} from '../NoDataMessage';
import useAsyncStorage from '../customHooks/async';
import {useIsFocused} from '@react-navigation/native';
import _sumBy from 'lodash/sumBy';
import _startCase from 'lodash/startCase';
import {checkTokenExpired} from '../../utils/general';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: theme.colors.BACKGROUND_COLOR,
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
    letterSpacing: -0.41,
  },
  titleTextStyle: {
    marginLeft: 17,
    paddingBottom: 10,
  },
  rowStyle: {
    height: 80,
    width: width / 4,
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
    borderBottomColor: theme.colors.BLACK_WITH_OPACITY_2,
  },
  noDataMessage: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export const Ledger = ({navigation}) => {
  const [ledgerLoading, setLedgerLoading] = useState(true);
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [openings, setOpenings] = useState(0);
  const [sales, setSales] = useState(0);
  const [credits, setCredits] = useState(0);
  const [receipts, setReceipts] = useState(0);
  const {storageItem: uuid} = useAsyncStorage('@uuid');
  const {CUSTOMER_LEDGER} = restEndPoints;
  const isFocused = useIsFocused();

  const amounts = [
    {
      title: 'Opening',
      amount: openings,
    },
    {
      title: 'Debits',
      amount: sales,
    },
    {
      title: 'Credits',
      amount: credits,
    },
    {
      title: 'Closing',
      amount: parseFloat(
        parseFloat(openings) +
          parseFloat(sales) -
          (parseFloat(credits) + parseFloat(receipts)),
      ).toFixed(2),
    },
  ];

  // console.log(transactions, 'transactions...........', uuid);
  // console.log(openings, '=====', sales, '=====', credits, '=====', receipts);

  // console.log(errorMessage, 'error message is.....');

  useEffect(() => {
    const getLedger = async () => {
      setLedgerLoading(true);
      try {
        await axios
          .get(CUSTOMER_LEDGER.URL(uuid), {headers: requestHeaders})
          .then((apiResponse) => {
            setLedgerLoading(false);
            // console.log(apiResponse, '----------------------');
            if (apiResponse.data.status === 'success') {
              setTransactions(apiResponse.data.response);
              // calculate balances.
              const openings = _sumBy(
                apiResponse.data.response,
                (tranDetails) =>
                  tranDetails.transType === 'opening'
                    ? parseFloat(tranDetails.transValue)
                    : 0,
              );
              const sales = _sumBy(apiResponse.data.response, (tranDetails) =>
                tranDetails.transType === 'sales'
                  ? parseFloat(tranDetails.transValue)
                  : 0,
              );
              const cnotes = _sumBy(apiResponse.data.response, (tranDetails) =>
                tranDetails.transType === 'cnote'
                  ? parseFloat(tranDetails.transValue)
                  : 0,
              );
              const receipts = _sumBy(
                apiResponse.data.response,
                (tranDetails) =>
                  tranDetails.transType === 'receipt'
                    ? parseFloat(tranDetails.transValue)
                    : 0,
              );
              setOpenings(openings.toFixed(2));
              setSales(sales.toFixed(2));
              setCredits(cnotes.toFixed(2));
              setReceipts(receipts.toFixed(2));
              // console.log(
              //   apiResponse.data.response,
              //   openings,
              //   sales,
              //   cnotes,
              //   receipts,
              //   '=================',
              // );
            } else {
              setShowNoDataMessage(true);
            }
          })
          .catch((error) => {
            // console.log(error.response.data, '@@@@@@@@@@@@@@@@@@@@@@@@@@');
            if (checkTokenExpired(error))
              navigation.push(ScreenNamesCustomer.LOGIN);
            const errorMessage = error.response.data.errortext;
            setLedgerLoading(false);
            setShowNoDataMessage(true);
            setErrorMessage(errorMessage);
            // setErrorMessage(error.response.data.errortext);
            // setErrorText(error.response.data.errortext);
            // setShowAlert(true);
          });
      } catch {
        // console.log(error, '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        setLedgerLoading(false);
        setShowNoDataMessage(true);
        setErrorMessage('Network error. Please try again :(');
      }
    };
    if (isFocused && uuid && uuid.length > 0) getLedger();
  }, [isFocused, uuid]);

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

  const renderRow = (item) => {
    return (
      <View style={styles.rowStyle}>
        <Text style={styles.titleRowTextStyle}>{item.title}</Text>
        {item.title === 'Debits' ? (
          <Text
            style={[
              styles.amountStyle,
              {fontWeight: 'bold', color: theme.colors.GREEN},
            ]}>
            ₹{item.amount}
          </Text>
        ) : (
          <>
            {item.title === 'Credits' ? (
              <Text
                style={[
                  styles.amountStyle,
                  {color: theme.colors.RED, fontWeight: 'bold'},
                ]}>
                ₹{item.amount}
              </Text>
            ) : (
              <Text style={styles.amountStyle}>₹{item.amount}</Text>
            )}
          </>
        )}
      </View>
    );
  };

  const renderTransaction = () => {
    return (
      <View style={{height: 80}}>
        <FlatList
          style={styles.transactionViewStyles}
          data={amounts}
          numColumns={4}
          renderItem={({item, index}) => renderRow(item, index)}
          keyExtractor={(item) => item.transValue}
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderDescription = () => {
    return (
      <View
        style={{
          marginTop: 8,
          width: width,
          backgroundColor: theme.colors.WHITE,
          height: height,
        }}>
        <View style={styles.descriptionViewStyle}>
          <Text style={[styles.textStyle, styles.titleTextStyle]}>
            Date, Voc. No. &amp; Description
          </Text>
          <Text
            style={[
              styles.textStyle,
              {
                marginRight: 17,
                paddingBottom: 10,
              },
            ]}>
            Amount
          </Text>
        </View>
        {transactions.map((transactionDetails) => {
          const transDate = transactionDetails.transDate;
          const transType = transactionDetails.transType;
          const transAmount = parseFloat(transactionDetails.transValue);
          const transVocNo = transactionDetails.transNo;
          // const narration = transactionDetails.narration;
          const bankRefNo = transactionDetails.refNo;
          const transDateString = transDate.split('-').reverse().join('/');
          const drOrCr =
            transType === 'cnote' || transType === 'receipt' ? 'Cr.' : 'Dr.';

          return (
            <View style={styles.descriptionViewStyle} key={transVocNo}>
              <View>
                <Text style={[styles.textStyle, styles.titleTextStyle]}>
                  {transDateString}
                </Text>
                <Text
                  style={[
                    styles.textStyle,
                    theme.viewStyles.ledgerDescriptionTextStyles,
                  ]}>
                  {_startCase(transType)} ({drOrCr}) Voc.No. {transVocNo}
                  {`${bankRefNo.length > 0 ? `, Ref.No.${bankRefNo}` : ''}`}
                </Text>
              </View>
              <Text
                style={[
                  styles.textStyle,
                  drOrCr === 'Dr.'
                    ? theme.viewStyles.ledgerTextStyles
                    : {
                        marginRight: 17,
                        paddingBottom: 10,
                        color: theme.colors.RED,
                        fontWeight: 'bold',
                        marginTop: 1,
                      },
                ]}>
                {drOrCr === 'Cr.'
                  ? `(-) ₹${transAmount.toFixed(2)}`
                  : `₹${transAmount.toFixed(2)}`}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return ledgerLoading ? (
    <Loader />
  ) : (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {showNoDataMessage ? (
        <View style={{marginTop: height / 2 - 100}}>
          <NoDataMessage message={errorMessage} />
        </View>
      ) : (
        <>
          {renderTransaction()}
          {renderDescription()}
          <View style={{height: 20}} />
        </>
      )}
    </ScrollView>
  );
};
