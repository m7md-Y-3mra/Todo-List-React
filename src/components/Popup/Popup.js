import { useState } from "react";
import "./Popup.css";
import { Close } from "@mui/icons-material";
export default function Popup({ setEdittingTodo, handleOkClick }) {
  const [newTodoLable, setNewTodoLable] = useState("");
  return (
    <div className="popup">
      <div className="header">
        <h3>Edit the todo</h3>
        <Close onClick={(e) => setEdittingTodo(null)} />
      </div>
      <div className="body">
        <input
          onChange={(e) => setNewTodoLable(e.target.value)}
          placeholder="Edit the todo ..."
        />
        <div className="popup-btns">
          <button
            onClick={(e) => {
              handleOkClick(newTodoLable);
              setEdittingTodo(null);
            }}
          >
            OK
          </button>
          <button onClick={(e) => setEdittingTodo(null)}>Close</button>
        </div>
      </div>
    </div>
  );
}
