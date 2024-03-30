import { configureStore } from '@reduxjs/toolkit';
import quotesReducer from './quotesSlice';

export const store = configureStore({
  reducer: {
    quotes: quotesReducer,
  },
});
