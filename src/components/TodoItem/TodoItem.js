import { useState } from "react";
import "./TodoItem.css";
import { Delete, Edit } from "@mui/icons-material";
export default function TodoItem({
  myTodo,
  handleDeleteClick,
  setEdittingTodo,
  handleTodoClick,
}) {
  return (
    <div className="todo-item-container">
      <div className="todo-item">
        <input
          type="checkbox"
          id={myTodo.id}
          defaultChecked={myTodo.completed}
        />
        <label htmlFor={myTodo.id} onClick={(e) => handleTodoClick(myTodo.id)}>
          <span>{myTodo.todoLabel}</span>
        </label>
      </div>
      <div className="todo-actions">
        <button onClick={(e) => handleDeleteClick(myTodo.id)}>
          {<Delete />}
        </button>
        <button onClick={(e) => setEdittingTodo(myTodo)}>{<Edit />}</button>
      </div>
    </div>
  );
}
