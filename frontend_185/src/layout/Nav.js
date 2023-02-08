import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const { authState, setAuthState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {}, [authState]);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setAuthState({
            id: 0,
            username: '',
            role: '',
            isLoggedIn: false,
        });
        navigate('/');
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {authState.isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <p className="nav-link text-dark">
                                        {authState.username} - {authState.role}
                                    </p>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active text-dark"
                                        aria-current="page"
                                        to="/employees"
                                    >
                                        Employees
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active text-dark"
                                        aria-current="page"
                                        to="/rawmaterials"
                                    >
                                        Raw Materials
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className="nav-link active text-dark"
                                        aria-current="page"
                                        to="/suppliers"
                                    >
                                        Suppliers
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <p className="nav-link text-dark">
                                        You need to sign in
                                    </p>
                                </li>
                            </>
                        )}
                    </ul>
                    {authState.isLoggedIn ? (
                        <form class="d-flex">
                            <button
                                class="btn btn-primary"
                                type="submit"
                                onClick={logout}
                            >
                                Sign out
                            </button>
                        </form>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
