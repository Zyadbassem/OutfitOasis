import InputField from "./InputField/InputField";
import { useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import PopUpHelper from "../Helpers/PopUpHelper";

function Login() {
  /** Access the form fields */
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  /** Handle error message */
  const [error, setError] = useState("");

  /** Handle Change on form Fields */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  /** User Authentication */
  const auth = useAuth();

  /** Handle logging */
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("clicked");
    console.log("signing in", form);

    auth.loginAction(form, setForm, setError);
  };

  return (
    <form
      onSubmit={handleLogin}
      className="
                w-full
                max-w-[1300px]
                mx-auto
                h-full
                flex
                flex-col
                mt-[20%]
                border-x-0
                items-center
                p-6
                mb-11
                lg:mt-28"
    >
      {error ? <PopUpHelper message={error} error={true} /> : null}
      <h1 className="text-8xl m-10 font-sans">Login</h1>
      <InputField
        label="Username"
        name="username"
        placeholder="Exp: johnCena"
        type="text"
        onChange={handleChange}
        value={form.username}
      />
      <InputField
        label="Password"
        name="password"
        placeholder="Type your password"
        onChange={handleChange}
        value={form.password}
      />
      <button
        type="submit"
        className="
        font-sans
        m-5
        text-2xl
        px-5
        py-1
        rounded-lg
        bg-black
        ring-1
        ring-[#87878741]
        text-[#fff]
        bg-transparent
        shadow-[#807f7f90]
        shadow-sm
        "
      >
        Login
      </button>
    </form>
  );
}

export default Login;
