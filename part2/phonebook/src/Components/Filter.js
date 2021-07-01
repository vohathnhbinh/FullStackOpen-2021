import React from 'react';

const Filter = props => {
  return (
    <>
      filter shown with: <input onChange={props.handleFilterChange} value={props.name_filter} />
    </>
  )
}

export default Filter;