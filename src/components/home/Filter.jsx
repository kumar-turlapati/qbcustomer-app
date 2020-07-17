import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Text, SectionList, TouchableOpacity } from 'react-native';
import { CheckIcon, UnCheckIcon } from '../../icons/Icons';
import { theme } from '../../theme/theme';
import CommonHeader from '../UI/CommonHeader';
import { Slider } from 'react-native-elements';


const { height, width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container
  },
  rowStyles: {
    marginHorizontal: 16,
    borderBottomColor: theme.colors.BLACK_WITH_OPACITY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  rowTextStyle: {
    fontSize: 17,
    lineHeight: 20,
    color: theme.colors.BLACK,
    marginTop: 6,
  },
  iconHeartStyle: {
    marginTop: 9,
    height: 16,
    width: 16,
    marginLeft: 2
  },
  heartIconViewStyles: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 40,
    width: 40,
  },
  sectionHeaderStyles: {
    fontSize: 12,
    lineHeight: 14,
    marginHorizontal: 16,
    color: theme.colors.BLACK_WITH_OPACITY,
    marginTop: 35
  },
  sliderView: {
    marginHorizontal: 16,
    borderBottomColor: theme.colors.BLACK_WITH_OPACITY,
    borderBottomWidth: 1,
  },
  buttonViewStyles: {
    height: 70,
    position: 'absolute',
    backgroundColor: theme.colors.WHITE,
    width: '100%',
    bottom: 0,
    borderTopColor: theme.colors.BLACK_WITH_OPACITY,
    borderTopWidth: 1,
  },
  buttonStyles: {
    height: 46,
    marginTop: 12,
    borderColor: theme.colors.BLACK,
    borderWidth: 2,
    borderRadius: 3,
    width: width / 2 - 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextStyle: {
    fontWeight: 'bold',
    fontSize: 12,
    lineHeight: 22,
    letterSpacing: - 0.41
  }
})

const filterOptions = [
  {
    "title": "CATEGORY",
    "data": [
      {
        "id": 1,
        "name": 'Suiting',
        "selected": false
      },
      {
        "id": 2,
        "name": 'Shirting',
        "selected": false
      },
      {
        "id": 3,
        "name": 'Shirts',
        "selected": false
      }
    ]
  },
  {
    "title": "BRANDS",
    "data": [
      {
        "id": 1,
        "name": 'RAYMONDS',
        "selected": false
      },
      {
        "id": 2,
        "name": 'LINEN',
        "selected": false
      },
      {
        "id": 3,
        "name": 'MINSITER WHITE',
        "selected": false
      }
    ]
  }
]

export const Filter = ({ navigation }) => {

  const [arrayObjects, setArrayObjects] = useState(filterOptions)
  const [sliderValue, setSliderValue] = useState(0)

  const renderHeader = () => {
    return (
      <CommonHeader
        leftSideText={'FILTER'}
        isTabView={true}
        onPressRightButton={() => { }}
        isProduct={true}
        onPressFilterIcon={() => { }}
        onPressSortIcon={() => {
        }}
      />
    );
  }

  const renderRow = (item, index, title) => {
    return (
      <View style={styles.rowStyles}>
        <TouchableOpacity activeOpacity={1} style={{ width: 30, height: 30, }} onPress={() => {
          console.log('arrayObjects', title)
        }}>
          {item.selected ? <CheckIcon style={styles.iconHeartStyle} /> : <UnCheckIcon style={styles.iconHeartStyle} />}
        </TouchableOpacity>
        <Text style={styles.rowTextStyle}>{item.name}</Text>
      </View>
    );
  }

  const renderListView = () => {
    return (
      <View style={{ height: 400 }}>
        <SectionList
          sections={arrayObjects}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index, section: { title } }) => renderRow(item, index, title)}
          renderSectionHeader={({ section: { title, index } }) => (
            <Text style={[styles.sectionHeaderStyles, { marginTop: index === 0 ? 100 : 35 }]}>{title}</Text>
          )}
        />
      </View>
    )
  }

  const renderSliderView = () => {
    return (
      <View style={styles.sliderView}>
        <Text style={[styles.sectionHeaderStyles, {
          marginHorizontal: 0, marginTop: 15
        }]}>PRICE RANGE</Text>
        <Text style={[styles.rowTextStyle, { marginTop: 11, }]}>₹0 - ₹10,000</Text>
        <Slider
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value)
            console.log('value', value)
          }}
          thumbTintColor={theme.colors.SLIDER_THUMB_COLOR}
          style={{
            marginVertical: 5
          }}
          minimumValue={0}
          maximumValue={10000}
        />
      </View>
    );
  }

  const renderFloatingButtons = () => {
    return (
      <View style={styles.buttonViewStyles}>
        <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
          <TouchableOpacity activeOpacity={1}
            style={styles.buttonStyles}
            onPress={() => {
              navigation.goBack()
            }}>
            <Text style={[styles.buttonTextStyle, { color: theme.colors.BLACK }]}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}
            style={[styles.buttonStyles, { marginLeft: 10, backgroundColor: theme.colors.RED, borderWidth: 0 }]}
            onPress={() => {
              navigation.goBack()
            }}>
            <Text style={[styles.buttonTextStyle, { color: theme.colors.WHITE }]}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderListView()}
      {renderSliderView()}
      {renderFloatingButtons()}
    </View>
  );
};
