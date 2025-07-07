import { SimpleForm, TextInput, required, Edit } from "react-admin";

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} source="id" label="Id" />
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput validate={[required()]} source="imageSrc" label="Image" />
      </SimpleForm>
    </Edit>
  );
};
