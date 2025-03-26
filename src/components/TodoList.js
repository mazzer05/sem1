import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, addTodo, editTodo, deleteTodo } from '../redux/actions';
import TodoItem from './TodoItem';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const [newTodoText, setNewTodoText] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAdd = () => {
    if (!newTodoText.trim()) return;
    
    const newTodo = {
      text: newTodoText,
      completed: false
    };
    dispatch(addTodo(newTodo));
    setNewTodoText('');
  };

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setNewTodoText(todo.text);
  };

  const handleUpdate = () => {
    if (!newTodoText.trim()) return;
    
    const updatedTodo = {
      id: editingId,
      text: newTodoText,
      completed: todos.find(todo => todo.id === editingId)?.completed || false
    };
    dispatch(editTodo(updatedTodo));
    setNewTodoText('');
    setEditingId(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={editingId ? handleUpdate : handleAdd}>
        {editingId ? 'Update Task' : 'Add Task'}
      </button>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={() => handleEdit(todo)}
            onDelete={() => handleDelete(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;