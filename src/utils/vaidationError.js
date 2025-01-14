export const processValidationErrors = (validationErrors) => {
    const errorMessages = {};
    validationErrors.forEach((error) => {
      const { field, constraints } = error;
      if (constraints) {
        errorMessages[field] = Object.values(constraints).join(', ');
      }
    });
    return errorMessages;
  };