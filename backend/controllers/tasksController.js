const {
  createTask, 
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

module.exports = {
  createTaskController
}