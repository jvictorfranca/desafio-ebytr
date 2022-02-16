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

const updateById = async (id, name, task, date, status) => {
  const conn = await connect();
  const { insertedId } = await
   conn.collection('tasks')
   .updateOne({ _id: ObjectId(id) }, { $set: { name, task, date, status } });
  return insertedId;
};

const deleteById = async (id) => {
  const conn = await connect();
  const { insertedId } = await
   conn.collection('tasks')
   .deleteOne({ _id: ObjectId(id) });
  return insertedId;
};

module.exports = {
  create,
  find,
  findById,
  updateById,
  deleteById
};