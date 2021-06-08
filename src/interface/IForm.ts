type Field = {
  label: string;
  type: string;
};

export interface IForm {
  title: string;
  id: string;
  parent_id: string;
  endpoint: string;
  fields: {
    [field: string]: Field;
  };
}
