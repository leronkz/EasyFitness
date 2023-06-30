import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router';
import Main from './views/main/Main';
function App() {
  return (
      <Routes>
          <Route path='/dashboard' element={<Main />} />
      </Routes>
  );
}

export default App;
