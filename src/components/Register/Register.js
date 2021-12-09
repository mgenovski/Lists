import './Register.css';

const Register = () => {
    return (
        <div className="register">
                <h1>Register</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email"></input>
                </div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"></input>
                </div>
                <div>
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" id="password-confirm" name="password-confirm"></input>
                </div>
                <button className='normal'>Register</button>
        </div>
    );
};

export default Register;