import React from 'react';

const Filter = props => {
  return (
    <>
      find countries: <input onChange={props.handleSearch} value={props.name} />
    </>
  );
};

export default Filter;