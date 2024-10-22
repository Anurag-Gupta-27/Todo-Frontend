import Task from './Task'

function TaskList({ tasks, updateTask, deleteTask }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {tasks.map(task => (
        <Task 
          key={task.id}
          task={task}
          updateTask={updateTask}
          deleteTask={deleteTask}
        />
      ))}
      <div 
        className="p-4 rounded-md shadow-md bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200"
        onClick={() => document.querySelector('input').focus()}
      >
        <span className="text-4xl text-gray-400">+</span>
      </div>
    </div>
  )
}

export default TaskList