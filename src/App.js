import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Companyregister from './pages/Companyregister';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="Company/register" element={<Companyregister />} />
      </Routes>
    </Router>
  );
}

export default App;
