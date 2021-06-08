import { IForm } from './IForm';

export interface IMenu {
  title: string;
  id: string;
  parent_id: string | null;
  form: IForm | null;
  children: IMenu[];
}
