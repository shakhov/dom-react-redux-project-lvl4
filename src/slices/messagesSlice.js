import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import fetchData from './fetchData.js';

import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  loadingStatus: 'idle',
  loadingError: null,
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, { payload }) => {
      messagesAdapter.addOne(state, payload);
    },
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
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { ids, entities } = state;
        const removeIds = ids.filter((messageId) => entities[messageId].channelId === payload);
        messagesAdapter.removeMany(state, removeIds);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export const selectLoadingStatus = (state) => state.messages.loadingStatus;
export const selectLoadingError = (state) => state.messages.loadingError;

export const selectMessagesByChannelId = (id) => (
  createSelector(
    [
      selectors.selectAll,
    ],
    (messages) => messages.filter(({ channelId }) => channelId === id),
  )
);

export default messagesSlice.reducer;
