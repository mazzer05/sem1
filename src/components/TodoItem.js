import React from 'react';

const TodoItem = ({ todo, onEdit, onDelete }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0' }}>
      <span>{todo.text}</span>
      <button 
        className="edit-button" 
        onClick={onEdit}
        style={{ marginRight: '10px' }} // Отступ справа для кнопки Edit
      >
        Edit
      </button>
      <button className="delete-button" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;