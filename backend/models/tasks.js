const connect = require('./connection');

const create = async (name, task, date, status) => {
  const conn = await connect();
  const { insertedId } = await conn.collection('tasks').insertOne({ 
    name,
    task,
    date,
    status,
   });
  return insertedId;
};

const find = async () => {
  const conn = await connect();
  const tasks = await conn.collection('tasks').find({ }).toArray();
  if (!tasks) return null;
  return tasks;
};

module.exports = {
  create,
  find
};