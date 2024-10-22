import { useState, useRef } from 'react'
import axios from 'axios'

function TaskForm({ addTask }) {
  const [newTask, setNewTask] = useState('')
  const inputRef = useRef(null)

  const generatePastelColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 100%, 87%)`
  }

  const handleSubmit = async () => {
    if (newTask.trim() !== '') {
      addTask({ 
        id: Date.now(), 
        text: newTask, 
        description: '',
        completed: false,
        color: generatePastelColor()
      })
      setNewTask('')
    }

    try {
      const response = await axios.post('http://localhost:3000/add-task', { 
        text: newTask,
        completed: false,
        description: '',
        color: generatePastelColor() // Implement this function to generate a color
      });
      console.log(response.data);
      addTask(response.data); // Make sure to update your local state
    } catch (error) { 
      console.error('Error adding task:', error);
    }
  }

  return (
    <div className="mb-6 flex space-x-2">
      <input
        ref={inputRef}
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Task
      </button>
    </div>
  )
}

export default TaskForm