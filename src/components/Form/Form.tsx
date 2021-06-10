import * as React from 'react';
import { IForm } from '../../interface/IForm';
import { MenusActionTypes, useMenus } from '../../providers/MenusProvider';
import { ModalDismissButton } from '../Modal/Modal';
import { Label, Input, Message, Spinner, Buttons } from './FormStyles';
import { Button } from '../Global/Button';
import { useForm } from './useForm';
import { useAsync } from '../../hooks/useAsync';

export const Form: React.FC<FormProps> = ({ form }) => {
  const { title, endpoint, fields } = form;
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
      <form aria-label={title} onSubmit={handleSubmit}>
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
        <Buttons>
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : 'Submit'}
          </Button>
          <ModalDismissButton>
            <Button type="button" variant={'secondary'} onClick={handleCancel}>
              Cancel
            </Button>
          </ModalDismissButton>
        </Buttons>
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
