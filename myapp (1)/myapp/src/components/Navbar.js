import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link, useLocation } from 'react-router-dom';
import ph from "../asserts/images/placeholder.png";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const location = useLocation(); // Get the current location
  const show = () => setVisible(true);
  const close = () => setVisible(false);
  const customStyles = {
    content: {
      width: '7%',
      height: '18%',
      margin: 'auto',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
      transform: 'translate(660%, -150%)',
      zIndex: '1000',
    },
    Link:{
      textDecoration:'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  };
  const userId = 1;
  return (
    <div className="navbar-container">
      <div className="title">
        <img src={ph} alt="Logo" className="logo" />
        <p style={{color:'white'}}>VenueTrack</p>
      </div>
      <div className="navbar">
        <div><Link to='/Home' style={{textDecoration:'none',color:'white'}}>HOME</Link></div>
        <div><Link to ="/venues" style={{textDecoration:'none',color:'white'}}>VENUES</Link></div>
        <div><Link to="/venders" style={{textDecoration:'none',color:'white'}}>VENDORS</Link></div>
        <div><Link to="/Invitation" style={{textDecoration:'none',color:'white'}} target="_blank">E-INVITATIONS</Link></div>
        <div><Link to="/mybooking" style={{textDecoration:'none',color:'white'}} >MY_BOOKINGS</Link></div>
      </div>
        <span><FontAwesomeIcon icon={faCircleUser} onClick={show} style={{float:'right',position:'absolute',top:'10%',color:'aqua',left:'97%'}} size='2x' ></FontAwesomeIcon></span>
        <Modal
        isOpen={visible}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Profile Modal"
      >
        <Link to='/profile' onClick={close} style={{color:'#000000',textDecoration:'none'}} ><div>Profile</div></Link><br />
        <Link to='/SignIn' onClick={close} style={{color:'#000000',textDecoration:'none'}}><div>Log Out</div></Link>
      </Modal>
    </div>
  );
}

export default Navbar;

