import { createSlice } from '@reduxjs/toolkit';
import {
    addProgress,
    getPaginateProgress,
    changeStatusProgress,
    homeLoadMore,
    getProgress
} from '../actions/progress';


export const progressSlice = createSlice({
    name:'progress',
    initialState:{
        homeSort:{
            sortby:"_id",
            order:"desc",
            limit:4,
            skip:0
        },
        loading:false,
        progress:[],
        current:null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        // ADD PROGRESS
        .addCase(addProgress.pending,(state)=>{ state.loading = true })
        .addCase(addProgress.fulfilled,(state,action)=>{ 
            state.loading = false;
            state.lastAdded = action.payload 
        })
        .addCase(addProgress.rejected,(state)=>{ state.loading = false })
        // GET PAGINATE PROGRESS
        .addCase(getPaginateProgress.pending,(state)=>{ state.loading = true })
        .addCase(getPaginateProgress.fulfilled,(state,action)=>{ 
            state.loading = false;
            state.adminProgress = action.payload 
        })
        .addCase(getPaginateProgress.rejected,(state)=>{ state.loading = false })
        // CHANGE STATUS PROGRESS
        .addCase(changeStatusProgress.fulfilled,(state,action)=>{ 
            state.adminProgress.docs = action.payload 
        })
        // HOME LOAD MORE
        .addCase(homeLoadMore.fulfilled,(state,action)=>{ 
            state.homeSort.skip = action.payload.sort.skip
            state.progress = action.payload.newState
        })
        // GET PROGRESS
        .addCase(getProgress.pending,(state)=>{ state.loading = true })
        .addCase(getProgress.fulfilled,(state,action)=>{ 
            state.loading = false;
            state.current = action.payload 
        })
        .addCase(getProgress.rejected,(state)=>{ state.loading = false })
    }
})


export default progressSlice.reducer;