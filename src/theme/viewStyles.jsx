import { colors } from './colors';

export const viewStyles = {
  flex: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND_COLOR,
  },
  separator: {
    backgroundColor: colors.BLACK,
    opacity: 0.2,
    marginHorizontal: 18,
    height: 1,
    marginTop: 15
  },
  shadow: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  borderRadius: {
    borderRadius: 5,
    overflow: 'hidden',
  },
  disabled: {
    opacity: 0.5,
  },
  textCommonStyles: {
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 26,
    letterSpacing: -0.24,
    color: colors.BLACK,
  },
  subTextCommonStyles: {
    fontWeight: '100',
    fontSize: 15,
    lineHeight: 26,
    letterSpacing: -0.24,
    color: colors.BLACK,
  },
  textInputStyles: {
    height: 52,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    fontWeight: 'bold',
    fontSize: 17,
    // lineHeight: 26,
    letterSpacing: -0.25,
    color: colors.BLACK,
  },
  buttonStyle: {
    backgroundColor: colors.RED,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonTextStyles: {
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: colors.WHITE,
  },
  tabBarStyles: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 12,
    textAlign: 'center',
    letterSpacing: -0.24,
    marginBottom: 8,
    marginLeft: 2,
  },
  productListTextStyles: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: colors.PRODUCT_LIST_SPECIAL_TEXT_COLOR,
  },
  titleTextStyle: {
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: colors.BLACK,
  },
  inStockTextStyle: {
    backgroundColor: colors.IN_STOCK_BACKGROUND_COLOR,
    borderRadius: 10,
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: colors.WHITE,
    overflow: 'hidden',
    paddingHorizontal: 8,
    marginLeft: 10,
  },
  priceStyles: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: -0.5,
    color: colors.BLACK,
  },
  commonTextStyles: {
    fontWeight: 'bold',
    fontSize: 12,
    color: colors.BLACK,
    lineHeight: 22,
    letterSpacing: - 0.41
  },
  underLineStyle: {
    color: colors.RED,
    textDecorationLine: 'underline'
  },
  ledgerTextStyles: {
    marginRight: 17,
    paddingBottom: 10,
    color: colors.GREEN,
    fontWeight: 'bold',
    marginTop: 1
  },
  ledgerDescriptionTextStyles: {
    marginLeft: 17,
    paddingBottom: 10,
    marginTop: -10,
    color: colors.BLACK_WITH_OPACITY_6
  },
  tabBarOptionStyle: {
    borderTopColor: 'transparent',
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    borderTopWidth: 0,
    top: 1,
    height: 57,
  },
  tabBarIconStyles: {
    marginTop: 8,
    marginBottom: -2,
  },
  rowTopSeperatorStyle: {
    backgroundColor: colors.LIGHT_GRAY,
    opacity: 0.1,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  versionTextStyle: {
    color: colors.RED,
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: - 0.41,
    textAlign: 'center'
  }
};
