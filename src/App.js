import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Welcome from './components/Welcome/Welcome.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Logout from './components/Logout/Logout.js';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/*" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
