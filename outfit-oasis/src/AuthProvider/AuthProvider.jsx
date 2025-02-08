import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    window.localStorage.getItem("token") || null
  );
  const navigate = useNavigate();

  const loginAction = async (form, setForm, errorRef) => {
    try {
      if (!form.password || !form.username) {
        errorRef.current.style.display = "block";
        errorRef.current.style.color = "red";
        errorRef.current.innerText = "Please enter the missing field";
        return;
      }

      const response = await fetch("http://localhost:8080/api/signin", {
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
        errorRef.current.style.display = "block";
        errorRef.current.style.color = "red";
        errorRef.current.innerText = data.message;
      }
    } catch (error) {
      errorRef.current.style.display = "block";
      errorRef.current.style.color = "red";
      errorRef.current.innerText = error.message;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/login"); // Redirect to login after logout
  };

  const value = {
    user,
    token,
    loginAction,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};