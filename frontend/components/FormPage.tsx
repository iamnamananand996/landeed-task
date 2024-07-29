import React from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { JSONSchema7 } from 'json-schema';

interface FormPageProps {
  schema: JSONSchema7;
  onSubmit: (data: any) => void;
  formData: any;
}

const FormPage: React.FC<FormPageProps> = ({ schema, onSubmit, formData }) => {
  return (
    <Form
      schema={schema}
      formData={formData}
      onSubmit={onSubmit}
      validator={validator}
    />
  );
};

export default FormPage;
