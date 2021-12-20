import { useState } from "react";
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

function Log(props) {
    const [ signUp, setSignup] = useState(props.signup);
    const [ login, setLogin ] = useState(props.login);
    const handleLog = (e) => {
        if (e.target.id === "register") {
            setSignup(false);
            setLogin(true);
        } else if (e.target.id === "login") {
            setSignup(true);
            setLogin(false);
        }
    };
    return (
        <div className="rounded border bg-white md:w-1/4 shadow-lg my-8 mx-3 px-5 pb-6">
            <h1 className="border-b-2 text-center text-xl my-3 pt-2 pb-3">{ signUp ? 'Inscription' : 'Connexion'}</h1>
            {signUp && <SignUpForm></SignUpForm>}
            {login && <LoginForm></LoginForm>}
            <p id={login ? "login" : "register"} className="cursor-pointer text-center" onClick={handleLog} >{login ? 'Pas encore inscrit ?' : 'Déjà inscrit'}</p>
        </div>  
    )
}

export default Log;