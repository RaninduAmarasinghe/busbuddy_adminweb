import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Companyregister from './pages/Companyregister';
import Companymanagement from './pages/Companymanagement';
import Supportinbox from './pages/Supportinbox';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="Company/register" element={<Companyregister />} />
        <Route path="Company/management" element={<Companymanagement />} />
        <Route path="/support/inbox" element={<Supportinbox />} />
      </Routes>
    </Router>
  );
}

export default App;
