import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Epic } from '@/lib/types/index';

type EpicsState = {
  epics: Epic[];
  loading: 'idle' | 'loading' | 'succeeded' | 'failed';
  isFetched: boolean;
  error: string;
  currentPage: number;
  totalCount: number;
  projectId: string;
};

const initialState: EpicsState = {
  epics: [],
  loading: 'idle',
  isFetched: false,
  error: '',
  currentPage: 1,
  totalCount: 0,
  projectId: '',
};

export const fetchEpics = createAsyncThunk(
  'epics/fetchEpics',
  async (
    {
      projectId,
      page,
      limit,
      mode,
    }: {
      projectId: string;
      page: number;
      limit: number;
      mode: 'desktop' | 'mobile';
    },
    { rejectWithValue }
  ) => {
    const offset = (page - 1) * limit;
    const res = await fetch(
      `/api/epics?projectId=${projectId}&limit=${limit}&offset=${offset}`
    );
    if (!res.ok) {
      const error = await res.json();

      return rejectWithValue(error.msg || 'Failed to fetch epics');
    }
    const epics = await res.json();

    return { ...epics, currentPage: page, projectId, mode };
  }
);

export const epicSlice = createSlice({
  name: 'epics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEpics.pending, (state, action) => {
      state.error = '';
      if (action.meta.arg.mode !== 'mobile') {
        state.loading = 'loading';
      }
      // state.loading = 'loading';
    });
    builder.addCase(fetchEpics.fulfilled, (state, action) => {

      if (state.projectId !== action.payload.projectId) {
        state.currentPage = 1;
      }
      state.projectId = action.payload.projectId;
      state.error = '';
      state.isFetched = true;
      state.loading = 'succeeded';

      state.totalCount = action.payload.totalCount;
      state.currentPage = action.payload.currentPage;

      if (action.payload.mode === 'mobile') {
        const existingIds = new Set(state.epics.map((epic: Epic) => epic.id));
        const newEpics = action.payload.data.filter(
          (epic: Epic) => !existingIds.has(epic.id)
        );
        state.epics = [...state.epics, ...newEpics];
      } else {
        state.epics = action.payload.data;
      }
    });

    builder.addCase(fetchEpics.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload as string;
    });
  },
});

export default epicSlice.reducer;
