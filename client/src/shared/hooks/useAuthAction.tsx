import React, { useContext, useRef } from 'react';
import { AuthActionContext } from 'src/context';

const useAuthAction = () => {
  const context = useContext(AuthActionContext);
  if (context === undefined) {
    throw new Error(`useAuthAction must be used within a AuthProvider`);
  }
  const contextRef = useRef(context).current;
  return contextRef;
};

export default useAuthAction;
