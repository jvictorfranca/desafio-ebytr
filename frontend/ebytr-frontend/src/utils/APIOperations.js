const backendURL = 'http://localhost:3001'

export const getAllTasks = async () => {
  let tasks = await fetch(`${backendURL}/tasks`)
  tasks = await tasks.json()

  return tasks
}

export const editATask = async(id, inputOBJ) =>{
  const {name, status, task, date} = inputOBJ
  const body = {
    name, status, task, date
  }
  const url = `${backendURL}/tasks/${id}`
  const response = await (await fetch(url, {
    method: 'PUT', headers: {
    'Content-Type': 'application/json',
    },
     body: JSON.stringify(body)})).json()
  return response
}

export const removeATask = async(id) =>{
  const url = `${backendURL}/tasks/${id}`
  let response = await fetch(url, {method: 'DELETE'})
  response = await response.json()
  return response
}

export const createATask = async(inputOBJ) =>{
  const {name, status, task, date} = inputOBJ
  const body = {
    name, status, task, date
  }
  const url = `${backendURL}/tasks`
  const response = await (await fetch(url, {
    method: 'POST', headers: {
    'Content-Type': 'application/json',
    },
     body: JSON.stringify(body)})).json()
  return response
}