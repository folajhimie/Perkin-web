import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials, setRegistration } from "./authSlice";


export const authApliSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: (code) => ({
               url: 'auth/register',
               method: 'POST',
               body: { ...code },
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled
                    console.log("register..", data)
                    const { token, user, message, status } = data;
                    console.log( "user LISTING", user, message, token, status)
                    dispatch(setRegistration({token, status}))
                    // dispatch(setRegistration(data))
                } catch (error) {
                  console.log(error)  
                }
            }
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials}
            }), 
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled
                    console.log("register..", data)
                    const { token, status } = data;
                    console.log( "user LISTING", status)
                    dispatch(setRegistration({ token}))
                } catch (error) {
                  console.log(error)  
                }
            }
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled
                    console.log("query data..", data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }){
                try {
                    const { data } = await queryFulfilled
                    console.log("refresh data..", data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (error) {
                  console.log(error)  
                }
            }
        }),
    })
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApliSlice