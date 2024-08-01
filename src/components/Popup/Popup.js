import { useState } from "react";
import "./Popup.css";
import { Close } from "@mui/icons-material";
export default function Popup({
  handleCloseClick,
  header,
  className,
  children,
}) {
  console.log(className);
  return (
    <div className={`popup ${className}`}>
      <div className="header">
        <h3>{header}</h3>
        <Close onClick={handleCloseClick} />
      </div>
      {children}
      {/* <div className="body">
        <input
          onChange={(e) => {
            setNewTodoLabel(e.target.value);
            setIsEmptyInput(false);
          }}
          placeholder="Edit the todo ..."
          value={newTodoLabel}
          className={isEmptyInput ? "error" : ""}
        />
        <div className="popup-btns">
          <button onClick={(e) => setIsEmptyInput(handleOkClick(newTodoLabel))}>
            OK
          </button>
          <button onClick={handleCloseClick}>Close</button>
        </div>
      </div> */}
    </div>
  );
}
