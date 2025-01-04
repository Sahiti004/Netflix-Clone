import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/api/protected", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUser({ email: response.data.email }))
        .catch((err) => console.log(err));
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser({ email: decodedToken.email });
    } catch (err) {
      console.error("Invalid token:", err);
      logout();
    }
  };
  

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
