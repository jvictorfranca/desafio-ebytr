const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';

const { create, find } = require('../models/tasks');

const errorObjectCreator = (status, message) => ({
  status,
  answer: { message,
   },
});


const checkValid = (name, task, date, status) => {
  if (!name) { return true; }
  if (!task) { return true; }
  if (!date) { return true; }
  if(!status) { return true }
  return false;
};

const createTask = async (name, task, date, status) => {
  if (checkValid(name, task, date, status)) {
 throw errorObjectCreator(400, INVALID_ENTRIES_MESSAGE);
}
const createdId = await create(name, task, date, status);
  const createdTask = {
    _id: createdId, name, task, date, status,
  };
  return { answer: { recipe: createdTask }, status: 201,
  };
};

const findTasks = async () => {
  const tasks = await find();
  if (!tasks) { return { answer: { message: 'Not Found' }, status: 404 }; }
  return { answer: tasks, status: 200 };
};


module.exports = {
  createTask,
  findTasks
}