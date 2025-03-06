import React from "react";
import { FaGithub } from "react-icons/fa";

function About() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>About This Application</h2>
      <p style={styles.text}>
        This is a simple and efficient To-Do List application designed to help you manage your tasks seamlessly.
      </p>
      <p style={styles.text}>
        Created by <strong>Faiz Tanzeel</strong>.
      </p>
      <a
        href="https://github.com/faiztanzeel"
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        <FaGithub size={24} style={{ marginRight: "8px" }} />
        Visit GitHub Repository
      </a>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  link: {
    fontSize: "18px",
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-flex",
    alignItems: "center",
  },
};

export default About;
