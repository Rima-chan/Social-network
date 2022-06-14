import { useState, useEffect } from "react";
import { useSubmitForm } from "../../utils/hooks";
import apiUrlGenerator from "../../utils/services/apiUrl";
import FormInput from "../FormInput";
import Loader from "../Loader";
import Alert from "../AlertMessage";

export default function SignUpForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: "usernameSignup",
      name: "username",
      type: "text",
      placeholder: "Pseudo",
      label: "Pseudo",
      errorMessage: "Doit contenir entre 2 et 13 caractères. Pas de caractères spéciaux.",
      pattern: "^[A-Za-z0-9]{2,16}$",
      required: true
    },
    {
      id: "emailSignup",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Email non valide",
      required: true
    },
    {
      id: "passwordSignup",
      name: "password",
      type: "password",
      placeholder: "Mot de passe",
      label: "Mot de passe",
      errorMessage: "Doit contenir minimum 8 caractères dont 1 majuscule et 1 chiffre",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
      required: true
    },
    {
      id: "confirmPasswordSignup",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirmer le mot de passe",
      label: "Confirmer le mot de passe",
      errorMessage: "Les mots de passe ne correspondent pas",
      pattern: values.password,
      required: true
    },
  ];
  const message = {
    failContent: "Oups, il y a eu un problème... 😢",
    failClasses: "bg-red-600 border-red-600 text-red-600 justify-center",
    successContent: "Votre compte a bien été crée ! ✨",
    successClasses: "bg-green-600 border-green-600 text-green-600 justify-center",
  }
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };
  const url = apiUrlGenerator("users/signup");
  const { onSubmit, isLoading, data, error } = useSubmitForm(url, values);
  // useEffect(() => {
  //   console.log(data);
  //   console.log(error);
  // }, [error, data]);
  return (
    <>
    <form onSubmit={onSubmit} className="pb-5">
      {inputs.map((input) => (
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange}/>
      ))}
      <button
        className="block rounded text-white shoadow-lg bg-gray-700 px-4 py-2 mx-auto"
        type="submit"
      >
        S'inscrire
      </button>
    </form>
    <div className="mb-3">
      { isLoading ? <Loader /> : null}
      { data?.success ? <Alert classes={message.successClasses} content={message.successContent}/> : data?.error ? <Alert classes={message.failClasses} content={data.error}/> : null }
      { error ? <Alert classes={message.failClasses} content={message.failContent}/> : null }
    </div>
    </>
  );
}
