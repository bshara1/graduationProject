import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';

function Header() {
    const { authToken, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/allProducts');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        const filtered = products.filter(product =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);

    const handleLogout = () => {
        logout();
    };

    const handleInputChange = event => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="header-container">
            <div className="search-box">
                <input type="text" placeholder="Explore Our World Search..." value={searchQuery} onChange={handleInputChange} />
                {searchQuery && (
                    <div className="search-results">
                        {filteredProducts.map(product => (
                            <Link to={`/ProductDetails/${product._id}`}>
                                <div key={product._id} className="search-result-item">
                                    <div className='search-data'>
                                    <img src={product.img_url}></img>
                                        <h3>{product.product_name}</h3>
                                        <p>${product.price}</p>
                                        <p>{product.product_category.category_name}</p>
                                    </div>
                                    <div className='search-data-tags'>

                                        <p>{product.product_location}</p>
                                        <p>{product.shop_name}</p>
                                    </div>

                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
            <div className="login-button">
                {authToken ? (
                    <button className="logout-btn" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="user-icon" />
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <FontAwesomeIcon icon={faUser} className="user-icon" />
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
