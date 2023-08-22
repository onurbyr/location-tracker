import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {convertDateToDDMMYYYYHHMMSS} from '../helpers';
import {
  getLocations,
  getLocationsStatus,
  locations,
} from '../redux/features/profileSlice';
import {useSelector, useDispatch} from 'react-redux';

Mapbox.setAccessToken(
  'pk.eyJ1IjoibW90bzEyIiwiYSI6ImNsbGpleW1razF1cnMzZ21naWlyYnVnbWMifQ.y8aUKafZWu9sY9o8aiVXBw',
);

const Locations = () => {
  const dispatch = useDispatch();
  const status = useSelector(getLocationsStatus);
  const locationsData = useSelector(locations);

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={styles.flatItemMainView}
        onPress={() => handleOnPressItem(item)}>
        <Text>{convertDateToDDMMYYYYHHMMSS(item.createdAt.toDate())}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={locationsData}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={(item, index) => index}
        style={styles.flatList}
      />
    </View>
  );
};

export default Locations;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
