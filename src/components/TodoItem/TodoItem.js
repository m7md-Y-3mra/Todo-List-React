import "./TodoItem.css";
import { Delete, Edit } from "@mui/icons-material";
export default function TodoItem({
  todo,
  onDelete,
  onEdit,
  onToggleCompletion,
}) {
  return (
    <div className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" id={todo.id} defaultChecked={todo.completed} />
        <label htmlFor={todo.id} onClick={(e) => onToggleCompletion(todo.id)}>
          <span>{todo.label}</span>
        </label>
      </div>
      <div className="todo-actions">
        <button onClick={(e) => onDelete(todo.id)}>{<Delete />}</button>
        <button onClick={(e) => onEdit(todo)}>{<Edit />}</button>
      </div>
    </div>
  );
}
