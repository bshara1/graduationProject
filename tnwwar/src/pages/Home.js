import React, { useState, useEffect } from 'react';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from "../components/header/header"
import Offertab from '../components/Home/Offertab';
import RightAside from '../components/Right-aside/RightAside';
import Categorieslist from '../components/categories/Categorieslist';
import RandomProductCarousel from '../components/Home/RandomProductCarousel';

function HomeScreen() {
  const { activeTab, handleTabChange } = useTabNavigation();
  const [products, setProducts] = useState([]);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
        <div className="col-sm-8">
          <Header />
          <div>
            <h3 style={{ color: "#009393" }}>Explore Popular Categories</h3>
            <Categorieslist />
          </div>
          <div className="mb-4">
            <h3 style={{ color: "#009393" }}>Daily Flash Sale</h3>
            <Offertab />
          </div>
          <div className="mb-4">
            <h3 style={{ color: "#009393" }}>Must-Haves for Your Wishlist</h3>
            <RandomProductCarousel />
          </div>
        </div>
        <div className="col-sm-2">
          <RightAside />
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
