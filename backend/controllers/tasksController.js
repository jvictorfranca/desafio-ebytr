const {
  createTask,
  findTasks,
  findTaskById,
  updateTaskByIdService,
  deleteTaskByIdService, 
 } = require('../services/tasksService');

const createTaskController = async (req, res, next) => {
 try {
   const answerObject = await createTask(
     req.body.name, req.body.task, req.body.date, req.body.status,
     );
   return res.status(answerObject.status).json(answerObject.answer);
 } catch (err) {
   console.error(err);
   next(err);
 }
};

const findTasksController = async (_req, res, next) => {
  try {
 const answerObject = await findTasks();
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};


const findTaskByIdController = async (req, res, next) => {
  try {
 const { id } = req.params;
  const answerObject = await findTaskById(id);
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

const updateTaskByIdController = async (req, res, next) => {
  try {
 const { id } = req.params;
  const taskOBJ = req.body;
  
  const answerObject = await updateTaskByIdService( 
    id, taskOBJ
    );
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

const deleteTaskByIdController = async (req, res, next) => {
  try {
 const { id } = req.params;
  
  const answerObject = await deleteTaskByIdService( 
    id, req.tokenData,
    );
  return res.status(answerObject.status).json(answerObject.answer);
} catch (err) {
  console.error(err.answer.message);
  next(err);
}
};

module.exports = {
  createTaskController,
  findTasksController,
  findTaskByIdController,
  updateTaskByIdController,
  deleteTaskByIdController
}