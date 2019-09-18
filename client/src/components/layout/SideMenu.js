import React, { useContext, useState } from "react";
import { Menu, Icon, Button } from "antd";
import AuthContext from "../../context/auth/authContext";
import { useMediaQuery } from "react-responsive";

const SideMenu = props => {
  //   const { SubMenu } = Menu;
  const { onSelect } = props;
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)"
  });
  const [collapsed, setCollapsed] = useState(
    isTabletOrMobileDevice ? true : false
  );

  return (
    <div
      id="dashboard-sidenav"
      style={isTabletOrMobileDevice ? { position: "fixed" } : { width: "auto" }}
    >
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: "100%",
          background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
          border: "none",
          height: "40px",
          borderRadius: "0"
        }}
      >
        <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
      </Button>
      <Menu
        style={{
          height: "100vh",
          backgroundColor: "#4a5162",
          borderRight: 0
        }}
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {collapsed ? null : (
          <div
            style={{
              height: "10rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "1rem",
              width: "240px"
            }}
          >
            <p style={{ marginBottom: "3rem" }}>Welcome Back!</p>
            <h1 style={{ color: "white" }}> {user.name} </h1>
          </div>
        )}

        <Menu.Item key="1" onClick={() => onSelect("profile")}>
          <Icon type="profile" />
          <span>Profile</span>
        </Menu.Item>
        <Menu.Item key="2" onClick={() => onSelect("events")}>
          <Icon type="build" />
          <span>Events</span>
        </Menu.Item>
        <Menu.Item key="3" onClick={() => onSelect("calendar")}>
          <Icon type="calendar" />
          <span>Calendar</span>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;
