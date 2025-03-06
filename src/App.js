import logo from './logo.svg';
import './App.css';
import React from 'react';
import {Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import ToDoList from './pages/ToDoList';
import About from './pages/About';
import Navbar from './components/NavBar';


function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/todo" element={<ToDoList/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
    
    </>
  );
}

export default App;
