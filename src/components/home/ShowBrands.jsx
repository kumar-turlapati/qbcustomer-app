import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RaymondLinenLogo, RaymondLogo, SiyaramsLogo, Zaccari } from '../../icons/Icons';
import { colors } from '../../theme/colors';
import { theme } from '../../theme/theme';
import CommonSearchHeader from '../UI/CommonSearchHeader';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container,
  },
  brandRowStyles: {
    width: width / 2,
    height: 180,
    borderRightWidth: 0.5,
    borderRightColor: colors.SEPERATOR_COLOR,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SEPERATOR_COLOR,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    backgroundColor: colors.SNOW,
    paddingVertical: 15,
    paddingLeft: 20,
    fontWeight: '600',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: - 0.41
  }
});


const genderData = [
  {
    id: 1,
    title: 'Men',
    image: <RaymondLogo style={{ width: 150, height: 150 }} />
  },
  {
    id: 2,
    title: 'Women',
    image: <RaymondLinenLogo style={{ width: 150, height: 150 }} />
  },
  {
    id: 3,
    title: 'Boy',
    image: <Zaccari style={{ width: 150, height: 150 }} />
  },
  {
    id: 4,
    title: 'Girl',
    image: <SiyaramsLogo style={{ width: 150, height: 150 }} />
  }
]

export const ShowBrands = ({ route, navigation }) => {

  const { title } = route.params

  const [showSearch, setShowSearch] = useState(false);


  const renderHeader = () => {
    return (
      <CommonSearchHeader
        leftSideText={'Shop Name'}
        isSearch={showSearch}
        isTabView={false}
        onPressSearchIcon={() => {
          console.log('onPressSearchIcon')
          setShowSearch(true)
        }}
        onPressSearchCloseButton={() => {
          console.log('onPressSearchCloseButton')
        }}
        onTextChange={(changedText) => {
          console.log('onTextChange', changedText)
        }}
        onPressBackButton={() => {
          console.log('onPressBackButton')
          setShowSearch(false)
        }}
        onPressLeftButton={() => {
          navigation.goBack()
        }}
      />
    );
  };

  const renderListView = () => {
    return (
      <FlatList
        style={{
          flex: 1,
          marginTop: 8,
          marginBottom: 0,
        }}
        data={genderData}
        numColumns={2}
        renderItem={({ item }) => renderRow(item)}
        keyExtractor={(item) => item.title}
        removeClippedSubviews={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderRow = (item) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.brandRowStyles}
        onPress={() => {
        }}
      >
        {item.image}
      </TouchableOpacity>
    )
  }


  return (
    < View style={styles.container} >
      { renderHeader()}
      <Text style={styles.titleStyle}>{title} Collection</Text>
      { renderListView()}
    </View >
  )

};
