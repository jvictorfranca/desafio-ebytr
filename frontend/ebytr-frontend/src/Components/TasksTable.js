import React, { useEffect, useState } from 'react'
import { getAllTasks } from '../utils/APIOperations';
import TaskItem from './TaskItem';

function TasksTable () {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [updated, setUpdated] = useState(0)
  useEffect(async ()=> {
    setLoading(true);
    const tasks = await getAllTasks();
    await setData(tasks)
    setLoading(false)

  },[updated])

  const setUpdatedFunction = async () => {
    setUpdated(updated+1)
  }
  return loading ? <p>Loading</p> : (
  <table>
    <thead>
      <tr>
        <th>Funcionário</th>
        <th>Tarefa</th>
        <th>Status</th>
        <th>Data</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tbody>

      {data.map((task)=>  <TaskItem item={task} key={task._id} setUpdated = {setUpdatedFunction}/>
      )}
    </tbody>

  </table>)
}

export default TasksTable