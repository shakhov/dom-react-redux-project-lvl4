import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import fetchData from './fetchData.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  currentChannelId: 1,
  loadingStatus: 'idle',
  loadingError: null,
});

const channelsSlice = createSlice({
  name: 'channels',
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
        state.currentChannelId = payload.currentChannelId;// eslint-disable-line
        channelsAdapter.addMany(state, payload.channels);
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.loadingStatus = 'error'; // eslint-disable-line
        state.loadingError = error.message;// eslint-disable-line
      });
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
