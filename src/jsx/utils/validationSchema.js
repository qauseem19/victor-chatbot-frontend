// src/utils/validationSchema.js
import * as Yup from 'yup';

export const createValidationSchema = (fields) => {
  const shape = {};

  fields.forEach(field => {
    let validation = Yup.string();

    if (field.required) {
      validation = validation.required(`${field.label} is required`);
    }

    if (field.minLength) {
      validation = validation.min(field.minLength, `${field.label} must have at least ${field.minLength} characters`);
    }

    if (field.maxLength) {
      validation = validation.max(field.maxLength, `${field.label} must have a maximum of ${field.maxLength} characters`);
    }

    if (field.type === 'email') {
      validation = validation.email('Please provide a valid email');
    }

    shape[field.name] = validation;
  });

  return Yup.object().shape(shape);
};
