import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

const initialState = {
  loginStatus: 'uninitialized',
  email: '',
  useruid: '',
};

export const signIn = createAsyncThunk(
  'login/signIn',
  async (body, {rejectWithValue}) => {
    try {
      await auth().signInWithEmailAndPassword(body.email, body.password);
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-email':
          ToastAndroid.show(
            'That email address is invalid!',
            ToastAndroid.SHORT,
          );
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          ToastAndroid.show('Email or password wrong!', ToastAndroid.SHORT);
          break;
        default:
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
          break;
      }
      return rejectWithValue(error.message);
    }
  },
);

export const createUserCollection = createAsyncThunk(
  'login/createUserCollection',
  async body => {
    firestore().collection('users').doc(body.uid).set({
      email: body.email,
    });
    return body;
  },
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.loginStatus = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loginStatus = 'succeeded';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loginStatus = 'failed';
      })
      .addCase(createUserCollection.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.useruid = action.payload.uid;
      });
  },
});

export default loginSlice.reducer;

export const loginStatus = state => state.login.loginStatus;
export const savedEmail = state => state.login.email;
export const useruid = state => state.login.useruid;
