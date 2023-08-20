import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {savedEmail} from '../redux/features/loginSlice';

const Profile = () => {
  const email = useSelector(savedEmail);
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View>
      <Text>{email}</Text>
      <Button icon="login" mode="contained" onPress={logout}>
        Logout
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
