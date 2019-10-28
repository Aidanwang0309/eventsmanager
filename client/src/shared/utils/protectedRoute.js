import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Button } from 'antd';

import { useLoadUser } from 'src/shared/hooks';

const ProtectedRoute = ({ ...props }) => {
  const [loading, isAuthenticated] = useLoadUser();

  return loading ? (
    <Button type="primary" loading>
      Loading
    </Button>
  ) : isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
