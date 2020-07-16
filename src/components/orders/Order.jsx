import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container
  },
})

export const Order = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text> Order </Text>
    </View>
  );
};
