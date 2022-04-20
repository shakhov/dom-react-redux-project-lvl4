import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  loadingStatus: 'idle',
  loadingError: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingStatus = 'loading';// eslint-disable-line
        state.loadingError = null; // eslint-disable-line
      })
      .addCase(fetchData.fulfilled, (state, { payload }) => {
        state.loadingStatus = 'success'; // eslint-disable-line
        messagesAdapter.addMany(state, payload.messages);
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.loadingStatus = 'error'; // eslint-disable-line
        state.loadingError = error.message;// eslint-disable-line
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
