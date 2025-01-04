import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix" />
      </div>

      {user ? (
        <div className="navbar__links">
          <span>{user.email}</span>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <div className="navbar__links">
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
