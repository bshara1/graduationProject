import React, { useState, useEffect } from 'react';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from '../components/header/header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';


function Profile() {
  const { activeTab, handleTabChange } = useTabNavigation();
  const { authToken } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8080/profilePage', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, [authToken]);

  const handleUpdateClick = () => {
    navigate(`/updateUser`);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
        <div className="col-sm-10">
          <Header />
          <div className="content">
            <h2>Profile Information</h2>
            {profileData ? (
              <div className="profile-info">
                <img src={profileData.profile_img} alt="Profile" className="profile-img" />
                <div className="profile-details">
                  <h3>{profileData.user_name}</h3>
                  <p><strong>Email:</strong> {profileData.user_email}</p>
                  <p><strong>Password:</strong> **************</p>
                  <p><strong>Location:</strong> {profileData.user_location}</p>
                  {profileData.user_role === 2 && (
                    <p><strong>Commercial Record:</strong> {profileData.Commercial_Record}</p>
                  )}
                  <p><strong>Phone Number:</strong> {profileData.phone_number}</p>
                </div>
                <button className="update-button" onClick={handleUpdateClick}>
                  <FontAwesomeIcon icon={faThumbtack} /> Edit
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
