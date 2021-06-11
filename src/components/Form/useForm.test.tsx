import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './useForm';

const fields = {
  testField_1: {
    type: 'text',
    label: 'Test Field 1',
  },
  testField_2: {
    type: 'email',
    label: 'Test Field 2',
  },
};

describe('useForm hooks', () => {
  it('should update data if input update', () => {
    const { result } = renderHook(() => useForm(fields));

    act(() =>
      result.current.handleChange('testField_1')({
        target: { value: 'test' },
      } as React.ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.data.testField_1).toBe('test');

    act(() =>
      result.current.handleChange('testField_2')({
        target: { value: '123@123.com' },
      } as React.ChangeEvent<HTMLInputElement>),
    );
    expect(result.current.data.testField_2).toBe('123@123.com');
  });
});
