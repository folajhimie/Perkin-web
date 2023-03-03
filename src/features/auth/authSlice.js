import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        setRegistration: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
        },
        logOut: (state, action) => {
            state.token = null
        }
    }
})


export const { setCredentials, logOut, setRegistration } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token