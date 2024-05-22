import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHeart, faShoppingCart, faHistory, faUser, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';  // Adjust the import path accordingly

import mainLogo from '../../assets/logos/mainLogo.svg';

function Aside({ activeTab, handleTabChange }) {
    const { userRole } = useAuth();

    return (
        <div className="aside-container">
            <div className="logo">
                <img src={mainLogo} alt="Logo" />
            </div>
            <div className={`tab ${activeTab === 'home' && 'active'}`} onClick={() => handleTabChange('home')}>
                <FontAwesomeIcon icon={faHome} className="fa-light" style={{ color: '#444444', marginRight: '10px' }} />
                Home
            </div>
            <div className={`tab ${activeTab === 'wishlist' && 'active'}`} onClick={() => handleTabChange('wishlist')}>
                <FontAwesomeIcon icon={faHeart} className="fa-light" style={{ color: '#444444', marginRight: '10px' }} />
                Wishlist
            </div>
            <div className={`tab ${activeTab === 'cart' && 'active'}`} onClick={() => handleTabChange('cart')}>
                <FontAwesomeIcon icon={faShoppingCart} className="fa-light" style={{ color: '#444444', marginRight: '10px' }} />
                Cart
            </div>
            <div className={`tab ${activeTab === 'profile' && 'active'}`} onClick={() => handleTabChange('profile')}>
                <FontAwesomeIcon icon={faUser} className="fa-light" style={{ color: '#444444', marginRight: '10px' }} />
                Profile
            </div>
            <div className={`tab ${activeTab === 'purchase-history' && 'active'}`} onClick={() => handleTabChange('purchase-history')}>
                <FontAwesomeIcon icon={faHistory} className="fa-light" style={{ color: '#444444', marginRight: '10px' }} />
                Purchase History
            </div>
            {userRole === 2 && (
                <div className={`tab ${activeTab === 'sellerdashboard' && 'active'}`} onClick={() => handleTabChange('sellerdashboard')}>
                    <FontAwesomeIcon icon={faTachometerAlt} className="fa-light" style={{ color: '#444444', marginRight: '10px' }} />
                    Seller Dashboard
                </div>
            )}
        </div>
    );
}

export default Aside;
