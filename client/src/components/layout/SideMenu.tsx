import React, { useState } from 'react';
import { useAuthState } from 'src/shared/hooks';
import { Menu, Icon } from 'antd';
import { Button } from 'src/shared/components';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type ISideMenuProps = {
  onSelect: (props: string) => void;
};

const SideMenu = (props: ISideMenuProps) => {
  const { onSelect } = props;
  const classes = useStyles();
  const { user } = useAuthState();

  const [collapsed, setCollapsed] = useState(true);

  return (
    user && (
      <div id="dashboard-sidenav" style={{ position: 'fixed' }}>
        <Button type="button" onClick={() => setCollapsed(c => !c)}>
          <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          className={classes.sideNav}
        >
          {collapsed ? null : (
            <div
              style={{
                height: '10rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingLeft: '1rem',
                width: '240px'
              }}
            >
              <p style={{ marginBottom: '3rem' }}>Welcome Back!</p>
              <p style={{ fontSize: '2.5rem' }}> {user.name} </p>
            </div>
          )}

          <Menu.Item key="1" onClick={() => onSelect('profile')}>
            <Icon type="profile" />
            <span>Profile</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={() => onSelect('events')}>
            <Icon type="build" />
            <span>Events</span>
          </Menu.Item>
          <Menu.Item key="3" onClick={() => onSelect('calendar')}>
            <Icon type="calendar" />
            <span>Calendar</span>
          </Menu.Item>
        </Menu>
      </div>
    )
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideNav: {
      height: '100vh',
      backgroundColor: theme.palette.primary.main,
      borderRight: 0,
      color: theme.palette.text.primary,
      '& i': {
        color: theme.palette.text.primary
      },
      '& span': {
        color: theme.palette.text.primary
      }
    }
  })
);

export default SideMenu;
