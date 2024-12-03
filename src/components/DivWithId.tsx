import React, { useRef, useEffect } from 'react';

const DivWithId = ({ id, className }) => {
  const divRef = useRef(null);

  useEffect(() => {
    // You can access the DOM element directly via divRef.current
    if (divRef.current) {
      console.log('Div is mounted:', divRef.current);
    }
  }, []);

  return <div id={id} ref={divRef} className={className}></div>;
};

export default DivWithId;