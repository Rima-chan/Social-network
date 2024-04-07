import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LOGIN_FORM_INPUTS } from "../../utils/const/input";
import { useAuth } from "../../utils/context/auth";
import { useAxios } from "../../utils/hooks";
import { User, rSetUser } from "../../utils/redux/userSlice";
import { getApiUrl, getAxiosHeaders } from "../../utils/services/api";
import { saveToLocalStorage } from "../../utils/services/localStorage";
import FormInput from "../UI/FormInput";

type LoginInput = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { onLogin } = useAuth();

  const [values, setValues] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const { fetchData } = useAxios<LoginInput, { user: User; token: string }>(
    {
      allowFetch: false,
      url: getApiUrl("users/login"),
      method: "post",
      body: { ...values },
      ...getAxiosHeaders("application/json"),
    },
    (data) => {
      if (data) {
        saveToLocalStorage("user", data.user);
        onLogin(data.token);
        dispatch(rSetUser(data.user));
      }
    }
  );

  const onChange = ({ value, key }: { value: string; key: string }) => {
    setValues((values) => ({ ...values, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchData();
  };

  return (
    <>
      <form onSubmit={(e) => onSubmit(e)} className="pb-5">
        {LOGIN_FORM_INPUTS.map(({ name, ...input }) => (
          <FormInput
            key={name}
            name={name}
            value={values[name as keyof typeof values]}
            onChange={onChange}
            {...input}
          />
        ))}
        <button
          className="block rounded text-white shoadow-lg bg-gray-700 px-4 py-2 mx-auto"
          type="submit"
        >
          Se connecter
        </button>
      </form>
    </>
  );
};

export default LoginForm;
