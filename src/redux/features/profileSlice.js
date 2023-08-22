import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ToastAndroid} from 'react-native';

const initialState = {
  signOutStatus: 'uninitialized',
  getLocationsStatus: 'uninitialized',
  locations: [],
};

export const signOut = createAsyncThunk('profile/signOut', async () => {
  await auth().signOut();
});

export const getLocations = createAsyncThunk(
  'profile/getLocations',
  async (_, {getState}) => {
    const useruid = getState().login.useruid;
    const data = await firestore()
      .collection('users')
      .doc(useruid)
      .collection('savedlocations')
      .get();

    const arr = [];
    data.forEach(documentSnapshot => {
      arr.push(documentSnapshot.data());
    });
    return arr;
  },
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signOut.pending, (state, action) => {
        state.signOutStatus = 'loading';
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.signOutStatus = 'succeeded';
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOutStatus = 'failed';
        ToastAndroid.show(action.error.message, ToastAndroid.SHORT);
      })
      .addCase(getLocations.pending, (state, action) => {
        state.getLocationsStatus = 'loading';
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.getLocationsStatus = 'succeeded';
        state.locations = action.payload;
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.getLocationsStatus = 'failed';
        state.locations = initialState.locations;
        ToastAndroid.show(action.error.message, ToastAndroid.SHORT);
      });
  },
});

export default profileSlice.reducer;

export const signOutStatus = state => state.profile.signOutStatus;
export const getLocationsStatus = state => state.profile.getLocationsStatus;
export const locations = state => state.profile.locations;
