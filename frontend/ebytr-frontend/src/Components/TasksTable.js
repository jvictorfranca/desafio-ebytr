import React, { useEffect, useState } from 'react'
import { getAllTasks } from '../utils/APIOperations';
import getDateNumber from '../utils/getDateNumber';
import AddTaskBar from './AddTaskBar';
import TaskItem from './TaskItem';

function TasksTable () {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [sorted, setSorted] = useState('')
  const [updated, setUpdated] = useState(0)
  
  useEffect(async ()=> {
    setLoading(true);
    const tasks = await getAllTasks();
    await setData(tasks)
    await sortAllData()
    setLoading(false)

  },[updated, sorted])

  const setUpdatedFunction = async () => {
    setUpdated(updated+1)
  }

  const compareWords = (word1, word2) => {
    
    if (word1 < word2) {return -1}
    else if (word1 > word2) {return 1
    }else {return 0}
  }


  const sortedByDate = async () => {
    if (sorted === 'date') {
      await setSorted('descDate')
    } else if (sorted === 'descDate') {await setSorted('')
    } else {await setSorted('date')}
  }

  const sortDataByDate = async () => {
    if (sorted === 'date'){
    const newData = data.sort((a,b)=> getDateNumber(a.date)-getDateNumber(b.date))
    await setData(newData)
  } else if (sorted ==='descDate') {
    const newData = data.sort((b,a)=> getDateNumber(a.date)-getDateNumber(b.date))
    await setData(newData)
  }
} 

  const sortedByName = async () => {
    if (sorted === 'name') {
      await setSorted('descName')
    } else if (sorted === 'descName') {await setSorted('')
    } else {await setSorted('name')}
  }

  const sortDataByName = async () => {
    if (sorted === 'name'){
    const newData = data.sort((a,b)=> compareWords(a.name,b.name))
    await setData(newData)
  } else if (sorted ==='descName') {
    const newData = data.sort((b,a)=> compareWords(a.name,b.name))
    await setData(newData)
  }
} 

  const sortedByTask = async () => {
    if (sorted === 'task') {
      await setSorted('descTask')
    } else if (sorted === 'descTask') {await setSorted('')
    } else {await setSorted('task')}
  }

  const sortDataByTask = async () => {
    if (sorted === 'task'){
    const newData = data.sort((a,b)=> compareWords(a.task,b.task))
    await setData(newData)
  } else if (sorted ==='descTask') {
    const newData = data.sort((b,a)=> compareWords(a.task,b.task))
    await setData(newData)
  }
} 

  const sortedByStatus = async() => {
    if (sorted === 'status') {
      await setSorted('descStatus')
    } else if (sorted === 'descStatus') {await setSorted('')
    } else {await setSorted('status')}
  }
  
  const sortDataByStatus = async () => {
    if (sorted === 'status'){
    const newData = data.sort((a,b)=> compareWords(a.status,b.status))
    await setData(newData)
  } else if (sorted ==='descStatus') {
    const newData = data.sort((b,a)=> compareWords(a.status,b.status))
    await setData(newData)
  }
} 
  
  const sortAllData = async () => {
   await sortDataByDate();
   await sortDataByName();
   await sortDataByStatus()
   await sortDataByTask()
  }

  return loading ? <p>Loading</p> : (
  <table>
    <thead>
      <tr>
        <th>
          Funcionário
          <button onClick={()=> sortedByName()}>⇅</button>
        </th>
        <th>
          Tarefa
          <button onClick={()=> sortedByTask()}>⇅</button>
        </th>
        <th>
          Status
          <button onClick={()=> sortedByStatus()}>⇅</button>
        </th>
        <th>
          Data
          <button onClick={()=> sortedByDate()}>⇅</button>
        </th>
        <th>
          Ação
        </th>
      </tr>
    </thead>
    <tbody>
    <AddTaskBar setUpdated = {setUpdatedFunction}/>
      {data.map((task)=>  <TaskItem item={task} key={task._id} setUpdated = {setUpdatedFunction}/>
      )}
    </tbody>

  </table>)
}

export default TasksTable