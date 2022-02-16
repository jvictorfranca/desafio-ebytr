import React, { useState } from 'react';
import { createATask } from '../utils/APIOperations';

function AddTaskBar (item) {
  const {setUpdated} = item
  const [inputName, setName] = useState('')
  const [inputStatus, setStatus] = useState('Pendente')
  const [inputTask, setTask] = useState('')
  const [inputDate, setDate] = useState('')

  const taskOBJ = {
    name: inputName,
    status: inputStatus,
    task: inputTask,
    date: inputDate
  }

  const createNewTask = async () => {
    await createATask(taskOBJ)
    await setUpdated()
    setName('')
    setTask('')
    setDate('')
    setStatus('Pendente')
  }
  return (
    <tr>
      <td>
        <input type='text' value={inputName} onChange={(e)=> setName(e.target.value)} />
      </td>
      <td>
      <input type='text' value={inputTask} onChange={(e)=> setTask(e.target.value)} />
      </td>
      <td>
      <select value = {inputStatus} onChange={(e)=> setStatus(e.target.value)}>
        <option value='Pendente'>Pendente</option>
        <option value='Em andamento'>Em andamento</option>
        <option value='Pronto'>Pronto</option>
      </select>
      </td>
      <td>
      <input type='text' value={inputDate} onChange={(e)=> setDate(e.target.value)} />
      </td>
      <td className='action'>
        <button className='green' onClick={()=> createNewTask()}>Add</button>
      </td>
    </tr>
  )
}

export default AddTaskBar