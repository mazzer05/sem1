const Todo = require('../models/Todo');

exports.getAllTodos = async (req, res) => {
  try {
    console.log('Fetching todos for user:', req.userId);
    const todos = await Todo.find({ user: req.userId });
    console.log('Found todos:', todos);
    res.json(todos);
  } catch (error) {
    console.error('Error in getAllTodos:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    console.log('Creating todo with data:', req.body);
    console.log('User ID:', req.userId);
    
    const { text, status, dueDate, tags, reminder } = req.body;
    const newTodo = new Todo({
      text,
      status,
      dueDate,
      tags,
      reminder,
      user: req.userId
    });
    
    console.log('New todo object:', newTodo);
    const savedTodo = await newTodo.save();
    console.log('Todo saved successfully:', savedTodo);
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error('Error in createTodo:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    console.log('Updating todo:', req.params.id);
    console.log('Update data:', req.body);
    console.log('User ID:', req.userId);
    
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    
    if (!updatedTodo) {
      console.log('Todo not found or user not authorized');
      return res.status(404).json({ message: 'Todo not found or user not authorized' });
    }
    
    console.log('Updated todo:', updatedTodo);
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error in updateTodo:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    console.log('Deleting todo:', req.params.id);
    console.log('User ID:', req.userId);
    
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    
    if (!deletedTodo) {
      console.log('Todo not found or user not authorized');
      return res.status(404).json({ message: 'Todo not found or user not authorized' });
    }
    
    console.log('Todo deleted successfully:', deletedTodo);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error in deleteTodo:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};