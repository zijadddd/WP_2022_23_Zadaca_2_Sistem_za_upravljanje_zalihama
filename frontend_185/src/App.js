import './css/App.css';
import './helpers/AuthContext';
import Login from './Login';
import Home from './Home';
import Nav from './layout/Nav';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from './helpers/AuthContext';

function App() {
    const [authState, setAuthState] = useState({
        id: 0,
        username: '',
        role: '',
        isLoggedIn: false,
    });
    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            <div className="App">
                <Router>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<Login />} />
                    </Routes>
                    <Routes>
                        <Route path="/home" element={<Home />} />
                    </Routes>
                    <Routes>
                        <Route path="/employees" element={<Home />} />
                    </Routes>
                    <Routes>
                        <Route path="/rawmaterials" element={<Home />} />
                    </Routes>
                    <Routes>
                        <Route path="/suppliers" element={<Home />} />
                    </Routes>
                </Router>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
