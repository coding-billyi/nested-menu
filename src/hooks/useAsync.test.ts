import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from './useAsync';

const createDeferral = () => {
  // https://github.com/microsoft/TypeScript/issues/11498#issuecomment-653788363
  let resolve!: (value?: unknown) => void, reject!: (reason?: any) => void;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const defaultState = {
  status: 'idle',
  data: null,
  error: null,
  isPending: false,
  isResolved: false,
  isRejected: false,
  run: expect.any(Function),
};

const pendingState = {
  ...defaultState,
  status: 'pending',
  isPending: true,
};

const resolvedState = {
  ...defaultState,
  status: 'resolved',
  isResolved: true,
};

const rejectedState = {
  ...defaultState,
  status: 'rejected',
  isRejected: true,
};

describe('useAsync hooks', () => {
  it('calling run with a promise which resolves', async () => {
    const { promise, resolve } = createDeferral();
    const { result } = renderHook(() => useAsync());

    expect(result.current).toEqual(defaultState);

    let p: Promise<unknown>;
    act(() => {
      p = result.current.run(promise);
    });

    expect(result.current).toEqual(pendingState);

    const resolvedValue = Symbol('resolved value');
    await act(async () => {
      resolve(resolvedValue);
      await p;
    });

    expect(result.current).toEqual({
      ...resolvedState,
      data: resolvedValue,
    });
  });

  it('calling run with a promise which rejects', async () => {
    const { promise, reject } = createDeferral();
    const { result } = renderHook(() => useAsync());

    expect(result.current).toEqual(defaultState);

    let p: Promise<unknown>;
    act(() => {
      p = result.current.run(promise);
    });

    expect(result.current).toEqual(pendingState);

    const rejectedValue = Symbol('rejected value');

    await act(async () => {
      reject(rejectedValue);
      await p;
    });

    expect(result.current).toEqual({ ...rejectedState, error: rejectedValue });
  });

  it('No state updates if the component is unmounted while pending', async () => {
    const warn = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { promise, resolve } = createDeferral();
    const { result, unmount } = renderHook(() => useAsync());

    let p: Promise<unknown>;
    act(() => {
      p = result.current.run(promise);
    });

    unmount();

    await act(async () => {
      resolve();
      await p;
    });

    expect(console.error).not.toHaveBeenCalled();
    warn.mockReset();
  });
});
