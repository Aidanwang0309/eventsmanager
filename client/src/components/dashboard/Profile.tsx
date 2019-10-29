import React from 'react';
import { Descriptions } from 'antd';
import { useAuthState } from 'src/shared/hooks';
import { formatDate } from 'src/shared/utils';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const Profile = () => {
  const { user } = useAuthState();
  const classes = useStyles();

  return (
    user && (
      <div className={classes.tableContainer} id="profile-table">
        <Descriptions
          className={classes.table}
          column={{ xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
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
    )
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      backgroundColor: theme.palette.background.paper,
      padding: '0rem 0rem 0rem 1rem',
      [theme.breakpoints.up('sm')]: {
        width: '95%',
        padding: '2rem 1rem 2rem 5rem',
        margin: '3rem auto',
        borderRadius: '5px'
      }
    },

    tableContainer: {
      backgroundColor: theme.palette.background.default,
      margin: '0 auto',
      padding: '3rem 1rem 0 6rem',
      '& span': {
        color: theme.palette.text.primary
      },
      '& th': {
        color: theme.palette.text.primary
      },
      '& td': {
        color: theme.palette.text.primary
      }
    }
  })
);

export default Profile;
