export const VALIDATION_MESSAGES = {
  TITLE_EMPTY: "El título no puede estar vacío",
  TITLE_REPEATED: "Ya tienes un libro con ese título",
  TITLE_TOO_LONG: "El título es demasiado largo (máx. 80 caracteres)",
  TITLE_HAS_SLASH: "El título no puede contener el símbolo /",
  AUTHOR_TOO_LONG: "El autor es demasiado largo (máx. 34 caracteres)",
  GENDER_EMPTY: "El género personalizado no puede estar vacío",
  GENDER_TOO_LONG: "El género es demasiado largo (máx. 24 caracteres)",
  LOANED_EMPTY: "Debes indicar a quién prestaste el libro",
  LOANED_TOO_LONG: "El nombre es demasiado largo (máx. 24 caracteres)",
  INVALID_URL: "La URL de la imagen no es válida",
} as const;

export const ERROR_KEYS = {
  TITLE: "title-input",
  AUTHOR: "author-input",
  GENDER: "gender-input",
  LOANED: "lent-input",
  IMAGE: "image-input",
} as const;
