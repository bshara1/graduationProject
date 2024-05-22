import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/cards/ProductCard';
import Header from '../components/header/header';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';

function CategoryProducts() {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();
    const { activeTab, handleTabChange } = useTabNavigation();
    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                const response = await fetch(`http://localhost:8080/allProducts`);
                const data = await response.json();

                if (categoryName === 'All') {
                    // If the category is 'All', display all products
                    setProducts(data);
                } else {
                    // Otherwise, filter products by category name
                    const filteredProducts = data.filter(product => product.product_category.category_name === categoryName);
                    setProducts(filteredProducts);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategoryProducts();
    }, [categoryName]);

    return (
        <div className='backg'>

            <div className="row">
                <div className="col-sm-2">
                    <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
                </div>
                <div className="col-sm-10">
                    <Header />
                    <div className="container-fluid product-cat-page ">
                        <h2 >{categoryName} Products</h2>
                        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5"> {/* Adjust the number of columns */}
                            {products.map(product => (
                                <div key={product._id} className="col mb-4">
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            

       </div>
    );
}

export default CategoryProducts;
