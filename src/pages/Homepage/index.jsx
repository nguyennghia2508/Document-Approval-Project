import React from 'react';
import { Outlet } from 'react-router';

const Homepage = () => {
  return (
    <div>
      <div>Homepage</div>
      <Outlet />
    </div>
  );
};

export default Homepage;
