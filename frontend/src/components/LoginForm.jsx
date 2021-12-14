import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
    const [inputs, setInputs] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <div className="rounded border bg-white md:w-1/4 shadow-lg my-8 mx-3 px-5">
            <h1 className="border-b-2 text-center text-xl my-3 pt-2 pb-3">Connexion</h1>
            <form onSubmit={handleSubmit} className="pb-5">
                <label htmlFor="EmailInput" >Email</label>
                <input
                  type="email"
                  name="email"
                  value={inputs.email || ''}
                  onChange={handleChange}
                  id="EmailInput"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 mb-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  required
                />
                <label htmlFor="PassInput">Mot de passe</label>
                <input
                  type="password"
                  name="pass"
                  value={inputs.pass || ''}
                  onChange={handleChange}
                  id="PassInput"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 mb-5 text-gray-700 focus:outline-none focus:shadow-outline"
                  required/>
                <div className="flex items-center justify-between">
                    <button className="rounded text-white inline-bloc shoadow-lg bg-gray-700 px-4 py-2" type="submit">Se connecter</button>
                    <Link to="/inscription">Pas encore inscrit ?</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;