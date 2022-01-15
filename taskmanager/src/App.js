import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import TaskList from './Components/TaskList';
import NewTask from './Components/NewTask';
import TopBar from './Components/TopBar';
import Time from './Components/Time';
import Calendarfunc from './Components/Calendarfunc';
import Menu from './Components/Menu';
import { apiHost } from './Components/const';

async function fetchData(setTask) {
  const res = await fetch(`${apiHost}`)
  const { task } = await res.json()
  setTask(task)
  console.log(task)
}

async function fetchSetData(task) {
  await fetch(apiHost, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({task})
  })
}

function App() {
  const [task, setTask] = useState([]);
  const submittingStatus = useRef(false)

  useEffect(() => {
    if(!submittingStatus.current) {
      return
    }
      fetchSetData(task)
      .then(data => submittingStatus.current = false)
  }, [task])

  useEffect(() => {
      fetchData(setTask)
  }, [])

  return (
    <div>
      {/* <Menu /> */}
        {/* <Link to="/">HOME</Link> */}
        {/* <Link to="/newTask">New Task</Link>
        <Link to="/taskList">Task List</Link>
      <Link to="/calendar">Calendar</Link> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Menu />
              <Time />
              <TopBar />
              <NewTask addTask={setTask} submittingStatus={submittingStatus} />
              <TaskList taskList={task} deleteTask={setTask} submittingStatus={submittingStatus} />
            </>
          } />

          <Route path="/taskList/:id" element={<TaskList taskList={task} />} />

          <Route path="/calendar" element={<Calendarfunc />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
