import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button, Avatar} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {savedEmail} from '../redux/features/loginSlice';
import {signOut, logoutStatus} from '../redux/features/profileSlice';
import {colors} from '../constants';

const Profile = () => {
  const email = useSelector(savedEmail);
  const status = useSelector(logoutStatus);
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
      <Button
        icon="logout"
        mode="contained"
        onPress={() => dispatch(signOut())}
        style={styles.logoutButton}
        loading={status === 'loading'}
        disabled={status === 'loading'}>
        Logout
      </Button>
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
  logoutButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});
