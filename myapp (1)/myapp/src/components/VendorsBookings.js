import React from 'react';
import bcimg from "../asserts/images/back1.avif";
import '../asserts/mybookings.css';
import Dropdown from './Dropdown';
import Navbar from './Navbar';

const bcstyle = {
  backgroundImage: `url(${bcimg})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '40vh',
};

const VendorsBookings = ({ vendorbooked = [],SetVendorbooked}) => {
  
  const handleCancel = (bookingId, index) => {
    fetch(`http://localhost:3060/api/vendors/${bookingId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        const updatedUsers = vendorbooked.filter((_, i) => i !== index); // remove the canceled booking from state
        SetVendorbooked(updatedUsers); // update the users state
      } else {
        console.error('Failed to cancel booking');
      }
    })
    .catch(error => console.error('Error:', error));
  };
  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find & Book The Best Venue For Every Single Event</h2>
        <Dropdown />
      </div>
      <div className='details'>
        {vendorbooked.length > 0 ? (
          <ul>
            {vendorbooked.map((booking, index) => (
              <li style={{listStyleType:'none'}}>
                  <div className="mybookings" key={index}>
                  <div className='book-contents'>
                    <div className='1'>
                  <h4>Name:<span>{booking.rname}</span></h4>
                  <h4>Email:<span>{booking.remail}</span></h4>
                  <h4>Date:<span>{booking.rdate}</span></h4>
                  </div>
                  <div className='2'>
                  <h4>Event:<span>{booking.revent}</span></h4>
                  <h4>Location:<span>{booking.rlocation}</span></h4>
                  <h4>Mobile No:<span>{booking.rmobile}</span></h4>
                  <button 
                        style={{ width: '31%', height: '24%',position:'relative',left:'195%',top:'-5%' }}
                        onClick={() => handleCancel(booking.id, index)} 
                      >
                        Cancel
                      </button>
                
                  </div>
                  </div>
              </div>
                </li>
            ))}
          </ul>
        ) : (
          <p>No bookings yet.</p>
        )}
      </div>
    </div>
  );
};

export default VendorsBookings;
