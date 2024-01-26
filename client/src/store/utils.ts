import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState, AppDispatch } from './store';
import { AxiosInstance } from 'axios';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState,
  dispatch: AppDispatch,
  extra: AxiosInstance,
  rejectValue: string,
}>();
