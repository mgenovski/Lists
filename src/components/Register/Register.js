import { useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import { useAlert } from 'react-alert';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const alert = useAlert();

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');
        let name = formData.get('name');
        let passwordConfirm = formData.get('password-confirm');

        if (password !== passwordConfirm) {
            alert.show("Passwords do not match!");
            return;
        }

        if (email === '' || password === '' || name === '') {
            alert.show("All fields are required!");
            return;
        }

        if(!email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            alert.show('Please enter a valid email.');
            return;
        }

        authService.register(email, password, name)
            .then(authData => {
                login(authData);
                navigate('/my-lists');
            })
            .catch(err => alert.show(err));
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={registerSubmitHandler}>
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
            </form>
        </div>
    );
};

export default Register;