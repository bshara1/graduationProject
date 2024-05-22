import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import logo from "../assets/logos/mainLogo.svg";
import Modal from 'react-modal';
const cities = [
    "Amman", "Zarqa", "Irbid", "Aqaba", "Mafraq",
    "Jerash", "Madaba", "Karak", "Tafileh", "Ma'an",
    "Ajloun", "Balqa"
];

function UpdateUserData() {
    const { id } = useParams();
    const Navigate = useNavigate();
    const { authToken } = useAuth();
    const [userData, setUserData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_location: '',
        phone_number: ''
    });
    const [originalUserData, setOriginalUserData] = useState({});
    const [isEditing, setIsEditing] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current_password: '',
        new_password: '',
        repeat_password: ''
    });
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/profilePage`, {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                });
                const data = await response.json();
                setUserData(data);
                setOriginalUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [authToken, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEditClick = (field) => {
        setIsEditing({ ...isEditing, [field]: !isEditing[field] });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const { current_password, new_password, repeat_password } = passwordData;

        // Validate passwords
        if (new_password !== repeat_password) {
            setPasswordError('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/updatePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ userPassword: current_password, newPassword: new_password }),
            });

            if (response.ok) {
                setModalIsOpen(false);
                setPasswordData({
                    current_password: '',
                    new_password: '',
                });
            } else {
                console.error('Error updating password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (userData.user_name !== originalUserData.user_name) {
            formData.append('user_name', userData.user_name);
        } else {
            formData.append('user_name', originalUserData.user_name);
        }
        if (userData.user_location !== originalUserData.user_location) {
            formData.append('user_location', userData.user_location);
        } else {
            formData.append('user_location', originalUserData.user_location);
        }
        if (userData.phone_number !== originalUserData.phone_number) {
            formData.append('phone_number', userData.phone_number);
        } else {
            formData.append('phone_number', originalUserData.phone_number);
        }
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            const response = await fetch(`http://localhost:8080/updateUser`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
                body: formData,
            });

            if (response.ok) {
                navigate('/profile');
            } else {
                console.error('Error updating user data');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <div className='backg d-flex flex-column p-5 g-5'>
            <div className='d-flex dash-header' >
                <img src={logo} alt="Logo" onClick={() => Navigate('/')} />
            </div>
            <div className="update-user-container ">
                <h2>Update Profile Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <div className="editable-field">
                            {isEditing.user_name ? (
                                <input
                                    type="text"
                                    name="user_name"
                                    value={userData.user_name}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{userData.user_name}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('user_name')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <div className="editable-field">
                            <span>{userData.user_email}</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <div className="editable-field">
                            <span>**********</span>
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => setModalIsOpen(true)} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <div className="editable-field">
                            {isEditing.phone_number ? (
                                <input
                                    type="text"
                                    name="phone_number"
                                    value={userData.phone_number}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{userData.phone_number}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('phone_number')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <div className="editable-field">
                            {isEditing.user_location ? (
                                <select
                                    name="user_location"
                                    value={userData.user_location}
                                    onChange={handleInputChange}
                                >
                                    {cities.map(city => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span>{userData.user_location}</span>
                            )}
                            <FontAwesomeIcon icon={faThumbtack} onClick={() => handleEditClick('user_location')} />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Profile Image</label>
                        <input type="file" name="image" onChange={handleFileChange} />
                    </div>

                    <button className='update-user-data-btn' type="submit">Update</button>
                </form>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Change Password"
                    className="password-modal"
                >
                    <h2>Change Password</h2>
                    <form onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label>Current Password</label>
                            <input
                                type="password"
                                name="current_password"
                                value={passwordData.current_password}
                                onChange={(e) => setPasswordData({ ...passwordData, current_password: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input
                                type="password"
                                name="new_password"
                                value={passwordData.new_password}
                                onChange={(e) => setPasswordData({ ...passwordData, new_password: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Repeat New Password</label>
                            <input
                                type="password"
                                name="repeat_password"
                                value={passwordData.repeat_password}
                                onChange={(e) => setPasswordData({ ...passwordData, repeat_password: e.target.value })}
                            />
                        </div>
                        {passwordError && <p className="error-message">{passwordError}</p>}
                        <button type="submit">Update Password</button>
                        <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}

export default UpdateUserData;
