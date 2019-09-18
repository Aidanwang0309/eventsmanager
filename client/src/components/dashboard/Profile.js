import React, { useContext } from "react";
import { Descriptions } from "antd";
import AuthContext from "../../context/auth/authContext";
import FormatDate from "../../utils/formateDate";
import { useMediaQuery } from "react-responsive";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)"
  });

  return (
    <div
      id="profile-table"
      style={
        isTabletOrMobileDevice
          ? { width: "95%", padding: "2rem 1rem 0 5rem", margin: "0 auto" }
          : { width: "85%", padding: "3rem", margin: "0 auto" }
      }
    >
      <Descriptions
        column={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
      >
        <Descriptions.Item label="User Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Date Joined">
          {FormatDate(user.date).formatedCardDate}
        </Descriptions.Item>
        <Descriptions.Item label="Social Media">
          Social Media Icon Links
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default Profile;
