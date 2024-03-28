import React from 'react';
import Test from '../../components/Test';
const options = ['Option 1', 'Option 2', 'Option 3'];
const NotFound = () => {
  return (<>
    <div> 404 - Not Found</div >
    <Test options={options} />
  </>
  )
};

export default NotFound;
