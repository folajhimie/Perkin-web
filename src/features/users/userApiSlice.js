import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: arg.id },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        getUsersById: builder.query({
            query: id => `/users/?userId=${id}`,
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: arg.id },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        }),
        getAddUsersById: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'POST',
                body: {
                    ...initialState,
                    userId: parseInt(initialState.userId),
                    date: new Date().toISOString(),
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        getEditUsersById: builder.mutation({
            query: initialState => ({
                url: `/users/${initialState.id}`,
                method: 'PUT', 
                body: {
                    ...initialState, 
                    userId: parseInt(initialState.userId),
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        getDeleteUsersById: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })
    })
})


export const {
    useGetUsersQuery, 
    useGetUsersByIdQuery,
    useGetAddUsersByIdMutation,
    useEditUsersByIdMutation,
    useGetDeleteUsersByIdMutation, 
} = userApiSlice 


export const selectUsersResult = userApiSlice.endpoints.getUsers.select();


const selectUsersData = createSelector(
    selectUsersResult,
    userResult => userResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)