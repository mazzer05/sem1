import React, { useState } from 'react';

const ThemeToggle = ({ toggleTheme }) => {
  const [isRotated, setIsRotated] = useState(false);

  const handleClick = () => {
    setIsRotated(!isRotated);
    toggleTheme();
  };

  return (
    <button 
      style={{ 
        display: 'flex', 
        margin: 'auto',
        marginBottom: '50px',
        marginTop: '50px',
        
        flexDirection: 'column', 
        justifyContent: 'center', 
      }} 
      className="Theme" 
      onClick={handleClick} 
    >
      Toggle Theme
    </button>
  );
};

export default ThemeToggle;