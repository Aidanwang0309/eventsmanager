import React, { useContext } from 'react';
import { Descriptions } from 'antd';
import { useAuthState } from 'src/shared/hooks';
import { formatDate } from 'src/shared/utils';
import { useMediaQuery } from 'react-responsive';

const Profile = () => {
  const authState = useAuthState;
  const { user } = authState;

  const isTabletOrMobileDevice = useMediaQuery({
    query: '(max-device-width: 1224px)'
  });

  return (
    <div
      id="profile-table"
      style={
        isTabletOrMobileDevice
          ? { width: '95%', padding: '2rem 1rem 0 5rem', margin: '0 auto' }
          : { width: '85%', padding: '3rem', margin: '0 auto' }
      }
    >
      <Descriptions
        column={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
      >
        <Descriptions.Item label="User Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Date Joined">
          {formatDate(user.date).formatedCardDate}
        </Descriptions.Item>
        <Descriptions.Item label="Social Media">
          Social Media Icon Links
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Profile;
