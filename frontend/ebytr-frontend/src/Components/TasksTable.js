import React, { useEffect, useState } from 'react'
import { getAllTasks } from '../utils/APIOperations';
import TaskItem from './TaskItem';

function TasksTable () {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  useEffect(async ()=> {
    setLoading(true);
    const tasks = await getAllTasks();
    await setData(tasks)
    setLoading(false)

  },[])
  return loading ? <p>Loading</p> : (
  <table>
    <thead>
      <tr>
        <th>Funcionário</th>
        <th>Tarefa</th>
        <th>Status</th>
        <th>Data</th>
        <th>Editar/Remover</th>
      </tr>
    </thead>
    <tbody>

      {data.map((task)=>  <TaskItem item={task} key={task._id}/>
      )}
    </tbody>

  </table>)
}

export default TasksTable