import React from 'react';

import FilterContext from '../contexts/FilterContext.jsx';

function FilterProvider({ filter, children }) {
  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
