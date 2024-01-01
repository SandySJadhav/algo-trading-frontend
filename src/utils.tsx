export const validateEmail = (email: string) =>
  email?.length > 0 && !!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.exec(email);

export const validatePass = (pass: string) =>
  pass?.length > 0 && !!/^[\w\W]{6,20}$/i.exec(pass);
