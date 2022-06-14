import { useState, useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from 'react-router-dom';
import FormInput from "../FormInput";
import { fetchUserLogInfos } from '../../features/userLogInfos';
import { selectUserLogState } from "../../utils/selectors";
import Alert from "../AlertMessage";

export default function LoginForm() {
  const store = useStore();
  const userLogState = useSelector(selectUserLogState);
  let navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const inputs = [
    {
      id: "emailLogin",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Email non valide",
      required: true
    },
    {
      id: "passwordLogin",
      name: "password",
      type: "password",
      placeholder: "Mot de passe",
      label: "Mot de passe",
      errorMessage: "Doit contenir minimum 8 caractères dont 1 majuscule et 1 chiffre",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
      required: true
    }
  ];
  const message = {
    failContent: "Oups, il y a eu un problème... 😢",
    failClasses: "bg-red-600 border-red-600 text-red-600 justify-center",
  }
  const handleChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserLogInfos(store, values);
  };
  useEffect(() => {
    if(userLogState.status === 'resolved' && userLogState.data.error === null) {
      navigate('/accueil');
    }
  }, [userLogState, navigate]);
  return (
    <>
    <form
      onSubmit={handleSubmit}
      className="pb-5"
    >
      {inputs.map((input) => (
        <FormInput key={input.id} {...input} value={values[input.name]} onChange={handleChange} />
      ))}
      <button
        className="block rounded text-white shoadow-lg bg-gray-700 px-4 py-2 mx-auto"
        type="submit"
      >
        Se connecter
      </button>
    </form>
    { userLogState.data?.error ? <Alert classes={message.failClasses} content={userLogState.data.error}/> : userLogState.status === 'rejected' ? <Alert classes={message.failClasses} content={message.failContent}/> : null }
    </>
  );
}

