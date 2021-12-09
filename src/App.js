import { Routes, Route } from 'react-router-dom';

import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Welcome from './components/Welcome/Welcome.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/*" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
