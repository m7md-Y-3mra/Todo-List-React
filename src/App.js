import { useState } from "react";
import TodoItem from "./components/TodoItem/TodoItem";
import Popup from "./components/Popup/Popup";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import "./App.css";

let nextId = 0;
function App() {
  const [todoes, setTodoes] = useState([]);
  const [status, setStatus] = useState("all");
  const [todoLabel, setTodoLabel] = useState("");
  const [edittingTodo, setEdittingTodo] = useState(null);

  const completedTodoes = todoes.filter((todo) => todo.completed);
  const notCompletedTodoes = todoes.filter((todo) => !todo.completed);
  const AllTodoes = [...todoes];

  function handleAddClick() {
    setTodoes([
      ...todoes,
      { id: nextId++, todoLabel: todoLabel, completed: false },
    ]);
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

  function handleTodoClick(id) {
    const newTodoes = todoes.map((todo) => {
      if (todo.id === id) {
        console.log(todo);
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodoes(newTodoes);
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
    <div className="App">
      <div class="bubble pink-bubble"></div>
      <div class="bubble blue-bubble"></div>
      <div class="bubble small-p-bubble"></div>
      <div className="container">
        <div class="bubble small-b-bubble"></div>
        <div className="header">
          <h1 data-shadow="Todo List">Todo List</h1>
          <DarkModeIcon />
        </div>
        <div className="form">
          <input
            type="text"
            value={todoLabel}
            onChange={(e) => setTodoLabel(e.target.value)}
          />
          <button onClick={handleAddClick}>Add</button>
        </div>
        <div className="todoes">
          {renderTodoes(
            status === "completed"
              ? completedTodoes
              : status === "notCompleted"
              ? notCompletedTodoes
              : AllTodoes
          )}
        </div>
        <div className="footer">
          <button
            className={status === "all" ? "active" : null}
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
      </div>
      <div className={edittingTodo ? "popup-container" : null}>
        {edittingTodo && (
          <Popup
            handleOkClick={handleEditClick}
            myTodo={edittingTodo}
            todoes={todoes}
            setTodoes={setTodoes}
            setEdittingTodo={setEdittingTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;
