//Control e insercion los mensajes de error que retorna la peticion
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

//Formatar fecha (Por defecto solo fecha o paramatetro para incluir hora)
export const formatDate = (date, includeTime = false) => {
  if (!date) return "";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
  };
  return new Date(date).toLocaleDateString("es-ES", options);
};


//Formatear hora formato 12h
export const formatHour = (hour) => {
  const date = new Date();
  date.setHours(hour, 0, 0, 0);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12"
  });
};
