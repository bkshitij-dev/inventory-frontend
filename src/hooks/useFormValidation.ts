import { useState } from 'react';

// Define a type for the form values, making it generic
type FormValues = {
  [key: string]: string;
};

// Define a type for the validation rules
// Each rule is a function that takes the current value and all form values,
// and returns an error message (string) or null if valid.
type ValidationRules<T extends FormValues> = {
  [K in keyof T]?: (value: T[K], allValues: T) => string | null;
};

type FormErrors<T> = {
  [K in keyof T]?: string;
} & {
  form?: string;
};

interface UseFormValidationReturn<T extends FormValues> {
  values: T;
  errors: FormErrors<T>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateField: (fieldName: keyof T) => boolean;
  validateForm: () => boolean;
  setValues: React.Dispatch<React.SetStateAction<T>>; // Allow external setting of values
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>; // Allow external setting of errors
  resetForm: () => void; // Function to reset form to initial state
}

function useFormValidation<T extends FormValues>(
  initialValues: T,
  validationRules: ValidationRules<T>
): UseFormValidationReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  // Reset form to initial state
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  // Handles input changes and performs real-time validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    // Clear general form error when user starts typing
    setErrors((prevErrors) => {
      const updated = { ...prevErrors };
      delete updated.form;
      return updated;
    });

    // Perform real-time validation for the changed field
    const rule = validationRules[name as keyof T];
    if (rule) {
      const error = rule(value as T[keyof T], newValues);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error ?? undefined,
      }));
    }
  };

  // Validates a single field
  const validateField = (fieldName: keyof T): boolean => {
    const value = values[fieldName];
    const rule = validationRules[fieldName];
    if (rule) {
      const error = rule(value, values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: error ?? undefined,
      }));
      return error === null; // Return true if no error
    }
    return true; // No rule, so considered valid
  };

  // Validates the entire form
  const validateForm = (): boolean => {
    let allValid = true;
    const newErrors: FormErrors<T> = {};

    for (const key in validationRules) {
      if (Object.prototype.hasOwnProperty.call(validationRules, key)) {
        const typedKey = key as keyof T;
        const rule = validationRules[typedKey];
        if (rule) {
          const error = rule(values[typedKey], values);
          // Force TypeScript to accept the error value — safe because it's typed
          (newErrors as any)[typedKey] = error ?? undefined;
          if (error) {
            allValid = false;
          }
        }
      }
    }
    setErrors(newErrors);
    return allValid;
  };

  return {
    values,
    errors,
    handleChange,
    validateField,
    validateForm,
    setValues, // Expose setter for external updates if needed (e.g., form reset)
    setErrors, // Expose setter for external error setting (e.g., backend errors)
    resetForm,
  };
}

export default useFormValidation;