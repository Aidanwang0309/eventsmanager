import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import { Button } from "antd";

const ProtectedRoute = ({ ...props }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser, loading } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Button type="primary" loading>
      {" "}
      Loading{" "}
    </Button>
  ) : isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
