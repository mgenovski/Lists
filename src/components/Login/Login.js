import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

import { useAuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import './Login.css';

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const alert = useAlert();

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        if (email === '' || password === '') {
            alert.show("All fields are required!");
            return;
        }

        authService.login(email, password)
            .then((authData) => {
                login(authData);

                navigate('/my-lists');
            })
            .catch(err => alert.show(err));
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