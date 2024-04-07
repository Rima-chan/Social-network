export type InputForm = {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  pattern?: string;
};

export const LOGIN_FORM_INPUTS: InputForm[] = [
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    error: "Email non valide",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Mot de passe",
    label: "Mot de passe",
    error: "Doit contenir minimum 8 caractères dont 1 majuscule et 1 chiffre",
    // pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
    required: true,
  },
];

export const SIGNUP_FORM_INPUTS: InputForm[] = [
  {
    name: "pseudo",
    type: "text",
    placeholder: "Pseudo",
    label: "Pseudo",
    error:
      "Doit contenir entre 2 et 13 caractères. Pas de caractères spéciaux.",
    pattern: "^[A-Za-z0-9]{2,16}$",
    required: true,
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
    label: "Email",
    error: "Email non valide",
    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Mot de passe",
    label: "Mot de passe",
    error: "Doit contenir minimum 8 caractères dont 1 majuscule et 1 chiffre",
    // pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirmer le mot de passe",
    label: "Confirmer le mot de passe",
    error: "Les mots de passe ne correspondent pas",
    // pattern: "values.password",
    required: true,
  },
];

export const POST_FORM_INPUT: InputForm[] = [
  {
    name: "create_post_content",
    type: "textarea",
    placeholder: "Ecrire une publication...",
  },
];

export const ERROR_MESSAGES = {
  failContent: "Oups, il y a eu un problème... 😢",
  failClasses: "bg-red-600 border-red-600 text-red-600 justify-center",
  successContent: "Votre compte a bien été crée ! ✨",
  successClasses: "bg-green-600 border-green-600 text-green-600 justify-center",
};
