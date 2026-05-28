import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
type Project = {
  id: string;
  name: string;
  description: string;
  created_at: string;
};

type ProjectsState = {
  projects: Project[];
  isLoading: boolean;
  isFetched: boolean;
  error: string;
  currentPage: number;
  totalCount: number;
};

const initialState: ProjectsState = {
  projects: [],
  isLoading: false,
  isFetched: false,
  error: '',
  currentPage: 1,
  totalCount: 0,
};

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (
    {
      page,
      limit,
      mode,
    }: { page: number; limit: number; mode: 'desktop' | 'mobile' },
    { rejectWithValue }
  ) => {
    const offset = (page - 1) * limit;
    const res = await fetch(`/api/projects?limit=${limit}&offset=${offset}`);
    if (!res.ok) {
      const error = await res.json();
      return rejectWithValue(error.msg || 'Failed to load projects');
    }

    if (res.status === 401) {
      return rejectWithValue('Unauthorized');
    }

    const data = await res.json();
    return { ...data, currentPage: page, mode };
  }
);

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    (builder.addCase(fetchProjects.pending, (state) => {
      ((state.isLoading = true), (state.error = ''));
    }),
      builder.addCase(fetchProjects.fulfilled, (state, action) => {
        state.isFetched = true;
        state.isLoading = false;
        state.error = '';
        state.totalCount = action.payload.totalCount;
        state.currentPage = action.payload.currentPage;
        if (action.payload.mode === 'mobile') {
          const existingIds = new Set(state.projects.map((p) => p.id));
          const newProjects = action.payload.data.filter(
            (p: Project) => !existingIds.has(p.id)
          );
          state.projects = [...state.projects, ...newProjects];
        } else {
          state.projects = action.payload.data;
        }
      }));
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { setCurrentPage } = projectsSlice.actions;
export default projectsSlice.reducer;
