import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, RootDispatch } from './index';

export const useAppDispatch = () => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
