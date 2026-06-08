import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import uiReducer from './slices/uiSlice';
import projectsReducer from './slices/projectsSlice';
import epicReducer from './slices/epicSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    projects: projectsReducer,
    epics: epicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
