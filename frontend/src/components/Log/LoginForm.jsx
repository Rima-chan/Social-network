import React, { useState, useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormInput from "../FormInput";
import { fetchUser } from "../../queries/userLogInfos";
import { selectUser } from "../../utils/redux/selectors";
import Alert from "../AlertMessage";

const LoginForm = () => {
  const store = useStore();
  const userLogState = useSelector(selectUser);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: "emailLogin",
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Email non valide",
      required: true,
    },
    {
      id: "passwordLogin",
      name: "password",
      type: "password",
      placeholder: "Mot de passe",
      label: "Mot de passe",
      errorMessage:
        "Doit contenir minimum 8 caractères dont 1 majuscule et 1 chiffre",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
      required: true,
    },
  ];
  const message = {
    failContent: "Oups, there is a problem... 😢",
    failClasses: "bg-red-600 border-red-600 text-red-600 justify-center",
  };

  const onChange = (e) => {
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    fetchUser(store, values);
  };
  useEffect(() => {
    if (userLogState.status === "resolved" && !userLogState.data.error) {
      navigate("/home");
    }
  }, [userLogState, navigate]);
  return (
    <>
      <form onSubmit={onSubmit} className="pb-5">
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button
          className="block rounded text-white shoadow-lg bg-gray-700 px-4 py-2 mx-auto"
          type="submit"
        >
          Se connecter
        </button>
      </form>
      {userLogState.data?.error ? (
        <Alert
          classes={message.failClasses}
          content={userLogState.data.error}
        />
      ) : userLogState.status === "rejected" ? (
        <Alert classes={message.failClasses} content={message.failContent} />
      ) : null}
    </>
  );
};

export default LoginForm;
