/* eslint-disable no-undef */
const frisby = require('frisby');
const { MongoClient } = require('mongodb');
const mockedtasks = require('./mockedtasks');
require('dotenv').config();

const mongoDbUrl = `mongodb://${process.env.HOST || 'mongodb'}:27017/ebytrDB`;
const url = 'http://localhost:3001';

describe('1- Endpoint para criar uma nova task', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('ebytrDB');
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
    const tasks = mockedtasks
    await db.collection('tasks').insertMany(tasks);
  });
  afterAll(async () => {
    await connection.close();
  });

  it('Valida se é possível criar task com sucesso', async () => {
    await frisby
      .post(`${url}/tasks/`,
        {
          name: 'Pikachu',
          task: 'Choque do trovao',
          date: '30/01/2007',
          status: 'Aguardando review'
        })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.task.name).toBe('Pikachu');
        expect(result.task.task).toBe('Choque do trovao');
        expect(result.task.date).toBe('30/01/2007');
        expect(result.task.status).toBe('Aguardando review');
      });
  })


  it('Valida se não é possível criar task sem "name"', async () => {
    await frisby
      .post(`${url}/tasks/`,
        {
          task: 'Choque do trovao',
          date: '30/01/2007',
          status: 'Aguardando review'
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  })

  it('Valida se não é possível criar task sem "task"', async () => {
    await frisby
      .post(`${url}/tasks/`,
        {
          name: 'Pikachu',
          date: '30/01/2007',
          status: 'Aguardando review'
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  })

  it('Valida se não é possível criar task sem "date"', async () => {
    await frisby
      .post(`${url}/tasks/`,
        {
          task: 'Choque do trovao',
          name: 'Pikachu',
          status:'Aguardando review'
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  })

  it('Valida se não é possível criar task sem "status"', async () => {
    await frisby
      .post(`${url}/tasks/`,
        {
          task: 'Choque do trovao',
          name: 'Pikachu',
          date: '30/01/2007',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Invalid entries. Try again.');
      });
  })

})

describe('2- Endpoint para listar todas as tasks', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('ebytrDB');
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
    const tasks = mockedtasks
    await db.collection('tasks').insertMany(tasks);
  });
  afterAll(async () => {
    await connection.close();
  });

  it('Valida se é possível listar tasks com sucesso', async () => {
    await frisby
      .get(`${url}/tasks/`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result[0].name).toBe('Naruto');
        expect(result[1].name).toBe('Goku');
      });
  })
})


describe('2- Endpoint para listar uma task específica', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('ebytrDB');
  });

  beforeEach(async () => {
    await db.collection('tasks').deleteMany({});
    const tasks = mockedtasks
    await db.collection('tasks').insertMany(tasks);
  });
  afterAll(async () => {
    await connection.close();
  });

  it('Valida se é possível listar uma task específica com sucesso', async () => {
    let resultTask;
    await frisby
      .post(`${url}/tasks`, {
        name: 'Pikachu',
        task: 'Choque do trovao',
        date: '30/01/2007',
        status: 'Aguardando review'
      })
      .expect('status', 201)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        resultTask = result.task._id            
          });
        await frisby
          .get(`${url}/tasks/${resultTask}`)
          .expect('status', 200)
          .then((response) => {
            const { body } = response;
            const result = JSON.parse(body);
            expect(result).toHaveProperty('_id');
            expect(result.name).toBe('Pikachu');
            expect(result.task).toBe('Choque do trovao');
            expect(result.date).toBe('30/01/2007');
            expect(result.status).toBe('Aguardando review');
      });
  })
})
