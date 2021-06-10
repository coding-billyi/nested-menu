import * as React from 'react';
import { IFields } from '../../interface/IForm';

const getInitialData = (fields: IFields) =>
  Object.keys(fields).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: '',
    }),
    {},
  );

export const useForm = (fields: IFields) => {
  const [data, setData] = React.useState<KeysEnum<IFields>>(
    getInitialData(fields),
  );

  const handleChange = React.useCallback(
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setData((prevData) => ({
        ...prevData,
        [key]: event.target.value,
      }));
    },
    [],
  );

  return {
    data,
    handleChange,
  };
};

type KeysEnum<T> = { [P in keyof Required<T>]: string | number };
