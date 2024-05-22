import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "../assets/logos/mainLogo.svg";

function Signup() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [generalError, setGeneralError] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (!passwordRegex.test(value)) {
            setPasswordError('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character');
        } else {
            setPasswordError('');
        }

        if (value !== repeatPassword) {
            setRepeatPasswordError('Passwords do not match');
        } else {
            setRepeatPasswordError('');
        }
    };

    const handleRepeatPasswordChange = (e) => {
        const value = e.target.value;
        setRepeatPassword(value);

        if (value !== password) {
            setRepeatPasswordError('Passwords do not match');
        } else {
            setRepeatPasswordError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (emailError || passwordError || repeatPasswordError || !selectedLocation) {
            setGeneralError('Please correct the errors before submitting.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/userLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_name: userName,
                    user_email: email,
                    password: password,
                    phone_number: phoneNumber,
                    user_location: selectedLocation,
                }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                const errorData = await response.json();
                setGeneralError('Signup failed. Please try again.');
                if (errorData.password) {
                    setPasswordError(errorData.password);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setGeneralError('An unexpected error occurred. Please try again.');
        }
    };

    const jordanCities = ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Madaba', 'Karak', 'Maan', 'Salt', 'Tafilah', 'Jerash'];

    return (
        <div className='signup_container'>
            <div className='signup_inner'>
                <img src={logo} alt="Logo" />
                <h1>Signup</h1>
                <form className='signup_form' onSubmit={handleSubmit}>
                    <div className='signup_input_group'>
                        <label htmlFor='user_name'>Full Name</label>
                        <input
                            type='text'
                            id='user_name'
                            placeholder='Enter your full name'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>

                    <div className='signup_input_group'>
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

                    <div className='signup_input_group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            placeholder='Enter your password'
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>

                    <div className='signup_input_group'>
                        <label htmlFor='repeatPassword'>Repeat Password</label>
                        <input
                            type='password'
                            id='repeatPassword'
                            placeholder='Repeat your password'
                            value={repeatPassword}
                            onChange={handleRepeatPasswordChange}
                        />
                        {repeatPasswordError && <p style={{ color: 'red' }}>{repeatPasswordError}</p>}
                    </div>

                    <div className='signup_input_group'>
                        <label htmlFor='phone_number'>Phone Number</label>
                        <input
                            type='text'
                            id='phone_number'
                            placeholder='Enter your phone number'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className='signup_input_group'>
                        <label htmlFor='user_location'>Location</label>
                        <select
                            id='user_location'
                            value={selectedLocation}
                            onChange={(e) => setSelectedLocation(e.target.value)}
                        >
                            <option value='' disabled>Select your location</option>
                            {jordanCities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    {generalError && <p style={{ color: 'red' }}>{generalError}</p>}

                    <button type='submit' className='signup_button'>Signup</button>
                </form>

                <p>
                    Already have an account?{' '}
                    <Link to="/login">Sign In!</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
