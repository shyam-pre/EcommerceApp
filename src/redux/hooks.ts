import { TypedUseSelectorHook, UseDispatch, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';

// use these hook insted of default ones
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector