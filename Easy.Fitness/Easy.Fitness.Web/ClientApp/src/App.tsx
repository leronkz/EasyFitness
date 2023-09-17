import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Account from './pages/Account/Account';
import { Routes, Route } from 'react-router';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index path="/" element={ <Login /> } />
      <Route path="/register" element={ <SignUp /> } />
      <Route path="/dashboard" element={ <Dashboard /> } />
      <Route path="/settings" element={ <Settings /> } />
      <Route path="/account" element={ <Account /> } />
    </Routes>
  );
}

export default App;
