import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceInput,
  BooleanInput,
} from "react-admin";

export const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput validate={[required()]} source="text" label="Text" />

        <BooleanInput source="correct" label="Correct option" />

        <ReferenceInput source="challengeId" reference="challenges" />

        <TextInput source="imageSrc" label="Image URL" />

        <TextInput source="audioSrc" label="Audio URL" />
      </SimpleForm>
    </Edit>
  );
};
