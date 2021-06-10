import * as React from 'react';
import { IForm } from '../../interface/IForm';
import { MenusActionTypes, useMenus } from '../../providers/MenusProvider';
import { ModalDismissButton } from '../Modal/Modal';
import { Label, Input, Button, Message } from './FormStyles';
import { useForm } from './useForm';
import { useAsync } from '../../hooks/useAsync';

export const Form: React.FC<FormProps> = ({ form }) => {
  const { id, title, endpoint, fields } = form;
  const { data, handleChange } = useForm(fields);
  const { isPending, isResolved, isRejected, run } = useAsync();
  const [, dispatch] = useMenus();

  const handleCancel = () => {
    dispatch({ type: MenusActionTypes.Cancel });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    run(
      fetch(endpoint, {
        body: JSON.stringify(data),
        method: 'POST',
      }).then((res) => res.json()),
    );
  };
  return (
    <>
      <h2 id={`form-${id}`}>{title}</h2>
      <form aria-labelledby={`form-${id}`} onSubmit={handleSubmit}>
        {Object.keys(fields).map((key) => {
          const { label, type } = fields[key];
          return (
            <Label key={key} htmlFor={`${key}-field`}>
              {label}
              <Input
                id={`${key}-field`}
                type={type}
                value={data[key]}
                onChange={handleChange(key)}
              />
            </Label>
          );
        })}
        <div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Loading' : 'Submit'}
          </Button>
          <ModalDismissButton>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalDismissButton>
        </div>
      </form>

      {isResolved && (
        <div aria-live="polite">
          <Message>Success</Message>
        </div>
      )}

      {isRejected && (
        <div role="alert">
          <Message error>Something went wrong, please try later</Message>
        </div>
      )}
    </>
  );
};

type FormProps = {
  form: IForm;
};
