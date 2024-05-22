import React, { useEffect, useState } from 'react';
import Aside from '../components/a-sideBar/Aside';
import useTabNavigation from '../hooks/useTabNavigation';
import Header from '../components/header/header';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHistory } from '@fortawesome/free-solid-svg-icons';

function PurchaseHistory() {
  const { activeTab, handleTabChange } = useTabNavigation();
  const { authToken } = useAuth();
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [firstPurchase, setFirstPurchase] = useState(false); // State to track if it's the user's first purchase

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/paymentHistory', {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
        // Sort purchase history by payment date (newest first)
        const sortedHistory = response.data.sort((a, b) => new Date(b.payment_At) - new Date(a.payment_At));
        setPurchaseHistory(sortedHistory);
        // Check if purchase history is empty, indicating it's the user's first purchase
        if (sortedHistory.length === 0) {
          setFirstPurchase(true);
        }
      } catch (error) {
        console.error('Error fetching purchase history', error);
        setError('Failed to fetch purchase history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (authToken) {
      fetchPurchaseHistory();
    }
  }, [authToken]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-2">
          <Aside activeTab={activeTab} handleTabChange={handleTabChange} />
        </div>
        <div className="col-sm-10">
          <Header />
          <div className="content">
            <h1 className='purchase-title'>Purchase History</h1>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : purchaseHistory.length > 0 ? (
              <table className="table purchase-history-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Date</th>
                    <th>Shop Location</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td><img src={item.product_id.img_url} alt={item.product_id.product_name} style={{ width: '50px', height: '50px' }} /></td>
                      <td>{item.product_id.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.total}</td>
                      <td>{new Date(item.payment_At).toLocaleDateString()}</td>
                      <td>{item.product_id.product_location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <>
                {firstPurchase ? (
                        <div className="empty-cart">
                          <FontAwesomeIcon icon={faHistory} size="5x" className='empty-icon' />
                          <p>Welcome! It looks like you haven't made any purchases yet. Start shopping now!</p>
                        </div>
                ) : (
                  <p>No purchase history available.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchaseHistory;
