import React, { useEffect, useState } from 'react';
import Payment from '../Payment.js';
const Registration = ({ selectedVenue, onClose }) => {
  const initialFormState = { id: null, name: '', totalmembers: '', arrival: '', departure: '', event: '', number: '', date: '', venueName: '', venuePrice: '', venueImage: '' };
  const [user, setUser] = useState(initialFormState);

  useEffect(() => {
    if (selectedVenue) {
      setUser((prevUser) => ({
        ...prevUser,
        venueName: selectedVenue.name,
        venuePrice: selectedVenue.price,
        venueImage: selectedVenue.img
      }));
    }
  }, [selectedVenue, user]); // Add 'user' here
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.name || !user.event || !user.number || !user.date || !user.totalmembers) return;
    
    try {
      const res = await fetch('http://localhost:3060/api/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        alert("Booking Successful");
        setUser(initialFormState);
        onClose();
      } else {
        alert("Failed to Send Booking");
      }
    } catch (error) {
      alert("Failed to Send Booking");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request a Quote for {user.venueName}</h2>
      <div>
        <label style={{marginLeft:'40px',width:'34%', marginTop:'30px'}}>Name: <input type="text" name="name" value={user.name} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'22%',width:'33%',marginTop:'30px'}}>Total Members: <input type="text" name="totalmembers" value={user.totalmembers} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'40px',width:'24%',marginTop:'30px',marginTop:'30px'}}>Arrival: <input type="text" name="arrival" value={user.arrival} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'40px',width:'24%',marginTop:'30px'}}>Departure: <input type="text" name="departure" value={user.departure} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'40px',width:'32%',marginTop:'30px'}}>Mobile No: <input type="text" name="number" value={user.number} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'40px',width:'34%',marginTop:'30px'}}>Event: <input type="text" name="event" value={user.event} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'30px',width:'18%',marginTop:'30px'}}>Date: <input type="date" name="date" value={user.date} onChange={handleInputChange} /></label>
        <label  style={{marginLeft:'30px',width:'30%',marginTop:'30px'}}>Venue: <input type="text" name="venueName" value={user.venueName} readOnly /></label>
        <label  style={{marginLeft:'40px',width:'30%',marginTop:'30px'}}>Price: <input type="text" name="venuePrice" value={user.venuePrice} readOnly /></label>
        <label  style={{marginLeft:'40px',width:'30%',marginTop:'30px'}}>Image: <input type="text" name="venueImage" value={user.venueImage} readOnly /></label>
        <Payment/><button type="submit"  style={{marginRight:'90px',width:'34%',marginTop:'-50px',float:'right'}}>Confirm Booking</button>
      </div>
    </form>
  );
};

export default Registration;
