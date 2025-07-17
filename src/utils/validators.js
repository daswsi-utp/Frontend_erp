export const isOnlyLetters = (value) => {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value?.trim());
};

export const isValidDNI = (value) => {
  return /^\d{8}$/.test(value?.trim());
};

export const isOnlyNumbers = (value) => {
  return /^\d+$/.test(value?.trim());
};

export const isValidPhone = (value) => {
  return /^\d{7,15}$/.test(value?.trim());
};

export const isNonEmpty = (value) => {
  return value?.trim().length > 0;
};

export const isValidDate = (value) => {
  return !isNaN(Date.parse(value));
};