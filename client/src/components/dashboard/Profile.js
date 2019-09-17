import React, { useContext } from "react";
import { Descriptions, Badge } from "antd";
import AuthContext from "../../context/auth/authContext";
import FormatDate from "../../utils/formateDate";

const Profile = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div id="profile-table" style={{ padding: "3rem", width: "80%" }}>
      <Descriptions bordered>
        <Descriptions.Item style={{ border: "0" }} label="User Name">
          {user.name}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={2}>
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Date Joined">
          {FormatDate(user.date).formatedCardDate}
        </Descriptions.Item>
        <Descriptions.Item label="Social Media">
          Social Media Icon Links
        </Descriptions.Item>
      </Descriptions>
      ,
    </div>
  );
};

export default Profile;
