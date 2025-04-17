import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Companyregister from './pages/Companyregister';
import Companymanagement from './pages/Companymanagement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Company/register" element={<Companyregister />} />
        <Route path="Company/management" element={<Companymanagement />} />
      </Routes>
    </Router>
  );
}

export default App;
