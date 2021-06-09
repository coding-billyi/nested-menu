import * as React from 'react';
import { IForm } from '../../interface/IForm';
import { MenusActionTypes, useMenus } from '../../providers/MenusProvider';
import { ModalDismissButton } from '../Modal/Modal';
import { Label, Input, Button, Message } from './FormStyles';

type FormProps = {
  form: IForm;
};

export const Form: React.FC<FormProps> = ({ form }) => {
  const { id, title, endpoint, fields } = form;
  const [, dispatch] = useMenus();
  const handleCancel = () => {
    dispatch({ type: MenusActionTypes.Cancel });
  };
  return (
    <>
      <h2 id={`form-${id}`}>{title}</h2>
      <form aria-labelledby={`form-${id}`}>
        {Object.keys(fields).map((key) => {
          const { label, type } = fields[key];
          return (
            <Label key={key} htmlFor={`${key}-field`}>
              {label}
              <Input id={`${key}-field`} type={type} />
            </Label>
          );
        })}
        <div>
          <Button type="submit">Submit</Button>
          <ModalDismissButton>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalDismissButton>
        </div>
      </form>
    </>
  );
};
