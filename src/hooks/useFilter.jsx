import { useContext } from 'react';

import FilterContext from '../contexts/FilterContext.jsx';

const useFilter = () => useContext(FilterContext);

export default useFilter;
