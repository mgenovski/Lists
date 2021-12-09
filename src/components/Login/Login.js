import './Login.css';

const Login = () => {
    return (
        <div className="login">
            <label for="email">Email</label>
            <input type="text" id="email" name="email"></input>
            <label for="password">Password</label>
            <input type="password" id="password" name="passwors"></input>
        </div>
    );
};

export default Login;