import React, {  useState } from 'react';
import { editATask, removeATask } from '../utils/APIOperations';
import TaskFieldText from './TaskFieldText';
import TaskSelectText from './TaskSelectText';

function TaskItem (item) {
  const { _id, name, status, task, date} = item.item
  const {setUpdated} = item
  const [inputName, setName] = useState(name)
  const [inputStatus, setStatus] = useState(status)
  const [inputTask, setTask] = useState(task)
  const [inputDate, setDate] = useState(date)
  const [isEditing, setEditing] = useState(false)

  
  const changeAndUpdate = async(value)=> {
    const newOBJ = {...editedObj, status: value}
    await editATask(_id, newOBJ)
    await setUpdated()

  }

  const deleteItem = async () => {
    await removeATask(_id)
    await setUpdated()
  }

  const editedObj = {
    
      name: inputName, status:inputStatus, task:inputTask, date:inputDate
    
  }

  const editItem = async () => {
    await editATask(_id, editedObj)
    await setUpdated()
  } 

  const cancelEditing = async () => {
    setEditing(!isEditing)
    await setUpdated()
  }

  const tdClassname = isEditing ? 'editing' : ''

  return (
    <tr>
      <td className={tdClassname}>
        <TaskFieldText text={name} inputText={inputName} setText={setName} editing={isEditing}/>
      </td>
      <td className={tdClassname}>
      <TaskFieldText text={task} inputText={inputTask} setText={setTask} editing={isEditing}/>
      </td>
      <td className={tdClassname}>
      <TaskSelectText inputText={inputStatus} editing={isEditing} setText={setStatus} editFunction = {changeAndUpdate}/>
      </td>
      <td className={tdClassname}>
      <TaskFieldText text={date} inputText={inputDate} setText={setDate} editing={isEditing}/>
      </td>
      {isEditing 
      ? <td className={`action editing`}>
        <button className='green' onClick={async ()=> {editItem()}}>confirmar</button>
        <button className='red' onClick={()=> cancelEditing()}>cancelar</button>
        </td>
      : <td className='action'>
        <button className='green' onClick={()=> {setEditing(!isEditing)}}>editar</button>
        <button className='red' onClick={async ()=> {deleteItem()}}>remover</button>
      </td>}
    </tr>
  )
}

export default TaskItem