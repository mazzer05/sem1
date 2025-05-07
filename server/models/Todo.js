const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Todo text is required'],
    trim: true
  },
  status: { 
    type: String, 
    enum: ['новая', 'в процессе', 'завершена'],
    default: 'новая'
  },
  dueDate: { 
    type: Date,
    default: null
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'User ID is required']
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Add index for faster queries
TodoSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Todo', TodoSchema);