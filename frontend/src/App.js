import './App.css';
import {Routes, Route} from 'react-router';
import Main from './views/main/Main';
import Profile from './views/profile/Profile';
import Settings from './views/settings/Settings';
import Login from './views/login/Login';
import Register from './views/register/Register';
function App() {
  return (
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Register />} />
          <Route path='/dashboard' element={<Main />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />
      </Routes>
  );
}

export default App;
