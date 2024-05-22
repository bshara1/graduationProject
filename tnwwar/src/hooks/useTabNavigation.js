// useTabNavigation.js

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function useTabNavigation() {
    const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    // cahnge the active tab
    useState(() => {
        const path = location.pathname.substring(1);
        setActiveTab(path || 'home'); 
    }, [location.pathname]); 

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        switch (tab) {
            case 'home':
                navigate('/');
                break;
            case 'wishlist':
                navigate('/wishlist');
                break;
            case 'cart':
                navigate('/cart');
                break;
            case 'purchase-history':
                navigate('/purchase-history'); 
                break;
            case 'add-product':
                navigate('/add-product'); 
                break;
            case 'profile':
                navigate('/profile');
                break;
            case 'sellerdashboard':
                navigate('/sellerdashboard');
                break;
            default:
                break;
        }
    };

    return { activeTab, handleTabChange };
}

export default useTabNavigation;
