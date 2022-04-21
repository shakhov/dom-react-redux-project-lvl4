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
    sendMessage: (state, { payload }) => {
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
        messagesAdapter.addMany(
          state,
          [...payload.messages,
           {id: 1, username: 'admin', channelId: 1, body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at velit leo. Cras a nunc nunc. Cras at augue sit amet odio tincidunt mattis. Mauris non pretium felis. Phasellus lobortis lorem vitae eros iaculis, posuere cursus magna lacinia. Donec sapien risus, consequat lacinia scelerisque nec, placerat fringilla urna. Duis in suscipit dui. Sed justo felis, ornare sed turpis at, suscipit mattis magna. Mauris congue rutrum imperdiet. Phasellus risus metus, sodales sed pulvinar sed, auctor ut felis. Suspendisse eu est nec lacus imperdiet fringilla. Duis aliquam scelerisque pulvinar. Nunc posuere, est eu convallis aliquet, ex diam placerat lectus, quis hendrerit lorem est at velit. Nunc placerat ut ligula in facilisis. Vestibulum vel quam ultrices, congue lacus sed, faucibus nunc. Quisque ullamcorper nisl tortor, eget tempor nisl lobortis nec. ' },
           {id: 2, username: 'guest', channelId: 1, body: 'test 2' },
           {id: 3, username: 'user1', channelId: 1, body: 'test 3' },
           {id: 4, username: 'admin', channelId: 2, body: 'test test 1' },
           {id: 5, username: 'guest', channelId: 2, body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at velit leo. Cras a nunc nunc. Cras at augue sit amet odio tincidunt mattis. Mauris non pretium felis. Phasellus lobortis lorem vitae eros iaculis, posuere cursus magna lacinia. Donec sapien risus, consequat lacinia scelerisque nec, placerat fringilla urna. Duis in suscipit dui. Sed justo felis, ornare sed turpis at, suscipit mattis magna. Mauris congue rutrum imperdiet. Phasellus risus metus, sodales sed pulvinar sed, auctor ut felis. Suspendisse eu est nec lacus imperdiet fringilla. Duis aliquam scelerisque pulvinar. Nunc posuere, est eu convallis aliquet, ex diam placerat lectus, quis hendrerit lorem est at velit. Nunc placerat ut ligula in facilisis. Vestibulum vel quam ultrices, congue lacus sed, faucibus nunc. Quisque ullamcorper nisl tortor, eget tempor nisl lobortis nec. ' },
           {id: 7, username: 'user2', channelId: 4, body: 'test test 2' },
          ],
        );
      })
      .addCase(fetchData.rejected, (state, { error }) => {
        state.loadingStatus = 'error'; // eslint-disable-line
        state.loadingError = error.message;// eslint-disable-line
      });
  },
});

export const { actions } = messagesSlice;

export const selectLoadingStatus = (state) => state.messages.loadingStatus;
export const selectLoadingError = (state) => state.messages.loadingError;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export default messagesSlice.reducer;
