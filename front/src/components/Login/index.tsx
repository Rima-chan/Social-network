import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";

type Props = {
  showLogin: boolean;
};

const LoginCard: React.FC<Props> = ({ showLogin }) => {
  const [isLoging, setIsLoging] = useState(showLogin);

  return (
    <div className="rounded border bg-white md:w-1/3 shadow-lg my-8 mx-3 px-5 pb-6">
      <h1 className="border-b-2 text-center text-xl my-3 pt-2 pb-3">
        {isLoging ? "Connexion" : "Inscription"}
      </h1>
      {isLoging ? <LoginForm /> : <SignUpForm />}
      <div
        className="cursor-pointer text-center"
        onClick={() => setIsLoging(!isLoging)}
      >
        {isLoging ? "Pas encore inscrit ?" : "Déjà inscrit ?"}
      </div>
    </div>
  );
};

export default LoginCard;
