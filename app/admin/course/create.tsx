import { SimpleForm, Create, TextInput, required } from "react-admin";

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="title" label="Title" />
        <TextInput validate={[required()]} source="imageSrc" label="Image" />
      </SimpleForm>
    </Create>
  );
};
 