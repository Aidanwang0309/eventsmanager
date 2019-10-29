import { useEffect, useRef } from 'react';
import { useAuthAction, useAuthState } from 'src/shared/hooks';
import { useHistory } from 'react-router';

const useLoadUser = (type: string) => {
  const history = useHistory();
  const isFirstRun = useRef(true);
  const { loadUser } = useAuthAction();
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    isAuthenticated ? history.push(`/${type}`) : history.push(`/login`);
  }, [history, isAuthenticated, type]);
};

export default useLoadUser;
