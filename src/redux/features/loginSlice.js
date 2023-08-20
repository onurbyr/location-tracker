import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

const initialState = {
  status: 'uninitialized',
  email: '',
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

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    saveEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const {saveEmail} = loginSlice.actions;

export default loginSlice.reducer;

export const loginStatus = state => state.login.status;
export const savedEmail = state => state.login.email;
