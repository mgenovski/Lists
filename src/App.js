import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer/Footer.js';
import Header from './components/Header/Header.js';
import Welcome from './components/Welcome/Welcome.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Logout from './components/Logout/Logout.js';
import Create from './components/Create/Create.js';
import AllLists from './components/AllLists/AllLists.js';
import MyLists from './components/MyLists/MyLists.js';
import Details from './components/Details/Details.js';

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
            <Route path="/create" element={<Create />} />
            <Route path="/all-lists" element={<AllLists />} />
            <Route path="/my-lists" element={<MyLists />} />
            <Route path="/details/:listId" element={<Details />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
