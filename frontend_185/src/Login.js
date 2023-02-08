import './css/Login.css';
import axios from 'axios';
import { useState, useContext } from 'react';
import { AuthContext } from './helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [usernameState, setUsernameState] = useState('');
    const [passwordState, setPasswordState] = useState('');
    const { setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleUsername = (event) => {
        setUsernameState(event.target.value);
    };

    const handlePassword = (event) => {
        setPasswordState(event.target.value);
    };

    const login = async (event) => {
        event.preventDefault();
        let data = {
            username: usernameState,
            password: passwordState,
        };
        axios
            .post('http://localhost:3001/api/auth/login', data)
            .then((response) => {
                let responseData = response.data;
                localStorage.setItem('accessToken', responseData.accessToken);
                setAuthState({
                    id: responseData.id,
                    username: responseData.username,
                    role: responseData.role,
                    isLoggedIn: true,
                });
                navigate('/home');
            })
            .catch((error) => {
                alert(error);
            });
    };
    return (
        <>
            <h1>Sign in</h1>
            <div className="mainDiv">
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label for="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            aria-describedby="emailHelp"
                            onChange={handleUsername}
                        />
                        <div id="emailHelp" className="form-text">
                            We'll never share your email with anyone else.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            onChange={handlePassword}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Sign in
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
