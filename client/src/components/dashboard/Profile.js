import React, { useContext } from "react";
import { Descriptions, Badge } from "antd";
import AuthContext from "../../context/auth/authContext";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div style={{ padding: "3rem" }}>
      <Descriptions bordered>
        <Descriptions.Item label="User Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Date Joined">{user.date}</Descriptions.Item>
        <Descriptions.Item label="Social Media">
          Social Media Icon Links
        </Descriptions.Item>
      </Descriptions>
      ,
    </div>
  );
};

export default Profile;
