import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './features/loginSlice';
import profileReducer from './features/profileSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
});
