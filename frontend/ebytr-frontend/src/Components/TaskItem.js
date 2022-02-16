import React from 'react';

function TaskItem (item) {
  const { _id, name, status, task, date} = item.item
  console.log(_id)
  return (
    <tr>
      <td>{name}</td>
      <td>{task}</td>
      <td>{status}</td>
      <td>{date}</td>
      <td>
        <button>editar</button>
        <button>remover</button>
      </td>
    </tr>
  )
}

export default TaskItem