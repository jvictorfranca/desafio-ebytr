const connect = require('./connection');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

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

const findById = async (id) => {
  const conn = await connect();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null; 
}
  const task = await conn.collection('tasks').findOne(ObjectId(id));
  if (!task) return null;
  return task;
};

module.exports = {
  create,
  find,
  findById
};