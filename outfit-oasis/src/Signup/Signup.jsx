import InputField from "../Login/InputField/InputField";
import { useRef, useState } from "react";
import { backend_url } from "../Helpers/helpers";
function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordCon: "",
  });

  const errorRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("signing in", form);

    try {
      /** Case Password don't match */
      if (form.password != form.passwordCon) {
        alert("password not match");
        return;
      }

      /** Case any empty field */
      if (!form.email || !form.password || !form.username) {
        alert("enter the missing field");
        return;
      }

      /** Case everything good */
      const response = await fetch(`${backend_url}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          passwordCon: form.passwordCon,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setForm({
          username: "",
          email: "",
          password: "",
          passwordCon: "",
        });
        errorRef.current.style.display = "block";
        errorRef.current.style.color = "green";
        errorRef.current.innerText = "signed in";
      } else {
        console.log(data.message);
        errorRef.current.style.display = "block";
        errorRef.current.style.color = "red";
        errorRef.current.innerText = data.message;
      }
    } catch (error) {
      console.log(error);
      errorRef.current.style.display = "block";
      errorRef.current.style.color = "red";
      errorRef.current.innerText = error.message;
    }
  };

  return (
    <form
      onSubmit={handleSignup}
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
      <h1 className="text-8xl m-10 font-sans">Signup</h1>
      <InputField
        label="Username"
        name="username"
        placeholder="Exp: johnCena"
        type="text"
        onChange={handleChange}
        value={form.username}
      />
      <InputField
        label="Email"
        name="email"
        placeholder="Exp: johnCena@gmail.com"
        type="email"
        onChange={handleChange}
        value={form.email}
      />
      <InputField
        label="Password"
        name="password"
        placeholder="Type your password"
        onChange={handleChange}
        value={form.password}
      />
      <InputField
        label="Password(again)"
        name="passwordCon"
        placeholder="Type your password again"
        onChange={handleChange}
        value={form.passwordCon}
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
        bg-[#xxx]
        shadow-[#807f7f90]
        shadow-sm
        "
      >
        Sign up
      </button>
      <p style={{ display: "none" }} ref={errorRef}></p>
    </form>
  );
}

export default Signup;
