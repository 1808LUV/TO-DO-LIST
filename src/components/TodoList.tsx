import React, { useState } from "react";

interface item {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoProps {
  todos: item[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export const TodoList: React.FC<TodoProps> = ({ todos, onDelete, onEdit }) => {
  const [editableId, setEditableId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState<string>("");

  const handleEditStart = (id: number, text: string) => {
    setEditableId(id);
    setEditedText(text);
  };

  const handleEditCancel = () => {
    setEditableId(null);
    setEditedText("");
  };

  const handleEditSave = (id: number) => {
    if (editedText.trim() !== "") {
      onEdit(id, editedText);
      setEditableId(null);
      setEditedText("");
    }else{
        alert("Please enter something");
    }
  };
  return (
    <div>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editableId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="inputedit"
                />
                <button
                  onClick={() => handleEditSave(todo.id)}
                  style={{ marginLeft: 10 }}
                >
                  Save
                </button>
                <button
                  onClick={handleEditCancel}
                  style={{
                    background: "tomato",
                    marginLeft: 10,
                    marginRight: 10,
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button 
                onClick={() => handleEditStart(todo.id, todo.text)}
                style={{
                    background: "yellow",
                    marginLeft: 10,
                    marginRight: 10,
                }}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  style={{
                    background: "tomato",
                    marginRight: 10,
                  }}
                >
                  Delete
                </button>

              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
