const backendURL = 'http://localhost:3001'

export const getAllTasks = async () => {
  let tasks = await fetch(`${backendURL}/tasks`)
  tasks = await tasks.json()

  return tasks
}

export const editATask = async(id, inputOBJ) =>{
  const {name, status, task, date} = inputOBJ

  const body = JSON.stringify({
    name, status, task, date
  })
  const url = `${backendURL}/tasks/${id}`
  const response = await fetch(url, {method: 'POST', body})
  return response
}

export const removeATask = async(id) =>{
  const url = `${backendURL}/tasks/${id}`
  let response = await fetch(url, {method: 'DELETE'})
  response = await response.json()
  console.log(url)
  console.log(response)
  return response
}