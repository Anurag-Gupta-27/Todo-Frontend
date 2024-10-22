import axios from 'axios'
import { useState, useEffect } from 'react'

function Task({ task, updateTask, deleteTask }) {
    const [isGenerating, setIsGenerating] = useState(false)
    const [tasks, setTasks] = useState([])

    const toggleTask = () => {
      updateTask({ ...task, completed: !task.completed })
    }
  
    const generateDescription = async () => {
      setIsGenerating(true)
      try {
        // Make API call to generate description
        const response = await axios.post('http://localhost:3000/generate-description', { task: task.text })
        console.log(response.data);
        // Extract the description from the response data
        const description = response.data.reminder || response.data.description || '';
        // Update the task with the new description from the server
        updateTask({ ...task, description: description })
      } catch (error) {
        console.error('Error generating description:', error)
        if(error.response.status === 500) {
          updateTask({ ...task, description: 'Error generating description. Candidate was Blocked due to safety reasons.' })
        }
        // Optionally, you can set an error message in the task state
        // updateTask({ ...task, description: 'Error generating description. Please try again.' })
      } finally {
        setIsGenerating(false)
      }
    }
  
    return (
      <div 
        className={`p-4 rounded-md shadow-md flex flex-col justify-between`}
        style={{ backgroundColor: task.completed ? '#f3f4f6' : task.color }}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-lg font-medium ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {task.text}
            </span>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={toggleTask}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mt-2 mb-4 text-left">{task.description}</p>
          )}
        </div>
        <div className="flex justify-between mt-4 mb-2">
          {!task.description && !isGenerating && (
            <button
              onClick={generateDescription}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Generate Description
            </button>
          )}
          {isGenerating && (
            <button
              disabled
              className="px-3 py-1 bg-gray-400 text-white text-sm rounded-md cursor-not-allowed"
            >
              Generating...
            </button>
          )}
          <button
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete
          </button>
        </div>
        
        {/* Render fetched tasks */}
        <div className="mt-4">
          <ul>
            {tasks.map(fetchedTask => (
              <li key={fetchedTask._id} className="mb-1">
                {fetchedTask.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  
export default Task;
