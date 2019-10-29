import React, { useState } from 'react';
import { useLoadUser } from 'src/shared/hooks';
import SideMenu from '../layout/SideMenu';
import Profile from '../dashboard/Profile';
import EventsTabs from '../dashboard/EventsTabs';
import Calendar from '../dashboard/Calendar';

const Dashboard = () => {
  useLoadUser('dashboard');
  const [page, setPage] = useState('profile');

  const handleSelect = (page: string) => {
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
    <div
      style={{
        display: 'flex',
        // top: '64px',
        paddingTop: '64px',
        width: '100%',
        position: 'relative'
      }}
    >
      <SideMenu onSelect={handleSelect} />
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
