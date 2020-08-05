import React from 'react';
import {ActivityIndicator, StyleSheet, View, Text} from 'react-native';
import {theme} from '../theme/theme';

export const NoDataMessage = (props) => {
  const {message} = props;

  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text style={{color: theme.colors.RED, fontWeight: 'bold'}}>
        {message && message.length > 0 ? message : 'No Data found :('}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
