import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {Button} from 'react-native-paper';
import {isLocationEnabled, hasGms} from 'react-native-device-info';
import GeoJSON from 'geojson';
import firestore from '@react-native-firebase/firestore';
import {APIKEY} from '../utils/key';
import {useruid} from '../redux/features/loginSlice';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';

Mapbox.setWellKnownTileServer('Mapbox');
Mapbox.setAccessToken(APIKEY);

const Home = () => {
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(false);
  const [isPermissionsOK, setIsPermissionsOK] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);

  const currentLocation = useRef({});
  const currentDocumentId = useRef('');
  const uid = useSelector(useruid);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isTrackingEnabled) {
        addLocation(currentDocumentId.current, currentLocation.current);
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [isTrackingEnabled]);

  const addLocation = (documentId, location) => {
    firestore()
      .collection('users')
      .doc(uid)
      .collection('savedlocations')
      .doc(documentId)
      .update({
        locations: firestore.FieldValue.arrayUnion({
          ...location,
          createdAt: firestore.Timestamp.now(),
        }),
      })
      .then(() => {
        setSavedLocations(current => [...current, location]);
      });
  };

  const createNewDoc = () => {
    const newDocId = uuid.v4();
    firestore()
      .collection('users')
      .doc(uid)
      .collection('savedlocations')
      .doc(newDocId)
      .set({
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setIsTrackingEnabled(true);
        currentDocumentId.current = newDocId;
      });
  };

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
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        zoomEnabled={true}
        rotateEnabled={true}>
        <Mapbox.Camera
          followUserLocation={true}
          followZoomLevel={16}
          animationMode="flyTo"
          animationDuration={3000}
        />
        {isPermissionsOK ? (
          <Mapbox.UserLocation
            androidRenderMode="normal"
            minDisplacement={5}
            onUpdate={location => {
              currentLocation.current = location.coords;
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
        disabled={!isPermissionsOK}
        onPress={() => {
          if (isTrackingEnabled) {
            setIsTrackingEnabled(false);
          } else {
            createNewDoc();
            setSavedLocations([]);
          }
        }}>
        {isTrackingEnabled ? 'Disable' : 'Enable'} Tracking
      </Button>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
