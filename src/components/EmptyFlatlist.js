import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export const EmptyFlatlist = () => {
  return (
    <View style={styles.noData}>
      <Text>No Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
