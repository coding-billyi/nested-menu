import React from 'react';

function useSafeDispatch(dispatch: React.Dispatch<Partial<State>>) {
  const isMounted = React.useRef(false);
  React.useLayoutEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return React.useCallback(
    (args) => (isMounted.current ? dispatch(args) : void 0),
    [dispatch],
  );
}

const initialState: State = { status: 'idle', data: null, error: null };

function useAsync() {
  const [{ status, data, error }, setState] = React.useReducer(
    (s: State, a: Partial<State>) => ({ ...s, ...a }),
    initialState,
  );

  const safeSetState = useSafeDispatch(setState);

  const run = React.useCallback(
    (promise: Promise<unknown>) => {
      safeSetState({ status: 'pending' });
      return promise.then(
        (data: unknown) => {
          safeSetState({ data, status: 'resolved' });
          return data;
        },
        (error: unknown) => {
          safeSetState({ status: 'rejected', error });
          return error;
        },
      );
    },
    [safeSetState],
  );

  return {
    isPending: status === 'pending',
    isResolved: status === 'resolved',
    isRejected: status === 'rejected',
    error,
    status,
    data,
    run,
  };
}

export { useAsync };

enum StatusTypes {
  idle,
  pending,
  resolved,
  rejected,
}

type State = {
  status: keyof typeof StatusTypes;
  data: null | unknown;
  error: null | unknown;
};
