import React, { useContext } from 'react';
import { EventStateContext } from 'src/context';

const useEventState = () => {
  const context = useContext(EventStateContext);
  if (context === undefined) {
    throw new Error(`useEventState must be used within a EventProvider`);
  }
  return context;
};

export default useEventState;
