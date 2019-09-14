import React, { useContext, Fragment, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const AuthContainer = ({ ...props }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return <Fragment {...props} />;
};

export default AuthContainer;
