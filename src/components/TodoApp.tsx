// src/TodoApp.tsx
import React, { useState } from 'react';
import { TodoList } from './TodoList';

interface item {
    id: number;
    text: string;
    completed: boolean;
  }

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<item[]>([]);
  const [text, setText] = useState<string>('');

  const handleAdd = () => {
    if (text.trim() !== '') {
      const newTodo: item = {
        id: Date.now(),
        text,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setText('');
    }else{
        alert("Please enter a task first!!")
    }
  };


  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleEdit = (id: number, newText: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  return (
    <div className='main-container'>
      <h1>To Do List</h1>
      <TodoList todos={todos} onDelete={handleDelete} onEdit={handleEdit}/>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TodoApp;
