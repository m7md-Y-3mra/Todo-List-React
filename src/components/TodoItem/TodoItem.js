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
    <div className="todo-item">
      <div className="todo-item_check">
        <input type="checkbox" id={myTodo.id} checked={myTodo.completed} />
        <label htmlFor={myTodo.id} onClick={(e) => handleTodoClick(myTodo.id)}>
          <span>{myTodo.todoLabel}</span>
        </label>
      </div>
      <div className="btns">
        <button onClick={(e) => handleDeleteClick(myTodo.id)}>
          {<Delete />}
        </button>
        <button onClick={(e) => setEdittingTodo(myTodo)}>{<Edit />}</button>
      </div>
    </div>
  );
}
