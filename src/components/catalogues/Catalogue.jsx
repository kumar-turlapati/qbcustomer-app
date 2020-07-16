import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../../theme/theme';

const styles = StyleSheet.create({
  container: {
    ...theme.viewStyles.container
  },
})

export const Catalogue = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text> Catalogue </Text>
    </View>
  );
};
