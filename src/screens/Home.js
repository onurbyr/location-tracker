import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

Mapbox.setAccessToken(
  'pk.eyJ1IjoibW90bzEyIiwiYSI6ImNsbGpleW1razF1cnMzZ21naWlyYnVnbWMifQ.y8aUKafZWu9sY9o8aiVXBw',
);

const Home = () => {
  const [currentCoords, setCurrentCoords] = useState([0, 0]);
  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    const isGranted = await Mapbox.requestAndroidLocationPermissions();

    if (!isGranted) {
      ToastAndroid.show(
        'You cannot use this app without location permission.',
        ToastAndroid.SHORT,
      );
      return;
    }
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        getCurrentLocation();
      })
      .catch(err => {
        console.log(err.message);
        if (err.code === 'ERR00') {
          ToastAndroid.show(
            'You have to enable gps for using the app',
            ToastAndroid.SHORT,
          );
        }
      });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      location =>
        setCurrentCoords([location.coords.longitude, location.coords.latitude]),
      error =>
        ToastAndroid.show(
          `GetCurrentPosition Error ${JSON.stringify(error)}`,
          ToastAndroid.SHORT,
        ),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        rotateEnabled={true}>
        <Mapbox.Camera
          zoomLevel={15}
          centerCoordinate={currentCoords}
          pitch={10}
          animationMode="flyTo"
          animationDuration={3000}
        />
        <Mapbox.PointAnnotation id="marker" coordinate={currentCoords}>
          <View />
        </Mapbox.PointAnnotation>
      </Mapbox.MapView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
