import React from "react";
import "./style.css";
import Checkbox from '@material-ui/core/Checkbox';
import { Tooltip } from '@material-ui/core';

export default function TodoList({ todos, toggleTodoStatus, handletodoStatusChange }) {
  return (
    <div>
      {todos.todos.map(todo => {
        return (
          todo.title && (
            <div key={todo.todo_id} className="todoListWrapper">
              <span onClick={() => toggleTodoStatus(todo)}>
                Mark as {todo.current_status === "Done" ? "Inprogress" : "Done"}
              </span>
              <Tooltip title={todo.current_status === "Done" ? "Select if Done" : "Deselect if not Done"}>
                <Checkbox
                  checked={todo.current_status === "Done"}
                  onChange={() => handletodoStatusChange(!(todo.current_status === "Done"), todo.todo_id)}
                  name="checkedB"
                  color="primary"
                />
              </Tooltip>
              <br />
              <label><b>{"Title: "}</b>{todo.title}</label>
              <br />
              <span><b>{"Status : "}</b>{todo.current_status}</span>
            </div>
          )
        );
      })}
    </div>
  );
}
