import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📝 Welcome to Your To-Do List App!</h1>
      <p style={styles.subText}>
        Organize your tasks, stay productive, and achieve your goals effortlessly.  
        Add, edit, delete, and drag your tasks to manage them your way!  
      </p>
      <button onClick={() => navigate("/todo")} style={styles.getStartedButton}>
        Get Started 🚀
      </button>
    </div>
  );
}


const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    color: "#fff",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "12px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
    textShadow: "2px 2px 5px rgba(0,0,0,0.2)",
  },
  subText: {
    fontSize: "18px",
    maxWidth: "600px",
    marginBottom: "20px",
    lineHeight: "1.6",
  },
  getStartedButton: {
    backgroundColor: "#ffcc00",
    color: "#333",
    padding: "12px 24px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease, background 0.3s ease",
  },
};

export default Home;
