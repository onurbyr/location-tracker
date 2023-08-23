import React from 'react';
import {StyleSheet, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import GeoJSON from 'geojson';
import {EmptyFlatlist} from '../components';

const LocationDetail = ({route}) => {
  const {selectedLocation} = route.params;
  const isLocation = selectedLocation && selectedLocation[0]?.longitude;

  if (!isLocation) return <EmptyFlatlist />;

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        rotateEnabled={true}>
        <Mapbox.Camera
          zoomLevel={16}
          animationMode="flyTo"
          animationDuration={3000}
          centerCoordinate={[
            selectedLocation[0].longitude,
            selectedLocation[0].latitude,
          ]}
        />
        <Mapbox.ShapeSource
          id="locations"
          shape={GeoJSON.parse(selectedLocation, {
            Point: ['latitude', 'longitude'],
          })}>
          <Mapbox.HeatmapLayer
            id="locations"
            sourceID="locations"
            style={{
              heatmapColor: [
                'interpolate',
                ['linear'],
                ['heatmap-density'],
                0,
                'rgba(236,222,239,0)',
                0.2,
                'rgb(208,209,230)',
                0.4,
                'rgb(166,189,219)',
                0.6,
                'rgb(103,169,207)',
                0.8,
                'rgb(28,144,153)',
              ],
            }}
          />
        </Mapbox.ShapeSource>
      </Mapbox.MapView>
    </View>
  );
};

export default LocationDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
