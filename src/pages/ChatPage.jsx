import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useAuth from '../hooks/useAuth.jsx';
import fetchData from '../slices/fetchData.js';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';

function ChatPage() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  useEffect(() => {
    const { token } = auth.userId;
    const header = { Authorization: `Bearer ${token}` };
    dispatch(fetchData({ header }));
  }, []);

  return (
      <div>
      <h4>Channels:</h4>
      <ul>
        {channels.map(({ id, name }) => <li key={id}>#{name}</li>)}
      </ul>
    </div>
  );
}

export default ChatPage;
