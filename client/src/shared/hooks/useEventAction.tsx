import React, { useContext } from 'react';
import { EventActionContext } from 'src/context';

const useEventState = () => {
  const context = useContext(EventActionContext);
  if (context === undefined) {
    throw new Error(`useEventAction must be used within a EventProvider`);
  }
  return context;
};

export default useEventState;
