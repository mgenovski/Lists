import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
    const { user } = useAuthContext();

    let guestNavigation = (
        <span>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </span>
    );

    let userNavigation = (
        <span>
            <Link className="button" to="/my-lists">My Lists</Link>
            <Link className="button" to="/create">Create List</Link>
            <Link className="button" to="/logout">Logout</Link>
        </span>
    );

    return (
        <header>
            <div className="logo">
                <Link to="/">LISTS</Link>
                <span>A SoftUni React Project</span>
            </div>
            <nav>
                <Link to="/all-lists">All lists</Link>
                {user.email
                    ? userNavigation
                    : guestNavigation
                }
            </nav>
        </header>
    );
};

export default Header;