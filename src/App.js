import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem/TodoItem";
import Popup from "./components/Popup/Popup";
import "./App.css";
import ToggleButton from "./components/ToggleButton/ToggleButton";
import FeaturesPopup from "./components/FeaturesPopup/FeaturesPopup";

const oldTodoes = localStorage.getItem("todoes");
const theme = localStorage.getItem("theme");
const newUser = localStorage.getItem("newUser");
let nextId = JSON.parse(localStorage.getItem("nextId")) || 0;
function App() {
  const [todoes, setTodoes] = useState(JSON.parse(oldTodoes) || []);
  const [status, setStatus] = useState("all");
  const [todoLabel, setTodoLabel] = useState("");
  const [edittingTodo, setEdittingTodo] = useState(null);
  const [darkMode, setDarkMode] = useState(JSON.parse(theme) || false);
  const [isEmptyInput, setIsEmptyInput] = useState(false);
  const [isNewUser, setIsNewUser] = useState(JSON.parse(newUser) ?? true);
  // for input
  const [newTodoLabel, setNewTodoLabel] = useState("");
  const [isEmptyEditInput, setIsEmptyEditInput] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoes", JSON.stringify(todoes));
  }, [todoes]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const completedTodoes = todoes.filter((todo) => todo.completed);
  const notCompletedTodoes = todoes.filter((todo) => !todo.completed);
  const AllTodoes = [...todoes];

  function handleAddClick() {
    if (todoLabel) {
      setTodoes([
        ...todoes,
        { id: nextId++, todoLabel: todoLabel, completed: false },
      ]);
      setIsEmptyInput(false);
      setTodoLabel("");
      localStorage.setItem("nextId", JSON.stringify(nextId));
      return;
    }
    setIsEmptyInput(true);
  }

  function handleDeleteClick(id) {
    const newTodoes = todoes.filter((todo) => todo.id !== id);
    setTodoes(newTodoes);
  }

  function handleEditClick(updatedTodo) {
    const newTodoes = todoes.map((todo) => {
      if (todo.id === edittingTodo.id) {
        todo.todoLabel = updatedTodo;
      }
      return todo;
    });
    setTodoes(newTodoes);
  }

  function handleCloseClick() {
    setEdittingTodo(null);
  }

  function handleOkClick(updatedTodo) {
    if (updatedTodo === "") {
      return true;
    }
    handleEditClick(updatedTodo);
    setEdittingTodo(null);
    return false;
  }

  function handleTodoClick(id) {
    setTodoes(
      (prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      // .sort((a, b) => a.completed - b.completed)
    );
  }

  function handleChangeInput(e) {
    setTodoLabel(e.target.value);
    setIsEmptyInput(false);
  }

  function handleClearCompletedClick() {
    setTodoes(notCompletedTodoes);
  }

  function handleCloseEditClick() {
    setIsNewUser(false);
    localStorage.setItem("newUser", false);
  }

  function renderTodoes(specficTodoes) {
    return specficTodoes.map((todo) => {
      return (
        <TodoItem
          key={todo.id}
          myTodo={todo}
          setEdittingTodo={setEdittingTodo}
          handleDeleteClick={handleDeleteClick}
          handleTodoClick={handleTodoClick}
        />
      );
    });
  }
  return (
    <div className={`app ${darkMode ? `dark-mode` : ``}`}>
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
            <ToggleButton setDarkMode={setDarkMode} darkMode={darkMode} />
          </div>
          <div className="header-form">
            <input
              type="text"
              placeholder="what to do?"
              value={todoLabel}
              onChange={handleChangeInput}
              onKeyDown={(e) => e.key === "Enter" && handleAddClick(e)}
              className={isEmptyInput ? "error" : ""}

              // pattern="[A-Za-z0-9]{1,20}"
              // required
            />
            <button onClick={handleAddClick}>Add</button>
          </div>
        </div>
        <div className="todo-list-section">
          <div className="filter-buttons">
            <button
              className={status === "all" ? "active" : ""}
              onClick={(e) => setStatus("all")}
            >
              All
            </button>
            <button
              className={status === "completed" ? "active" : null}
              onClick={(e) => setStatus("completed")}
            >
              Completed
            </button>
            <button
              className={status === "notCompleted" ? "active" : null}
              onClick={(e) => setStatus("notCompleted")}
            >
              Not Completed
            </button>
          </div>
          {todoes.length !== 0 ? (
            <div className="todo-list ">
              {renderTodoes(
                status === "completed"
                  ? completedTodoes
                  : status === "notCompleted"
                  ? notCompletedTodoes
                  : AllTodoes
              )}
            </div>
          ) : (
            <div className="empty-todo-list">Don't have any todoes</div>
          )}
          <div className="todo-list-footer">
            <span>
              <span>{todoes.length}</span> todoes
            </span>
            <span>
              <span>{completedTodoes.length}</span> completed
            </span>
            <button onClick={handleClearCompletedClick}>clear completed</button>
          </div>
        </div>
      </div>

      <div className={edittingTodo ? "popup-container" : ""}>
        {edittingTodo && (
          <Popup
            handleCloseClick={handleCloseClick}
            header="Edit todo"
            className="edit-popup"
          >
            <div className="body">
              <input
                onChange={(e) => {
                  setNewTodoLabel(e.target.value);
                  setIsEmptyEditInput(false);
                }}
                placeholder="Edit the todo ..."
                value={newTodoLabel}
                className={isEmptyEditInput ? "error" : ""}
              />
              <div className="popup-btns">
                <button
                  onClick={(e) =>
                    setIsEmptyEditInput(handleOkClick(newTodoLabel))
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
            handleCloseClick={handleCloseEditClick}
            header="App Features"
            className="features-popup"
          >
            <div className="body">
              <ul>
                <li data-num="1">Add tasks</li>
                <li data-num="2">Delete tasks</li>
                <li data-num="3">Edit tasks</li>
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
