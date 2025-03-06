import React from "react";
import { createContext,useState, useEffect } from "react";
export const TodoContext= createContext();


export function TodoProvider({children}){
    const [todos,setTodos] =useState([]);
//loading task from local storage when app start
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
          setTodos(storedTodos);
        }
      }, []);
      
      const updateTodo = (id, newTask) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
        );
        localStorage.setItem(
          "todos",
          JSON.stringify(
            todos.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
          )
        );
      };
      
      // Saving  tasks to local storage whenever they change
      useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
      }, [todos]);
    //adding task function
    const addTodo=(task)=>{
        setTodos([...todos,{id: Date.now(), task, completed:false}]);
    };
    //toggle function for completion status
    const toggleTodo=(id)=>{
        setTodos(
            todos.map((todo)=> todo.id===id ?
             {...todo, completed: !todo.completed}:todo)
        );
    };
    //delete function
    const deleteTodo=(id)=>{
        setTodos(
            todos.filter((todo)=>todo.id !==id)
        );
    };
    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo, updateTodo }}>
          {children}
        </TodoContext.Provider>
      );
    }

