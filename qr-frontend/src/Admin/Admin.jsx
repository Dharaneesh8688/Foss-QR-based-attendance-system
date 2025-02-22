import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './AdminNav';



const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h1>Welcome to the Admin Dashboard</h1>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  );
};

export default AdminPage;
