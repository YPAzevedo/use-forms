import { useRef, useState } from "react";

export default function useForms() {
  const formsFields = useRef([]);
  const [errors, setErrors] = useState({});

  const register = (validations = {}) => (ref) => {
    formsFields.current = !formsFields.current.map((r) => r.ref).includes(ref)
      ? [{ ref, validations }, ...formsFields.current]
      : formsFields.current;
    return ref;
  };

  const formData = () => {
    return formsFields.current.reduce((formData, field) => {
      if (!field.ref) return formData;
      return {
        [field.ref.name]: field.ref.value,
        ...formData
      };
    }, {});
  };

  const getFieldError = (value = "", validations = {}, data = {}) => {
    if (validations.required && !value) {
      return validations.required[1] || "Required";
    }
    if (validations.minLength && value.length <= validations.minLength[0]) {
      return validations.minLength[1] || "Too short";
    }
    if (validations.maxLength && value.length >= validations.maxLength[0]) {
      return validations.maxLength[1] || "Too long";
    }
    if (validations.regex && !value.match(validations.regex[0])) {
      return validations.regex[1] || "Not valid";
    }
    if (validations.matchesWith && value !== data[validations.matchesWith[0]]) {
      return validations.matchesWith[1] || "Not matching";
    }
    if (validations.customPredicate && !validations.customPredicate[0](value)) {
      return validations.customPredicate[1] || "Not matching custom predicate";
    }
    return false;
  };

  const getErrors = (data) => {
    return formsFields.current.reduce((errors, field) => {
      if (!field.ref) return errors;
      return {
        [field.ref.name]: getFieldError(
          field.ref.value,
          field.validations,
          data
        ),
        ...errors
      };
    }, {});
  };

  const handleSubmit = (onSubmitCallback) => (e) => {
    e.preventDefault();
    // Clear previous errors from submit
    setErrors({});
    const data = formData();
    // set errors got from formData call
    const formErrors = getErrors(data);
    setErrors(formErrors);
    // clear errorsRef
    return onSubmitCallback(data, formErrors);
  };

  return {
    register,
    handleSubmit,
    errors
  };
}
