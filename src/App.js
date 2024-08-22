import { useCallback, useEffect, useState } from "react";
import TodoItem from "./components/TodoItem/TodoItem";
import Popup from "./components/Popup/Popup";
import "./App.css";
import ToggleButton from "./components/ToggleButton/ToggleButton";

let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const setToLocalStorage = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
function App() {
  const [todos, setTodos] = useState(getFromLocalStorage("todos") || []);
  const [status, setStatus] = useState("all");
  const [todoLabel, setTodoLabel] = useState("");
  const [edittingTodo, setEdittingTodo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    getFromLocalStorage("theme") || false
  );
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [isNewUser, setIsNewUser] = useState(
    getFromLocalStorage("newUser") ?? true
  );
  // for edit popup input
  const [editedTodoText, setEditedTodoText] = useState("");
  const [isEditInputEmpty, setIsEditInputEmpty] = useState(false);

  useEffect(() => {
    setToLocalStorage("todos", todos);
  }, [todos]);

  useEffect(() => {
    setToLocalStorage("theme", isDarkMode);
  }, [isDarkMode]);

  const completedTodos = todos.filter((todo) => todo.completed);
  const notCompletedTodos = todos.filter((todo) => !todo.completed);

  const filterTodosByStatus = useCallback(() => {
    switch (status) {
      case "completed":
        return todos.filter((todo) => todo.completed);
      case "notCompleted":
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [status, todos]);

  const handleAddTodo = useCallback(() => {
    if (todoLabel.trim() !== "") {
      const newTodo = {
        id: nextId++,
        label: todoLabel.trim(),
        completed: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setIsEmptyInput(false);
      setTodoLabel("");
      setToLocalStorage("nextId", nextId);
      return;
    }
    setIsEmptyInput(true);
  }, [todoLabel]);

  const handleDeleteTodo = useCallback(
    (todoId) => {
      const updatedTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(updatedTodos);
    },
    [todos]
  );

  const handleUpdateTodo = useCallback(
    (updatedLabel) => {
      const updatedTodos = todos.map((todo) =>
        todo.id === edittingTodo.id ? { ...todo, label: updatedLabel } : todo
      );
      setTodos(updatedTodos);
    },
    [todos, edittingTodo]
  );

  function handleCloseClick() {
    setEdittingTodo(null);
  }

  function handleOkClick(updatedLabel) {
    if (updatedLabel.trim() === "") {
      return true;
    }
    handleUpdateTodo(updatedLabel);
    setEdittingTodo(null);
    return false;
  }

  const handleToggleTodoCompletion = useCallback((id) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  function handleClearCompletedClick() {
    setTodos(notCompletedTodos);
  }

  function handleCloseEditClick() {
    setIsNewUser(false);
    setToLocalStorage("newUser", false);
  }

  const renderTodosList = useCallback(
    () =>
      todos &&
      filterTodosByStatus().map((todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={(e) => {
              setEdittingTodo(todo);
              setEditedTodoText(todo.label);
            }}
            onDelete={handleDeleteTodo}
            onToggleCompletion={handleToggleTodoCompletion}
          />
        );
      }),
    [handleDeleteTodo, handleToggleTodoCompletion, filterTodosByStatus, todos]
  );
  return (
    <div className={`app ${isDarkMode ? `dark-mode` : ``}`}>
      <div className="background">
        <div className="circle-top"></div>
        <div className="circle-middle"></div>
        <div className="circle-right"></div>
        <div className="circle-bottom"></div>
      </div>
      <div className="overlay"> </div>
      <div className="app-container">
        <div className="header-section">
          <div className="header-content">
            <h1 className="header-title">Todo List</h1>
            <ToggleButton setDarkMode={setIsDarkMode} darkMode={isDarkMode} />
          </div>
          <div className="header-form">
            <input
              type="text"
              placeholder="what to do?"
              value={todoLabel}
              onChange={(e) => {
                setTodoLabel(e.target.value);
                setIsEmptyInput(false);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              className={isEmptyInput ? "error" : ""}
            />
            <button onClick={handleAddTodo}>Add</button>
          </div>
        </div>
        <div className="todo-list-section">
          <div className="filter-buttons">
            {["all", "completed", "notCompleted"].map((filterStatus) => (
              <button
                key={filterStatus}
                className={status === filterStatus ? "active" : ""}
                onClick={() => setStatus(filterStatus)}
              >
                {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              </button>
            ))}
          </div>
          {todos.length > 0 ? (
            <div className="todo-list ">{renderTodosList()}</div>
          ) : (
            <div className="empty-todo-list"> No todos</div>
          )}
          <div className="todo-list-footer">
            <span>
              <span>{todos.length}</span> todos
            </span>
            <span>
              <span>{completedTodos.length}</span> completed
            </span>
            <button onClick={handleClearCompletedClick}>clear completed</button>
          </div>
        </div>
      </div>

      <div className={edittingTodo ? "popup-container" : ""}>
        {edittingTodo && (
          <Popup
            onClose={handleCloseClick}
            header="Edit todo"
            className="edit-popup"
          >
            <div className="body">
              <input
                onChange={(e) => {
                  setEditedTodoText(e.target.value);
                  setIsEditInputEmpty(false);
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  setIsEditInputEmpty(handleOkClick(editedTodoText))
                }
                placeholder="Edit the todo ..."
                value={editedTodoText}
                className={isEditInputEmpty ? "error" : ""}
              />
              <div className="popup-btns">
                <button
                  onClick={(e) =>
                    setIsEditInputEmpty(handleOkClick(editedTodoText))
                  }
                >
                  OK
                </button>
                <button onClick={handleCloseClick}>Close</button>
              </div>
            </div>
          </Popup>
        )}
      </div>

      <div className={isNewUser ? "popup-container" : ""}>
        {isNewUser && (
          <Popup
            onClose={handleCloseEditClick}
            header="App Features"
            className="features-popup"
          >
            <div className="body">
              <ul>
                <li data-num="1">Add tasks</li>
                <li data-num="2">Delete tasks</li>
                <li data-num="3">Edit tasks</li>
                <li data-num="4">Mark tasks as completed</li>
                <li data-num="5">Filter tasks</li>
                <li data-num="6">Dark/Light Mode</li>
                <li data-num="7">Persistent Data</li>
                <li data-num="8">Clear Completed Tasks</li>
              </ul>
              <div className="popup-btns">
                <button onClick={handleCloseEditClick}>Close</button>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
}

export default App;
