import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

const fetchData = createAsyncThunk(
  'data/fetchData',
  async ({ header }) => {
    const { data } = await axios.get(routes.dataPath(), { headers: header });
    return data;
  },
);

export default fetchData;
