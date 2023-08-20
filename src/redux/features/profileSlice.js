import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

const initialState = {
  status: 'uninitialized',
};

export const signOut = createAsyncThunk('profile/signOut', async () => {
  await auth().signOut();
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signOut.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(signOut.rejected, (state, action) => {
        state.status = 'failed';
        ToastAndroid.show(action.error.message, ToastAndroid.SHORT);
      });
  },
});

export default profileSlice.reducer;

export const logoutStatus = state => state.profile.status;
