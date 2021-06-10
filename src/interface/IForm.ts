export interface IFields {
  [field: string]: {
    label: string;
    type: string;
  };
}

export interface IForm {
  title: string;
  id: string;
  parent_id: string;
  endpoint: string;
  fields: IFields;
}
