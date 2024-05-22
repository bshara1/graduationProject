// SignupSeller.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/logos/mainLogo.svg";
import AccountReviewModal from '../components/signup/AccountReviewModal';

function SignupSeller() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [location, setLocation] = useState('');
    const [commercialRecord, setCommercialRecord] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [repeatPasswordError, setRepeatPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [commercialRecordError, setCommercialRecordError] = useState('');
    const [generalError, setGeneralError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);

    const navigate = useNavigate();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const jordanCities = ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Madaba', 'Salt', 'Karak', 'Maan', 'Tafila', 'Jerash', 'Mafraq', 'Ajloun'];

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setEmailError('Invalid email format');
        } else {
            setEmailError('');
        }
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);

        if (!phoneRegex.test(value)) {
            setPhoneNumberError('Invalid phone number format');
        } else {
            setPhoneNumberError('');
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

    const handleCommercialRecordChange = (e) => {
        const file = e.target.files[0];
        setCommercialRecord(file);

        if (file) {
            if (file.type !== 'application/pdf') {
                setCommercialRecordError('Commercial record must be a PDF file');
            } else {
                setCommercialRecordError('');
            }
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!username || !email || !password || !repeatPassword || !phoneNumber || !location || !commercialRecord) {
            setGeneralError('Please fill in all fields');
            return;
        }

        if (emailError || phoneNumberError || passwordError || repeatPasswordError || commercialRecordError) {
            setGeneralError('Please correct the errors before submitting.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('user_name', username);
            formData.append('user_email', email);
            formData.append('password', password);
            formData.append('phone_number', phoneNumber);
            formData.append('user_location', location);
            formData.append('image', commercialRecord);

            const response = await fetch('http://localhost:8080/sellerSignUp', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setSignupSuccess(true); // Set signup success state to true
                navigate('/login');
            } else {
                setGeneralError(data.error || 'Sign-up failed. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            setGeneralError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className='signup_container'>
            <div className='signup_inner'>
                <img src={logo} alt="logo"></img>
                <h1>Create Seller Account</h1>
                <form className='signup_form' onSubmit={handleSignup}>
                    <div className='signup_input_group'>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            placeholder='Enter your username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
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
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input
                            type='text'
                            id='phoneNumber'
                            placeholder='Enter your phone number'
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                        {phoneNumberError && <p style={{ color: 'red' }}>{phoneNumberError}</p>}
                    </div>

                    <div className='signup_input_group'>
                        <label htmlFor='location'>Location</label>
                        <select
                            id='location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Select your location</option>
                            {jordanCities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                        {locationError && <p style={{ color: 'red' }}>{locationError}</p>}
                    </div>

                    <div className='signup_input_group'>
                        <label htmlFor='commercialRecord'>Commercial Record (PDF only)</label>
                        <input
                            type='file'
                            id='commercialRecord'
                            accept='.pdf'
                            onChange={handleCommercialRecordChange}
                        />
                        {commercialRecordError && <p style={{ color: 'red' }}>{commercialRecordError}</p>}
                    </div>
                    <button type='submit' className='signup_button'>Create Account</button>
                </form>

                {generalError && <p style={{ color: 'red' }}>{generalError}</p>}
                {signupSuccess && (
                    <>
                        <p style={{ color: 'green' }}>Sign-up successful! Your account is under review.</p>
                        <AccountReviewModal isOpen={signupSuccess} />
                    </>
                )}

                <div className='signup_divider'>_________ Already have an account? _________</div>
                <div className='signup_extra_buttons'>
                    <Link className='signup_login_button' to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}

export default SignupSeller;
