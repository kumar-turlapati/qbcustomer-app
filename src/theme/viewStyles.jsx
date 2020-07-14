import { colors } from './colors';
import { fonts, getTextStyle } from './fonts';

export const viewStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.DEFAULT_BACKGROUND_COLOR,
  },
  separator: {
    height: 1,
    backgroundColor: colors.BLACK,
    width: '100%',
    opacity: 0.1,
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
    color: colors.BLACK
  },
  subTextCommonStyles: {
    fontWeight: '100',
    fontSize: 15,
    lineHeight: 26,
    letterSpacing: -0.24,
    color: colors.BLACK
  },
  textInputStyles: {
    height: 52,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 26,
    letterSpacing: - 0.25,
    color: colors.BLACK
  },
  buttonStyle: {
    backgroundColor: colors.RED,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50
  },
  buttonTextStyles: {
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.5,
    color: colors.WHITE
  }
};
