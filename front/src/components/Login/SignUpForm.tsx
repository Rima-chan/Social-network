import { useState } from "react";
import { SIGNUP_FORM_INPUTS } from "../../utils/const/input";
import FormInput from "../UI/FormInput";
import { useAxios } from "../../utils/hooks";
import { getApiUrl } from "../../utils/services/api";
import { useSnackbar } from "../../utils/context/snackbar";

type SignupInput = {
  pseudo: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm: React.FC = () => {
  const { showSnackbar } = useSnackbar();

  const [values, setValues] = useState<SignupInput>({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = ({ value, key }: { value: string; key: string }) => {
    setValues((values) => ({ ...values, [key]: value }));
  };

  const { fetchData } = useAxios<SignupInput, { message: string }>(
    {
      url: getApiUrl("users/signup"),
      method: "post",
      body: { ...values },
      allowFetch: false,
    },
    (data) => {
      showSnackbar({ type: "success", message: data?.message });
    }
  );

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
          setValues({
            pseudo: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }}
        className="pb-5"
      >
        {SIGNUP_FORM_INPUTS.map(({ name, ...input }) => (
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
          S'inscrire
        </button>
      </form>
      <div className="mb-3">
        {/* {isLoading ? <Loader /> : null} */}
        {/* {data?.success ? (
          <Alert
            classes={message.successClasses}
            content={message.successContent}
          />
        ) : data?.error ? (
          <Alert classes={message.failClasses} content={data.error} />
        ) : null}
        {error && (
          <Alert classes={message.failClasses} content={message.failContent} />
        )} */}
      </div>
    </>
  );
};

export default SignUpForm;
