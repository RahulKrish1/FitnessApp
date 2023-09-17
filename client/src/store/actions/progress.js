import { createAsyncThunk } from '@reduxjs/toolkit'
import { errorGlobal, successGlobal } from '../reducers/notifications';
import { getAuthHeader } from '../../utils/tools';
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addProgress = createAsyncThunk(
    'progress/addProgress',
    async(progress,{ dispatch })=>{
        try{
            const request = await axios.post(`/api/progress/`,progress,getAuthHeader());
            dispatch(successGlobal('Post created !!'))
            return request.data;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getAdminProgress = createAsyncThunk(
    'progress/getAdminProgress',
    async(_id,{ dispatch })=>{
        try{
            const request = await axios.get(`/api/progress/progress/${_id}`,getAuthHeader());
            return request.data;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const updateProgress = createAsyncThunk(
    'progress/updateProgress',
    async({values,progressId},{ dispatch })=>{
        try{
            await axios.patch(`/api/progress/progress/${progressId}`,values,getAuthHeader());
            dispatch(successGlobal('Progress updated !!'))
            return true;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getPaginateProgress = createAsyncThunk(
    'progress/getPaginateProgress',
    async({page=1,limit=5,keywords=''},{ dispatch })=>{
        try{
            const request = await axios.post(`/api/progress/admin/paginate`,{
                page,
                limit,
                keywords
            },getAuthHeader())
            return request.data;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const changeStatusProgress = createAsyncThunk(
    'progress/changeStatusProgress',
    async({newStatus,_id},{ dispatch,getState })=>{
        try{
            const request = await axios.patch(`/api/progress/progress/${_id}`,{
                status:newStatus
            },getAuthHeader());

            let progress = request.data;
            /// previous state
            let state = getState().progress.adminProgress.docs;
            ///  find the position
            let position = state.findIndex( progress => progress._id === _id);
            // we cannot mutate 'let state', we create copy
            const newState = [...state];
            newState[position] = progress;

            dispatch(successGlobal('Status changed !!'))
            return newState;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const removeProgress = createAsyncThunk(
    'progress/removeProgress',
    async(_id,{ dispatch, getState })=>{
        try{
            await axios.delete(`/api/progress/progress/${_id}`,getAuthHeader())
            dispatch(successGlobal('Progress removed'));

            let page = getState().progress.adminProgress.page;
            dispatch(getPaginateProgress({page}))
            return true;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const homeLoadMore = createAsyncThunk(
    'progress/homeLoadMore',
    async(sort,{ dispatch, getState })=>{
        try{
            const progress = await axios.post(`/api/progress/all`,sort);
            const state = getState().progress.progress;
            
            const prevState = [...state];
            const newState = [...prevState,...progress.data]

            return { newState,sort }
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)

export const getProgress = createAsyncThunk(
    'progress/getProgress',
    async(id,{ dispatch })=>{
        try{
            const request = await axios.get(`/api/progress/users/progress/${id}`)
            return request.data
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)