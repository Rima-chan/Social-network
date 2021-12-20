import { useState } from "react";

function SignUpForm() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return(
        <form onSubmit={handleSubmit} className="pb-5">
            <label htmlFor="PseudoInput" >Pseudo</label>
            <input
                type="text"
                name="pseudo"
                value={inputs.pseudo || ''}
                onChange={handleChange}
                id="PseudoInput"
                className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 mb-5 text-gray-700 focus:outline-none focus:shadow-outline"
                required
            />
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
            <button className="block rounded text-white shoadow-lg bg-gray-700 px-4 py-2 mx-auto" type="submit">S'inscrire</button>
        </form>
    )
}

export default SignUpForm;

