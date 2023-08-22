import React, {useEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {convertDateToDDMMYYYYHHMMSS} from '../helpers';
import {
  getLocations,
  getLocationsStatus,
  locations,
} from '../redux/features/profileSlice';
import {useSelector, useDispatch} from 'react-redux';
import {Divider} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LoadingScreen} from '../components';
import {APIKEY} from '../utils/key';

Mapbox.setAccessToken(APIKEY);

const Locations = () => {
  const dispatch = useDispatch();
  const status = useSelector(getLocationsStatus);
  const locationsData = useSelector(locations);

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const renderItem = item => {
    return (
      <>
        <TouchableOpacity
          style={styles.flatListButton}
          onPress={() => handleOnPressItem(item)}>
          <Text>{convertDateToDDMMYYYYHHMMSS(item.createdAt.toDate())}</Text>
          <MaterialIcons name="chevron-right" size={24} />
        </TouchableOpacity>
        <Divider bold />
      </>
    );
  };

  if (status === 'loading') return <LoadingScreen />;

  return (
    <FlatList
      data={locationsData}
      renderItem={({item}) => renderItem(item)}
      keyExtractor={(item, index) => index}
    />
  );
};

export default Locations;

const styles = StyleSheet.create({
  flatListButton: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
