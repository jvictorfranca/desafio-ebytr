const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';

const { create } = require('../models/tasks');

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

module.exports = {
  createTask
}