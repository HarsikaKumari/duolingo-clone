import { SimpleForm, TextInput, required, Edit, NumberInput } from "react-admin";

export const LessonEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} source="id" label="Id" />
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput validate={[required()]} source="unitId" label="Units" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
