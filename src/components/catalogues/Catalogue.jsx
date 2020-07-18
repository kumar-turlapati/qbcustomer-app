import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import {theme} from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import {SideArrowIcon} from '../../icons/Icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
    backgroundColor: 'rgba(196,196,196,0.1)',
  },
  rowViewStyle: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // marginHorizontal: 20,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    marginTop: 2,
  },
  titleTextStyle: {
    ...theme.viewStyles.buttonTextStyles,
    color: theme.colors.BLACK,
    marginTop: 24,
  },
  descriptionTextStyle: {
    ...theme.viewStyles.productListTextStyles,
    fontWeight: 'normal',
    color: theme.colors.BLACK_WITH_OPACITY,
    marginBottom: 24,
    marginLeft: 20,
  },
});

const catalogue = [
  {
    id: 1,
    title: 'Catalogue 1',
    description: 'Material used for suits',
    isDefault: true,
  },
  {
    id: 2,
    title: 'Catalogue 2',
    description: 'Material for shirting',
    isDefault: false,
  },
  {
    id: 3,
    title: 'Catalogue 3',
    description: 'Material for Pants',
    isDefault: false,
  },
  {
    id: 4,
    title: 'Catalogue 4',
    description: 'Material for Pants',
    isDefault: false,
  },
];

export const Catalogue = ({navigation}) => {
  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'Catalogue'}
        isTabView={true}
        onPressRightButton={() => {}}
        isProduct={false}
        isWishList={true}
        onPressWishListIcon={() => {}}
      />
    );
  };

  const renderRow = (item, index) => {
    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
          <View style={styles.rowViewStyle}>
            <View>
              <View style={{flexDirection: 'row', marginLeft: 20}}>
                <Text style={styles.titleTextStyle}>{item.title}</Text>
                {item.isDefault && (
                  <Text
                    style={{
                      backgroundColor: theme.colors.RED,
                      borderRadius: 10,
                      ...theme.viewStyles.commonTextStyles,
                      color: 'white',
                      height: 17,
                      overflow: 'hidden',
                      paddingBottom: 22,
                      paddingHorizontal: 6,
                      marginTop: 22,
                      marginLeft: 10,
                    }}>
                    Default
                  </Text>
                )}
              </View>
              <Text style={styles.descriptionTextStyle}>
                {item.description}
              </Text>
            </View>
            <SideArrowIcon
              style={{width: 24, height: 24, marginTop: 33, marginRight: 20}}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 15,
        }}
        data={catalogue}
        renderItem={({item, index}) => renderRow(item, index)}
        keyExtractor={(item) => item.id}
        removeClippedSubviews={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
    </View>
  );
};
