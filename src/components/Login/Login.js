import './Login.css';

const Login = () => {
    return (
        <div className="login">
            <div className='login-wrapper'>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder='peter@abv.bg'></input>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="passwors" placeholder='123456'></input>
                <button className='normal'>Login</button>
            </div>
        </div>
    );
};

export default Login;