const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config()

const {
   createTaskController,
   findTasksController,
   findTaskByIdController
   } = require('./controllers/tasksController');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()


app.use(bodyParser.json())

app.get('/', ( request,response ) => {

})

app.get('/tasks', findTasksController)
app.get('/tasks/:id', findTaskByIdController)

app.post('/tasks', createTaskController)

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));