import { createSlice } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null, 
        accessToken: null
    },
    reducers: {
        setCredentials: (state, action) => {
            const { userId, accessToken } = action.payload;
            state.userId = userId;
            state.accessToken = accessToken;
            console.log('state: ',state.accessToken,state.userId);
        },
        logOut: (state, action) => {
            state.userId = null;
            state.accessToken = null;
        },
    }
})

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice;

export const selectCurrentUser = (state) => state.auth.userId;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;

export const store = configureStore({reducer: authSlice.reducer});