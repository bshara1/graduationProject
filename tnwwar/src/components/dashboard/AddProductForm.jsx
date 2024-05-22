import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path accordingly

function AddProductForm({ onClose }) {
    const { authToken } = useAuth(); // Use the authToken from the AuthContext
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [productCount, setProductCount] = useState('');
    const [image, setImage] = useState(null);
    const [productLocation, setProductLocation] = useState('');
    const [shopName, setShopName] = useState('');
    const [categories, setCategories] = useState([]);
    const [cities] = useState(["Amman", "Aqaba", "Irbid", "Zarqa", "Madaba", "Salt", "Jerash", "Karak", "Tafilah", "Ma'an", "Ajloun"]);
    const [category, setCategory] = useState(''); // Define category state variable

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/getCategory');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('An error occurred while fetching categories:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('product_count', productCount);
        formData.append('image', image);
        formData.append('product_location', productLocation);
        formData.append('shop_name', shopName);
        formData.append('product_category', category);

        try {
            const response = await fetch('http://localhost:8080/addProduct', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`, 
                },
                body: formData,
            });

            if (response.ok) {
                onClose();
            } else {
                console.error('Failed to add product');
            }
        } catch (error) {
            console.error('An error occurred while adding product:', error);
        }
    };

    return (
        <div>
            <div className="overlay"></div>
            <div className="add-product-popup">
                <h3>Add New Product</h3>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <label htmlFor="productName">Product Name</label>
                    <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    <label htmlFor="price">Price</label>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    <label htmlFor="productCount">Product Count</label>
                    <input type="number" id="productCount" value={productCount} onChange={(e) => setProductCount(e.target.value)} required />
                    <label htmlFor="image">Image</label>
                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} required />
                    <label htmlFor="productLocation">Product Location</label>
                    <select id="productLocation" value={productLocation} onChange={(e) => setProductLocation(e.target.value)} required>
                        <option value="">Select Location</option>
                        {cities.map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                    <label htmlFor="category">Category</label>
                    <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.category_name}>{category.category_name}</option>
                        ))}
                    </select>
                    <label htmlFor="shopName">Shop Name</label>
                    <input type="text" id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} required />
                    <div className="button-group">
                        <button type="submit" className="add-buttons">Add Product</button>
                        <button onClick={onClose} className="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProductForm;
