import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCarousel from './ProductCarousel';

function RandomProductCarousel() {
    const [randomProducts, setRandomProducts] = useState([]);

    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/allProducts');
                const allProducts = response.data;
                const randomIndexes = [];
                while (randomIndexes.length < 10) {
                    const randomIndex = Math.floor(Math.random() * allProducts.length);
                    if (!randomIndexes.includes(randomIndex)) {
                        randomIndexes.push(randomIndex);
                    }
                }
                const randomProductsData = randomIndexes.map(index => allProducts[index]);
                setRandomProducts(randomProductsData);
            } catch (error) {
                console.error('Error fetching random products:', error);
            }
        };

        fetchRandomProducts();
    }, []);

    return (
        <div>
            <ProductCarousel products={randomProducts} />
        </div>
    );
}

export default RandomProductCarousel;
