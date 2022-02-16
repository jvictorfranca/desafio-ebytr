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



module.exports = {
  create,
};