import { useNavigate } from 'react-router';

import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const registerSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');
        let name = formData.get('name');
        let passwordConfirm = formData.get('password-confirm');

        //TODO Validation
        if(password===passwordConfirm && email!=='' && password!=='' && name!=='') {
        authService.register(email, password, name)   
            .then(authData => {
                login(authData);
                
                navigate('/');
            });
        } else {
            console.log('All fields are required!');
            //TODO add notification
        }
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