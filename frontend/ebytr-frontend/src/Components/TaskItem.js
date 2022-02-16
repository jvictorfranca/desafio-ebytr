import React, { useState } from 'react';
import { removeATask } from '../utils/APIOperations';
import TaskFieldText from './TaskFieldText';

function TaskItem (item) {
  const { _id, name, status, task, date} = item.item
  const {setUpdated} = item
  const [inputName, setName] = useState(name)
  const [inputStatus, setStatus] = useState(status)
  const [inputTask, setTask] = useState(task)
  const [inputDate, setDate] = useState(date)
  const [isEditing, setEditing] = useState(false)

  const deleteItem = async () => {
    await removeATask(_id)
    await setUpdated(true)
  }

  console.log(_id)
  return (
    <tr>
      <td>
        <TaskFieldText text={name} inputText={inputName} setText={setName} editing={isEditing}/>
      </td>
      <td>
      <TaskFieldText text={task} inputText={inputTask} setText={setTask} editing={isEditing}/>
      </td>
      <td>
      <TaskFieldText text={status} inputText={inputStatus} setText={setStatus} editing={isEditing}/>
      </td>
      <td>
      <TaskFieldText text={date} inputText={inputDate} setText={setDate} editing={isEditing}/>
      </td>
      <td>
        <button onClick={()=> setEditing(!isEditing)}>editar</button>
        <button onClick={async ()=> {deleteItem()}}>remover</button>
      </td>
    </tr>
  )
}

export default TaskItem