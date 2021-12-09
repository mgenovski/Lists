import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <Link to="/">LISTS</Link>
                <span>A SoftUni React Project</span>
            </div>
            <nav>
                <Link to="/all-lists">All lists</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </header>
    );
};

export default Header;