import React, { useContext } from 'react';
import { AuthActionContext } from 'src/context';

const useAuthAction = () => {
  const context = useContext(AuthActionContext);
  if (context === undefined) {
    throw new Error(`useAuthAction must be used within a AuthProvider`);
  }
  return context;
};

export default useAuthAction;
