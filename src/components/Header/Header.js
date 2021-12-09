import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">
                <a href="/">LISTS</a>
                &nbsp;A SoftUni React Project
            </div>
            <nav>
                <a href="/">All lists</a>
                <a href="/login">Login</a>
                <a href="/">Register</a>
            </nav>
        </header>
    );
};

export default Header;