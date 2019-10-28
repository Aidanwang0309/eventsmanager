import { useEffect, useRef } from 'react';
import { useAuthAction, useAuthState } from 'src/shared/hooks';
import { RouteComponentProps } from 'react-router';

type useLoadUserProps = {
  routerProps?: RouteComponentProps;
  action?: 'toMain' | 'toLast';
};

const useLoadUser = ({ routerProps, action }: useLoadUserProps = {}) => {
  const authAction = useAuthAction();
  const { loadUser } = authAction;

  const authState = useAuthState();
  const { isAuthenticated } = authState;

  const loadUserRef = useRef(loadUser);

  useEffect(() => {
    loadUserRef.current();
  }, []);

  useEffect(() => {
    if (routerProps && action === 'toMain') {
      isAuthenticated && routerProps.history.push('/');
    }
  }, [action, isAuthenticated, routerProps]);
};

export default useLoadUser;
