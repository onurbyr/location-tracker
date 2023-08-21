import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {Button} from 'react-native-paper';
import {isLocationEnabled, hasGms} from 'react-native-device-info';
import GeoJSON from 'geojson';

Mapbox.setAccessToken(
  'pk.eyJ1IjoibW90bzEyIiwiYSI6ImNsbGpleW1razF1cnMzZ21naWlyYnVnbWMifQ.y8aUKafZWu9sY9o8aiVXBw',
);

const Home = () => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);
  const [isPermissionsOK, setIsPermissionsOK] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);

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

    //Telefonda googlde servisleri kullanılabilir mi kontrol
    hasGms().then(status => {
      //Kullanabilir ise
      if (status) {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then(data => {
            setIsPermissionsOK(true);
          })
          .catch(err => {
            if (err.code === 'ERR00') {
              ToastAndroid.show(
                'You have to enable gps for using the app',
                ToastAndroid.LONG,
              );
            }
          });
      } else {
        //Değil ise
        //Gps kontrol et
        isLocationEnabled().then(enabled => {
          if (enabled) {
            setIsPermissionsOK(true);
          } else {
            ToastAndroid.show(
              'You have to enable gps for using the app',
              ToastAndroid.LONG,
            );
          }
        });
      }
    });
  };

  return (
    <View style={styles.page}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        rotateEnabled={true}>
        <Mapbox.Camera
          followUserLocation={isTrackingEnabled}
          followZoomLevel={16}
          animationMode="flyTo"
          animationDuration={3000}
        />
        {isPermissionsOK ? (
          <Mapbox.UserLocation
            androidRenderMode="normal"
            minDisplacement={5}
            onUpdate={location => {
              setSavedLocations(current => [...current, location.coords]);
            }}
          />
        ) : null}
        <Mapbox.ShapeSource
          id="locations"
          shape={GeoJSON.parse(savedLocations, {
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
      <Button
        onPress={() => {
          setIsTrackingEnabled(!isTrackingEnabled);
          isTrackingEnabled
            ? Mapbox.locationManager.stop()
            : Mapbox.locationManager.start();
        }}>
        {isTrackingEnabled ? 'Disable' : 'Enable'} Tracking
      </Button>
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
