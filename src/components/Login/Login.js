import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

import * as authService from '../../services/authService';
import './Login.css';

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        authService.login(email, password)
            .then((authData) => {
                login(authData);

                navigate('/');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form onSubmit={onLoginHandler} method="POST">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Ex. peter@abv.bg..."></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Ex. 123456..."></input>
                </div>
                <button className='normal'>Login</button>
            </form>
        </div>
    );
};

export default Login;