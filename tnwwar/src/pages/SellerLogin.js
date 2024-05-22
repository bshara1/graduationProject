import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from "../assets/logos/mainLogo.svg";

function SellerLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (emailError) {
            setGeneralError('Please correct the errors before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/sellerLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.is_deleted) {
                    setGeneralError('Your account may not be active yet.');
                } else {
                    // Login successful
                    await login(data.accessToken);
                    setLoginSuccess('Login successful!');
                    setGeneralError('');
                    navigate('/sellerdashboard'); 
                }
            } else {
                // Login failed
                setGeneralError(data.error || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setGeneralError('An unexpected error occurred. Please try again.');
        }
    };


    return (
        <div className='signin_container'>
            <div className='signin_inner'>
                <img src={logo} alt="Logo" />
                <h1>Seller Login</h1>
                <form className='signin_form' onSubmit={handleLogin}>
                    <div className='signin_input_group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            placeholder='Enter your email'
                            value={email}
                            onChange={handleEmailChange}
                        />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </div>

                    <div className='signin_input_group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>

                    <button type='submit' className='signin_button'>Login</button>
                </form>

                {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
                {loginSuccess && <p style={{ color: 'green' }}>{loginSuccess}</p>}

                <a href='#' className='signin_forgot_password'>Forgot password?</a>
                <div className='signin_divider'>_________ New to Tnwar _________</div>
                <div className='signin_extra_buttons'>
                    <Link className='signin_create_account_button' to="/signupuser">Create New Tnwar Account</Link>
                    <Link className='signin_create_seller_button' to="/signupseller">Create New Seller Account</Link>
                </div>
                <p>If you are not a seller, please <Link to="/login">login here</Link>.</p>
            </div>
        </div>
    );
}

export default SellerLogin;
