const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';

const { 
  create,
  find,
  findById,
  updateById,
  deleteById
} = require('../models/tasks');

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
  return { answer: { task: createdTask }, status: 201,
  };
};

const findTasks = async () => {
  const tasks = await find();
  if (!tasks) { return { answer: { message: 'Not Found' }, status: 404 }; }
  return { answer: tasks, status: 200 };
};

const findTaskById = async (id) => {
  const task = await findById(id);
  if (!task) { return { answer: { message: 'task not found' }, status: 404 }; }
  return { answer: task, status: 200 };
};

const updateTaskByIdService = async (id, taskOBJ) => {
  const { name, task, date, status } = taskOBJ; 

  await updateById(id, name, task, date, status);
     const updatedTask = {
        name, task, date, status, _id: id,
     }; return { answer: updatedTask, status: 200 };
};

const deleteTaskByIdService = async (id) => { 

  const { answer } = await findTaskById(id);
    await deleteById(id); 
    return { answer, status: 210 };
  };

module.exports = {
  createTask,
  findTasks,
  findTaskById,
  updateTaskByIdService,
  deleteTaskByIdService,
}