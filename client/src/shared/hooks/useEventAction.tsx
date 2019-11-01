import React, { useContext, useRef } from 'react';
import { EventActionContext } from 'src/context';

const useEventAction = () => {
  const context = useContext(EventActionContext);
  if (context === undefined) {
    throw new Error(`useEventAction must be used within a EventProvider`);
  }
  const contextRef = useRef(context);
  return contextRef.current;
};

export default useEventAction;
