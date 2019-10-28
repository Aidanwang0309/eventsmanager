import React, { useContext, Fragment, useEffect, useState } from 'react';
// import AuthContext from "../../context/auth/authContext";
import SideMenu from '../layout/SideMenu';
import Profile from '../dashboard/Profile';
import EventsTabs from '../dashboard/EventsTabs';
import Calendar from '../dashboard/Calendar';

const Dashboard = props => {
  //   const authContext = useContext(AuthContext);
  //   const { isAuthenticated } = authContext;

  const [page, setPage] = useState('profile');

  const handleSelect = page => {
    setPage(page);
  };

  const renderDashboard = () => {
    switch (page) {
      case 'profile':
        return <Profile></Profile>;
      case 'events':
        return <EventsTabs />;
      case 'calendar':
        return <Calendar />;
      default:
        return <Profile />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SideMenu onSelect={handleSelect} />
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
