import {
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  NumberInput,
  Edit,
} from "react-admin";

export const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput validate={[required()]} source="id" label="Id" />

        <TextInput validate={[required()]} source="title" label="Title" />

        <TextInput
          validate={[required()]}
          source="description"
          label="Description"
        />

        <ReferenceInput source="courseId" reference="courses" />

        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  );
};
