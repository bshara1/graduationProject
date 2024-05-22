import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Adjust the import path accordingly

function UpdateForm({ product, onClose, onUpdate }) {
    const { authToken } = useAuth(); // Use the authToken from the AuthContext
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [productCount, setProductCount] = useState('');
    const [image, setImage] = useState(null);
    const [productLocation, setProductLocation] = useState('');

    const [categories, setCategories] = useState([]);
    const [cities] = useState(["Amman", "Aqaba", "Irbid", "Zarqa", "Madaba", "Salt", "Jerash", "Karak", "Tafilah", "Ma'an", "Ajloun"]);
    const [category, setCategory] = useState(''); // Define category state variable

    useEffect(() => {
        setProductName(product.product_name || '');
        setDescription(product.description || '');
        setPrice(product.price || '');
        setProductCount(product.product_count || '');
        setProductLocation(product.product_location || '');
        setCategory(product.product_category ? product.product_category._id : ''); // Use _id of selected category
        fetchCategories();
    }, [product]);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/getCategory', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send the token with the request
                },
            });

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
        formData.append('product_location', productLocation);
        formData.append('product_category', category);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`http://localhost:8080/updateProduct/${product._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${authToken}`, // Send the token with the request
                },
                body: formData,
            });

            if (response.ok) {
                onUpdate();
                onClose();
            } else {
                console.error('Failed to update product');
                alert('Failed to update product. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred while updating product:', error);
            alert('An error occurred while updating product. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div className="update-product-popup">
            <h3>Update Product</h3>
            <form onSubmit={handleSubmit} className="update-product-form">
                <label htmlFor="productName">Product Name</label>
                <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
                <label htmlFor="description">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <label htmlFor="price">Price</label>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <label htmlFor="productCount">Product Count</label>
                <input type="number" id="productCount" value={productCount} onChange={(e) => setProductCount(e.target.value)} required />
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
                        <option key={category._id} value={category._id}>{category.category_name}</option> // Use _id of category
                    ))}
                </select>

                <label htmlFor="image">Image</label>
                <input type="file" id="image" onChange={handleImageChange} />
                <div className="button-group">
                    <button type="submit" className="update-buttons">Update Product</button>
                    <button onClick={onClose} className="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateForm;
