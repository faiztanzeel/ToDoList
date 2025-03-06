import React, { useState, useContext } from "react";
import { TodoContext } from "../context/ToDoContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function ToDoList() {
  const { todos, setTodos, addTodo, toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [task, setTask] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedTasks, setDeletedTasks] = useState({});
  const [editTask, setEditTask] = useState(null);
  const [editText, setEditText] = useState("");

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = [...todos];
    const [movedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, movedItem);

    setTodos(reorderedTodos);
    localStorage.setItem("todos", JSON.stringify(reorderedTodos));
  };

  const handleDelete = (id) => {
    const taskToDelete = todos.find((todo) => todo.id === id);
    if (!taskToDelete) return;

    setDeletedTasks((prev) => ({ ...prev, [id]: taskToDelete }));
    deleteTodo(id);

    setTimeout(() => {
      setDeletedTasks((prev) => {
        const updatedTasks = { ...prev };
        delete updatedTasks[id];
        return updatedTasks;
      });
    }, 5000);
  };

  const handleUndo = (id) => {
    if (deletedTasks[id]) {
      addTodo(deletedTasks[id].task);
      setDeletedTasks((prev) => {
        const updatedTasks = { ...prev };
        delete updatedTasks[id];
        return updatedTasks;
      });
    }
  };

  const startEdit = (todo) => {
    setEditTask(todo.id);
    setEditText(todo.task);
  };

  const handleEditSubmit = (id) => {
    if (editText.trim()) {
      updateTodo(id, editText);
      setEditTask(null);
      setEditText("");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📝 To-Do List</h2>

      
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchBar}
      />

      
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>➕ Add</button>
      </form>


      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef} style={styles.list}>
              {filteredTodos.map((todo, index) => (
                <React.Fragment key={todo.id}>
                  <Draggable draggableId={todo.id.toString()} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...styles.listItem, ...provided.draggableProps.style }}
                      >
                        {editTask === todo.id ? (
                          <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={styles.editInput}
                          />
                        ) : (
                          <span
                            onClick={() => toggleTodo(todo.id)}
                            style={{
                              textDecoration: todo.completed ? "line-through" : "none",
                              cursor: "pointer",
                              flexGrow: 1,
                            }}
                          >
                            {todo.task}
                          </span>
                        )}

                        {editTask === todo.id ? (
                          <button onClick={() => handleEditSubmit(todo.id)} style={styles.saveButton}>💾 Save</button>
                        ) : (
                          <>
                            <button onClick={() => startEdit(todo)} style={styles.editButton}>✏️</button>
                            <button onClick={() => handleDelete(todo.id)} style={styles.deleteButton}>❌</button>
                          </>
                        )}
                      </li>
                    )}
                  </Draggable>

                  
                  {deletedTasks[todo.id] && (
                    <div style={styles.undoContainer}>
                      <span>Task deleted</span>
                      <button onClick={() => handleUndo(todo.id)} style={styles.undoButton}>Undo</button>
                    </div>
                  )}
                </React.Fragment>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

// todo styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "15px",
  },
  searchBar: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "15px",
    outline: "none",
    transition: "0.3s",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  addButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.3s",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "18px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    cursor: "grab",
    transition: "0.3s",
  },
  editButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "10px",
    color: "#007BFF",
  },
  saveButton: {
    background: "#28a745",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    marginLeft: "10px",
    color: "red",
  },
  undoContainer: {
    marginTop: "5px",
    padding: "5px",
    backgroundColor: "#ffebee",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  undoButton: {
    padding: "5px 10px",
    fontSize: "14px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "0.3s",
  },
  editInput: {
    flex: 1,
    padding: "5px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
};

export default ToDoList;
