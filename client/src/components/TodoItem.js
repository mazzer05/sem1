import React from 'react';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const TodoItem = ({ todo, onEdit, onDelete }) => {
  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return 'Без срока';
    return format(new Date(dateString), 'd MMMM yyyy, HH:mm', { locale: ru });
  };

  // Иконки для статусов
  const statusIcons = {
    'новая': '🆕',
    'в процессе': '⏳',
    'завершена': '✅'
  };

  return (
    <div className="todo-item">
      {/* Основная информация */}
      <div className="main-info">
        <span className="status-icon">{statusIcons[todo.status]}</span>
        <div className="text-content">
          <h3 className="todo-text">{todo.text}</h3>
          <div className="meta-info">
            <span className={`status ${todo.status.replace(' ', '-')}`}>
              {todo.status}
            </span>
            <span className="due-date">⏰ {formatDate(todo.dueDate)}</span>
            {todo.reminder && <span className="reminder">🔔 Напоминание</span>}
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="additional-info">
        {todo.tags?.length > 0 && (
          <div className="tags-container">
            {todo.tags.map((tag, index) => (
              <span key={index} className="tag">
                #{tag.trim()}
              </span>
            ))}
          </div>
        )}

        {todo.collaborators?.length > 0 && (
          <div className="collaborators">
            👥 {todo.collaborators.join(', ')}
          </div>
        )}
      </div>

      {/* Кнопки управления */}
      <div className="actions">
        <button 
          onClick={onEdit}
          className="edit-button"
          aria-label="Редактировать"
        >
          ✏️
        </button>
        <button 
          onClick={onDelete}
          className="delete-button"
          aria-label="Удалить"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TodoItem;

