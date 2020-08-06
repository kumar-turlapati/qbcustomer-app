import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {theme} from '../theme/theme';

export const NoDataMessage = (props) => {
  const {message} = props;

  return (
    <View style={[styles.container, styles.horizontal]}>
      {message && message.length > 0 ? (
        <Text style={{color: theme.colors.RED, fontWeight: 'bold'}}>
          {message}
        </Text>
      ) : (
        <Text style={{color: theme.colors.RED, fontWeight: 'bold'}}>
          No Data found :(
        </Text>
      )}
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
