import React, { useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Toggleable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const showWhenVisible = { display: isVisible ? '' : 'none' };
  const hideWhenVisible = { display: !isVisible ? '' : 'none' };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility: handleClick,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={handleClick}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={handleClick}>cancle</button>
      </div>
    </>
  );
});

Toggleable.displayName = 'Toggleable';
Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Toggleable;
