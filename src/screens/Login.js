import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../constants';
import {TextInput, Button} from 'react-native-paper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView>
      <View style={styles.topCircle}></View>
      <View
        style={[
          styles.content,
          //Margin top circle'in yuksekliğine göre belirlendi
          {marginTop: styles.topCircle.height + styles.topCircle.top + 30},
        ]}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.loginText}>Login</Text>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          mode="outlined"
          style={styles.emailInput}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          mode="outlined"
          style={styles.passwordInput}
        />
        <Button
          icon="login"
          mode="contained"
          onPress={() => console.log('Pressed')}
          style={styles.loginButton}>
          Login
        </Button>
        <TouchableOpacity style={styles.forgetPasswordContainer}>
          <Text>Forget Password?</Text>
        </TouchableOpacity>
        <Text style={styles.haveAccountText}>
          Don't have an account?
          <Text style={styles.createAccountText}> Create Account</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  topCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    position: 'absolute',
    left: -100,
    top: -100,
    backgroundColor: colors.yellow,
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    color: 'black',
    fontWeight: '500',
  },
  loginText: {
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
    marginTop: 10,
    letterSpacing: 1,
  },
  emailInput: {
    marginTop: 30,
  },
  passwordInput: {
    marginTop: 10,
  },
  loginButton: {
    marginTop: 30,
    marginHorizontal: 50,
  },
  forgetPasswordContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  haveAccountText: {
    alignSelf: 'center',
    marginTop: 30,
  },
  createAccountText: {
    color: colors.yellow,
  },
});
