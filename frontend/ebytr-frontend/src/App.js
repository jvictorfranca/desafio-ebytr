import './App.css';
import React from 'react';
import EbytrHeader from './Components/Header';
import TasksTable from './Components/TasksTable';

function App() {
  return (
    <main>
      <EbytrHeader/>
      <TasksTable/>
    </main>
  );
}

export default App;
