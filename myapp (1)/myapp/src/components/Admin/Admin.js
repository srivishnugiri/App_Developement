import { faClipboard, faHouse, faShop, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../asserts/Admin.css';

const Admin = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null); // State for selected vendor
  const [showVendorReg, setShowVendorReg] = useState(false); // State to show/hide Registeration modal

  useEffect(() => {
    fetch('http://localhost:3060/api/admins')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  const handleSaveClick = () => {
    if (selectedVendor) {
        fetch(`http://localhost:3060/api/admins/${selectedVendor.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(selectedVendor),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating venue: ${response.statusText}`);
            }
            return response.json();
        })
        .then(updatedVendor => {
            setUsers(users.map(user => (user.id === updatedVendor.id ? updatedVendor : user)));
            handleCloseVendorReg(); 
        })
        .catch(error => console.error('Error:', error));
    }
};

const handleDeleteClick = (id) => {
    fetch(`http://localhost:3060/api/admins/${id}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error deleting vendor: ${response.statusText}`);
        }
        setUsers(users.filter(user => user.id !== id));
    })
    .catch(error => console.error('Error:', error));
};

  const handleUpdateClick = (vendor) => {
    setSelectedVendor(vendor); // Set the selected vendor data
    setShowVendorReg(true); // Show the Registeration modal
  };

  const handleCloseVendorReg = () => {
    setShowVendorReg(false); // Hide the Registeration modal
    setSelectedVendor(null); // Clear the selected vendor data
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedVendor(prevVendor => ({
      ...prevVendor,
      [name]: value
    }));
  };
  

  const filteredUsers = users.filter(user => 
    (user.name && user.name.toLowerCase().includes(search.toLowerCase())) ||
    (user.event && user.event.toLowerCase().includes(search.toLowerCase())) ||
    (user.number && user.number.toLowerCase().includes(search.toLowerCase())) ||
    (user.date && user.date.toLowerCase().includes(search.toLowerCase())) ||
    (user.totalmembers && user.totalmembers.toLowerCase().includes(search.toLowerCase())) ||
    (user.arrival && user.arrival.toLowerCase().includes(search.toLowerCase())) ||
    (user.departure && user.departure.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="admin-body">
      <div className="header">
        <Link to="/AdminUsers" style={{ textDecoration: 'none'}}><div><FontAwesomeIcon icon={faHouse}/><span style={{marginLeft:'10px'}}>DashBoard</span></div></Link>
        <Link to="/Admin" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faClipboard}/><span style={{marginLeft:'10px'}}>Bookings</span></div></Link>
        <Link to="/AdminVender" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faUser}/><span style={{marginLeft:'10px'}}>Users</span></div></Link>
        <Link to="/vendorbooked" style={{ textDecoration: 'none' }}><div><FontAwesomeIcon icon={faShop}/><span style={{marginLeft:'10px'}}>Vendors Booked</span></div></Link>
        <Link to="/SignIn" style={{ textDecoration: 'none' }}><div>Sign Out</div></Link>
      </div>
      <div className="Appbar">
        <p>Bookings</p>
        <input type="text" name="search" onChange={handleSearchChange} value={search} placeholder="Search" />
      </div>
      <div className="form-container" style={{ marginLeft: '12%' }}>
        <div>
          <h2>Hall Booked</h2>
          <table className='table table-striped'>
            <thead>
              <tr>
                <td className='font-weight-bold'>Name</td>
                <td className='font-weight-bold'>Total Members</td>
                <td className='font-weight-bold'>Arrival</td>
                <td className='font-weight-bold'>Departure</td>
                <td className='font-weight-bold'>Event</td>
                <td className='font-weight-bold'>Mobile No</td>
                <td className='font-weight-bold'>Date</td>
                <td className='font-weight-bold'>Actions</td> {/* Add Actions column */}
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.totalmembers}</td>
                    <td>{user.arrival}</td>
                    <td>{user.departure}</td>
                    <td>{user.event}</td>
                    <td>{user.number}</td>
                    <td>{user.date}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleUpdateClick(user)}>Update</Button> {/* Update button */}</td>
                     <td><Button variant="danger" onClick={() => handleDeleteClick(user.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>No users</td> {/* Adjust colspan for Actions column */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal show={showVendorReg} onHide={handleCloseVendorReg}>
        <Modal.Header closeButton>
          <Modal.Title>UpdateVenue Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVendor && (
            <div>
              <label style={{ marginLeft: '32px', width: '38%', marginTop: '30px' }}>Name:
                <input
                  type="text"
                  name="name"
                  placeholder='Username'
                  value={selectedVendor.name || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginLeft: '6%', width: '38%', marginTop: '30px' }}>Total Members:
                <input
                  type="text"
                  placeholder='0-1000'
                  name="totalmembers"
                  value={selectedVendor.totalmembers || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginLeft: '32px', width: '38%', marginTop: '30px' }}>Arrival:
                <input
                  type="text"
                  placeholder='0.00'
                  name="arrival"
                  value={selectedVendor.arrival || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginLeft: '6%', width: '38%', marginTop: '30px' }}>Departure:
                <input
                  type="text"
                  placeholder='24.00'
                  name="departure"
                  value={selectedVendor.departure || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginLeft: '32px', width: '38%', marginTop: '30px' }}>Mobile No:
                <input
                  type="text"
                  placeholder='+91'
                  name="number"
                  value={selectedVendor.number || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginLeft: '6%', width: '38%', marginTop: '30px' }}>Event:
                <input
                  type="text"
                  placeholder='Event'
                  name="event"
                  value={selectedVendor.event || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label style={{ marginLeft: '32px', width: '28%', marginTop: '30px' }}>Date:
                <input
                  type="date"
                  name="date"
                  value={selectedVendor.date || ''}
                  onChange={handleInputChange}
                />
              </label>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
  <Button variant="secondary" onClick={handleCloseVendorReg}>Close</Button>
  <Button variant="primary" onClick={handleSaveClick}>Save</Button>
</Modal.Footer>

      </Modal>
    </div>
  );
};

export default Admin;