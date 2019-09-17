import React, { useContext } from "react";
import { Menu, Icon, Button } from "antd";
import AuthContext from "../../context/auth/authContext";

const SideMenu = props => {
  //   const { SubMenu } = Menu;
  const { onSelect } = props;
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <div id="dashboard-sidenav" style={{ width: 240 }}>
      <Menu
        style={{
          height: "100vh",
          backgroundColor: "#7477843d",
          borderRight: 0
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        // inlineCollapsed={this.state.collapsed}
      >
        <div
          style={{
            height: "10rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "1rem"
          }}
        >
          <p style={{ marginBottom: "3rem" }}>Welcome Back!</p>
          <h1 style={{ color: "white" }}> {user.name} </h1>
        </div>
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

{
  /* <SubMenu
key="sub1"
title={
  <span>
    <Icon type="mail" />
    <span>Navigation One</span>
  </span>
}
>
<Menu.Item key="5">Option 5</Menu.Item>
<Menu.Item key="6">Option 6</Menu.Item>
<Menu.Item key="7">Option 7</Menu.Item>
<Menu.Item key="8">Option 8</Menu.Item>
</SubMenu>
<SubMenu
key="sub2"
title={
  <span>
    <Icon type="appstore" />
    <span>Navigation Two</span>
  </span>
}
>
<Menu.Item key="9">Option 9</Menu.Item>
<Menu.Item key="10">Option 10</Menu.Item>
<SubMenu key="sub3" title="Submenu">
  <Menu.Item key="11">Option 11</Menu.Item>
  <Menu.Item key="12">Option 12</Menu.Item>
</SubMenu>
</SubMenu> */
}

{
  /* <Button
        type="primary"
        // onClick={this.toggleCollapsed}
        style={{ marginBottom: 16 }}
      > */
}
{
  /* <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} /> */
}
{
  /* </Button> */
}
