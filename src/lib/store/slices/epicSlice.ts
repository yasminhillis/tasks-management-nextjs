import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Epic } from '@/lib/types/index';


type EpicsState = {
    epics: Epic[],
    loading: 'idle' | 'loading' | 'succeeded' | 'failed', 
    isFetched: boolean,
    error: string, 
    currentPage: number,
    pageSize: number, 
    totalCount: number,
    projectId: string
}

const initialState: EpicsState = {
    epics: [],
    loading: 'idle', 
    isFetched: false,
    error: '', 
    currentPage: 1, 
    pageSize: 6,
    totalCount: 0,
    projectId: ''
}

export const fetchEpics = createAsyncThunk('epics/fetchEpics', async({projectId, page, limit, mode}: {projectId: string, page: number, limit: number, mode: 'desktop' | 'mobile'}, {rejectWithValue}) => {
    const offset = (page - 1) * limit;
    const res = await fetch(`/api/epics?projectId=${projectId}&limit=${limit}&offset=${offset}`); 
    if (!res.ok) {
        const error = await res.json()
        console.log(error, 'error');
        
        return rejectWithValue(error.msg || 'Failed to fetch epics') 
    }
    const epics = await res.json(); 
    console.log('status:', res.status);
    console.log(epics, 'epics from think');
    
    return {...epics, currentPage: page, projectId, mode}
})

 export const epicSlice = createSlice({
    name: 'epics', 
    initialState, 
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEpics.pending, (state, action) => {
            state.error = ''; 
            if (action.meta.arg.mode !== 'mobile') {
                state.loading = 'loading';
            }
            // state.loading = 'loading'; 
        })
        builder.addCase(fetchEpics.fulfilled, (state, action) => {
            console.log(action.payload, 'action.payload');
            
            if (state.projectId !== action.payload.projectId) {
                state.currentPage = 1
            }
            state.projectId = action.payload.projectId;
            state.error = ''; 
            state.isFetched = true; 
            state.loading = 'succeeded'; 
            
            state.totalCount = action.payload.totalCount;
            state.currentPage = action.payload.currentPage;
            console.log(action.payload.mode, 'mode');
            
            if (action.payload.mode === 'mobile') {
                const existingIds = new Set(state.epics.map((epic: Epic) => epic.id));
                console.log(existingIds, 'existingIds');
                const newEpics = action.payload.data.filter((epic: Epic) => !existingIds.has(epic.id));
                state.epics = [...state.epics, ...newEpics]
                
            } else {
                state.epics = action.payload.data;
            }
        })

        builder.addCase(fetchEpics.rejected, (state, action) => {
            // console.log(action, 'action');
            // console.log(action.payload, 'action');
            state.loading = 'failed';
            state.error = action.payload as string
        })
    }
 })

 export default epicSlice.reducer;