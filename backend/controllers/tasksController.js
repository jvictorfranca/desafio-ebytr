const {
  createTask, findTasks, 
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

module.exports = {
  createTaskController,
  findTasksController
}