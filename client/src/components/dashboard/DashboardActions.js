import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn btn-light'>
        <i class='fas fa-user-cog text-primary'></i> Edit Profile
      </Link>
      <Link to='/create-club' class='btn btn-light'>
        <i class='fas fa-users text-primary'></i> Create Club
      </Link>
    </div>
  );
};

export default DashboardActions;