import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button, Avatar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {savedEmail} from '../redux/features/loginSlice';
import {signOut, signOutStatus} from '../redux/features/profileSlice';
import {colors} from '../constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Profile = ({navigation}) => {
  const email = useSelector(savedEmail);
  const status = useSelector(signOutStatus);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Avatar.Text
          size={96}
          label={email.charAt(0).toUpperCase()}
          style={styles.avatar}
          color="white"
        />
        <Text style={styles.emailText}>{email}</Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.navigate('Locations')}>
          <Text style={styles.menuButtonText}>Saved Locations</Text>
          <MaterialIcons name="chevron-right" color="white" size={24} />
        </TouchableOpacity>
        <Button
          icon="logout"
          mode="contained"
          onPress={() => dispatch(signOut())}
          loading={status === 'loading'}
          disabled={status === 'loading'}>
          Logout
        </Button>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    backgroundColor: colors.yellow,
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    backgroundColor: '#0BC9E3',
  },
  emailText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  menuButton: {
    backgroundColor: colors.yellow,
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
