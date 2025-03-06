import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>Task Manager</h1>
      <ul style={styles.navList}>
        <li>
          <NavLink to="/" exact style={styles.navLink} activeStyle={styles.activeLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/todo" style={styles.navLink} activeStyle={styles.activeLink}>
            ToDoList
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" style={styles.navLink} activeStyle={styles.activeLink}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}


const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "linear-gradient(90deg, #007BFF, #6610F2)",
    padding: "15px 30px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logo: {
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "500",
    padding: "8px 15px",
    borderRadius: "8px",
    transition: "background 0.3s, transform 0.2s",
  },
  activeLink: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "scale(1.05)",
  },
};

export default Navbar;
