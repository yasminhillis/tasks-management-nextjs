import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type EpicsState = {
    epics: [],
    loading: 'idle' | 'loading' | 'succeeded' | 'failed', 
    isFetched: boolean,
    error: string, 
    currentPage: number, 
    totalCount: number
}

const initialState: EpicsState = {
    epics: [],
    loading: 'idle', 
    isFetched: false,
    error: '', 
    currentPage: 1, 
    totalCount: 0
}

export const fetchEpics = createAsyncThunk('epics/fetchEpics', async(projectId: string, {rejectWithValue}) => {
    const res = await fetch(`/api/epics?projectId=${projectId}`); 
    if (!res.ok) {
        const error = await res.json()
        console.log(error, 'error');
        
        return rejectWithValue(error.msg || 'Failed to fetch epics') 
    }
    const epics = await res.json(); 
    console.log('status:', res.status);
    console.log(epics, 'epics from think');
    
    return epics
})

 export const epicSlice = createSlice({
    name: 'epics', 
    initialState, 
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEpics.pending, (state) => {
            state.error = ''; 
            state.loading = 'loading'; 
        })
        builder.addCase(fetchEpics.fulfilled, (state, action) => {
            state.error = ''; 
            state.isFetched = true; 
            state.loading = 'succeeded'; 
            state.epics = action.payload.data
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