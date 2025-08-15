import { useState } from "react";
import "./App.css";
import "./responsive.css";
import {ScrollText} from 'lucide-react';
import { ImCross } from "react-icons/im";
import { FaPencilAlt } from "react-icons/fa";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  function readInputValue(event) {
    setInput(event.target.value);
  }

  function addTodo() {
    if (!input.trim()) return alert("Todo is required");

    if (isEditing) {
      const updatedList = [...todoList];
      updatedList[currentIndex] = input;
      setTodoList(updatedList);
      setIsEditing(false);
      setCurrentIndex(null);
    } else {
      setTodoList([...todoList, input]);
    }

    setInput("");
  }

  function deleteTodo(index) {
    const copyList = [...todoList];
    copyList.splice(index, 1);
    setTodoList(copyList);

    if (isEditing && index === currentIndex) {
      setIsEditing(false);
      setInput("");
    }
  }
function clearAll() {
  setTodoList([]);
  setInput("");
  setIsEditing(false);
  setCurrentIndex(null);
}
  function startUpdate(index) {
    setInput(todoList[index]);
    setIsEditing(true);
    setCurrentIndex(index);
  }

  return (
    <div className="app-wrapper">
      <div className="todo-container">
        <h1 className="title">To-Do List App <ScrollText size={30}/></h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter a todo..."
            value={input}
            onChange={readInputValue}
            className="todo-input"
          />
          <button onClick={addTodo} className={isEditing ? "update-btn-main" : "add-btn-main"}>
            {isEditing ? "Update" : "Add"}
          </button>
          <button onClick={clearAll} className="clear-btn">
          Clear All
        </button> 
        </div>

        <ul className="todo-list">
          {todoList.length === 0 && (
            <p className="empty-msg">✨ Nothing here yet! Add your first task.</p>
          )}
          {todoList.map((todo, index) => (
            <li key={index} className="todo-item">
              <span>{todo}</span>
              <div className="btn-group">
                <button className="update-btn" onClick={() => startUpdate(index)}>
                <FaPencilAlt size={21} color="blue" />
                </button>
                <button className="delete-btn" onClick={() => deleteTodo(index)}>
                <ImCross size={21} color="red"/>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} To-Do List App. All rights reserved. Developed by Shayan Sheikh</p>
      </footer>
    </div>
    
  );
}

export default App;
