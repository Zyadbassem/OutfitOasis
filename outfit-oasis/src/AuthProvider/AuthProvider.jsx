import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { backend_url } from "../Helpers/helpers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null,
  );
  const navigate = useNavigate();

  const loginAction = async (form, setForm, setError) => {
    try {
      if (!form.password || !form.username) {
        setError("Please enter the missing field");
        return;
      }

      const response = await fetch(`${backend_url}/api/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setForm({
          username: "",
          password: "", // Add password reset
        });
        setToken(data.userData.userToken);
        window.localStorage.setItem("token", data.userData.userToken);
        setUser(data.userData.username);
        navigate("/"); // Redirect after successful login
      } else {
        setError(data.message);
        setForm({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      setError(error.message);
      setForm({
        username: "",
        password: "",
      });
    }
  };

  const checkoutAction = async (form, setForm, setError) => {
    if (
      !form.firstName ||
      !form.lastName ||
      !form.phoneNumber ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.country
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(`${backend_url}/api/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Checkout failed");
      }

      navigate("/orders");
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  const checkToken = async (tokentaken) => {
    if (!tokentaken || tokentaken === null) return false;
    try {
      const response = await fetch(`${backend_url}/api/checktoken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokentaken}`,
        },
      });

      if (!response.ok) {
        logout();
      }

      const data = await response.json();
      return data.valid;
    } catch (error) {
      console.error("Token check error:", error);
      logout();
      return false;
    }
  };
  const value = {
    user,
    token,
    loginAction,
    logout,
    checkToken,
    checkoutAction,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
