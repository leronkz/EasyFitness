import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import Account from './pages/Account/Account';
import { Routes, Route } from 'react-router';
import './App.css';
import ProtectedRoute from './security/ProtectedRoute';
import Activity from './pages/Activity/Activity';
import { Suspense } from 'react';
import Loading from './components/Loading';
import Schedule from './pages/Schedule/Schedule';
import Diet from './pages/Diet/Diet';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/diet" element={<Diet />} />
      </Routes>
    </Suspense>
  );
}

export default App;
