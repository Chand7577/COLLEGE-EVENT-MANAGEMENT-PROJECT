import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditEvent from './components/EditEvent';
import Home from './pages/Home';
import Login from './pages/Login';
import Student from './pages/Student';
import Admin from './pages/Admin';
import Teacher from './pages/Teacher';
import CreateEvent from './components/CreateEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
