import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

function App() {
  const [tasks, setTasks] = useState([])

  const addTask = (newTask) => {
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Todo Application</h1>
          <TaskForm addTask={addTask} />
          <TaskList 
            tasks={tasks} 
            updateTask={updateTask} 
            deleteTask={deleteTask} 
          />
        </div>
      </div>
    </div>
  )
}

export default App
