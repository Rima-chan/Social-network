import { useState } from "react";
import axios from 'axios';
import instance from '../../services/apiUrl';

function LoginForm() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState('');
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        axios({
          method: "post",
          url: `${instance.baseUrl}/users/login`,
          data: inputs,
        })
          .then(response => {
            console.log(response.data)
              if (response.data.error) {
                setError(response.data.error);
                console.log(response.data.error)
              } else {
                console.log(response.data);
                window.location = "/accueil";
              }
          })
          .catch(error => {
            console.log(error);
          });
    }
    return(
      <form onSubmit={handleSubmit} className="flex flex-col pb-5" encType="application/x-www-form-urlencoded">
       <label htmlFor="EmailInput" >Email</label>
          <input
            type="text"
            name="email"
            value={inputs.email || ''}
            onChange={handleChange}
            id="EmailInput"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 focus:outline-none focus:shadow-outline"
            
        />
      <span className="inline-block text-sm text-red-500 font-semibold pt-2 pb-4">
        { error === 'mail' ? 'Email introuvable' : null}
      </span>
      <label htmlFor="PassInput">Mot de passe</label>
      <input
            type="password"
            name="password"
            value={inputs.password || ''}
            onChange={handleChange}
            id="PassInput"
            className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 focus:outline-none focus:shadow-outline"
            />
      <span className="inline-block text-sm text-red-500 font-semibold pt-2 pb-4">
        { error === 'password' ? 'Le mot de passe ne correspond pas' : null}
      </span>
        <button className="block rounded text-white shoadow-lg bg-gray-700 px-4 py-2 mx-auto" type="submit">Se connecter</button>
      </form>
    )
}

export default LoginForm;