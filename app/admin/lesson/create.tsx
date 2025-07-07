// import { units, courses } from '../../../db/schema';
import {
  SimpleForm,
  Create,
  TextInput,
  required,
  NumberInput,
  ReferenceInput,
  SelectInput,
} from "react-admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unitOptionText = (units: any) =>
  `Course Id ${units.courseId} – ${units.title}`;

export const LessonCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput validate={[required()]} source="title" label="Title" />
        <ReferenceInput source="unitId" reference="units">
          <SelectInput optionText={unitOptionText} />
        </ReferenceInput>
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};
