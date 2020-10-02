import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {
  BackIcon,
  SearchClose,
  SearchIcon,
  Search_Glyph,
  SmallLogo,
} from '../../icons/Icons';
import {theme} from '../../theme/theme';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.WHITE,
  },
  headerTextStyles: {
    marginTop: 54,
    height: 20,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
  },
  headerStyles: {
    height: 75, //changed
    backgroundColor: theme.colors.WHITE,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginHorizontal: 18,
  },
  iconStyles: {
    height: 40,
    width: 30,
  },
  iconViewStyles: {
    flexDirection: 'row',
    marginHorizontal: 2,
    marginTop: 25, // changed
  },
  leftTextStyle: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.408,
    color: theme.colors.HEADER_LEFT_TITLE_COLOR,
    marginTop: 8,
  },
  iconTouchStyle: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  rightIconViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 45,
    marginRight: 5,
  },
  productIconStyles: {
    width: 30,
    marginRight: 7,
    height: 44,
    marginTop: 49,
  },
  iconWishListStyles: {
    height: 20,
    width: 20,
    marginTop: 3,
    marginLeft: 2,
  },
  searchIconStyles: {
    width: 25,
    height: 25,
    marginTop: 8,
    marginLeft: 10,
  },
  searchViewStyles: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  iconBackStyles: {
    height: 11,
    width: 21,
    marginTop: 5,
    marginLeft: 2,
  },
  textInputStyles: {
    fontSize: 17,
    color: theme.colors.DARK_BLUISH_GRAY,
    marginLeft: 4,
    width: 150,
  },
  inputViewStyle: {
    width: width - 90,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 0.1,
    borderRadius: 4,
    flexDirection: 'row',
    backgroundColor: theme.colors.SEARCH_INPUT_BACKGROUND_COLOR,
  },
  searchGlyphStyles: {
    height: 22,
    width: 24,
    marginTop: 8,
    marginLeft: 4,
  },
  closeStyles: {
    position: 'absolute',
    height: 40,
    width: 40,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonSearchHeader = ({
  leftSideText,
  onPressSearchIcon,
  isSearch,
  onPressBackButton,
  onPressSearchCloseButton,
  onTextChange,
  isTabView,
  onPressLeftButton,
}) => {
  const [value, setValue] = useState('');

  const renderHeader = () => {
    return (
      <View style={styles.headerStyles}>
        {!isSearch ? (
          <>
            {isTabView ? (
              <View style={styles.iconViewStyles}>
                <SmallLogo style={styles.iconStyles} />
                <Text style={styles.leftTextStyle}>{leftSideText}</Text>
              </View>
            ) : (
              <TouchableOpacity
                style={[
                  styles.iconViewStyles,
                  {height: 40, width: 40, marginTop: 54, marginLeft: -6},
                ]}
                activeOpacity={1}
                onPress={() => {
                  onPressLeftButton();
                }}>
                <BackIcon style={styles.iconBackStyles} />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.searchViewStyles}
              activeOpacity={1}
              onPress={() => {
                onPressSearchIcon();
              }}>
              <SearchIcon style={styles.searchIconStyles} />
            </TouchableOpacity>
          </>
        ) : (
          <View
            style={{
              width: '100%',
              height: 40,
              marginTop: 20,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={[
                styles.iconViewStyles,
                {
                  height: 40,
                  width: 40,
                  marginTop: 10,
                  marginLeft: -6,
                },
              ]}
              activeOpacity={1}
              onPress={() => {
                onPressBackButton();
              }}>
              <BackIcon style={styles.iconBackStyles} />
            </TouchableOpacity>
            <View style={styles.inputViewStyle}>
              <Search_Glyph style={styles.searchGlyphStyles} />
              <TextInput
                style={styles.textInputStyles}
                placeholder="Type item name ..."
                autoCorrect={false}
                autoFocus={true}
                value={value}
                onChangeText={(changedText) => {
                  setValue(changedText);
                  onTextChange(changedText);
                }}
              />
              <TouchableOpacity
                style={styles.closeStyles}
                onPress={() => {
                  setValue('');
                  onPressSearchCloseButton();
                }}>
                <SearchClose style={{height: 17, width: 17}} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return <View style={styles.container}>{renderHeader()}</View>;
};
