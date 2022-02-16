const backendURL = 'http://localhost:3001'

export const getAllTasks = async () => {
  let tasks = await fetch(`${backendURL}/tasks`)
  tasks = await tasks.json()

  return tasks
}

