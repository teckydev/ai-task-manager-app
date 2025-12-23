import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskList from './components/TaskList';
import EditTaskForm from './components/EditTaskForm';
import CreateTaskPage from './components/CreateTask';

function App() {

  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<CreateTaskPage />} />
           <Route path="/tasks" element={<TaskList />} />
           <Route path="/edit-task/:id" element={<EditTaskForm />} />

      </Routes>
    </BrowserRouter> 
    
    </>
  )
}

export default App
