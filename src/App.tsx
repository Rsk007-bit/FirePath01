import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ExpensesPage } from './pages/ExpensesPage';
import { RiskPage } from './pages/RiskPage';
import { SimulationPage } from './pages/SimulationPage';
import { UserProfileDashboard } from './pages/UserProfileDashboard';
import { ArticlesPage } from './pages/ArticlesPage';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<UserProfileDashboard />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/risk" element={<RiskPage />} />
          <Route path="/simulation" element={<SimulationPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
