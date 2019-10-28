import React, { useContext } from 'react';
import { AuthStateContext } from 'src/context';

const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error(`useAuthState must be used within a AuthProvider`);
  }
  return context;
};

export default useAuthState;
