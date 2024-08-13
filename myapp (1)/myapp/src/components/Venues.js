import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faBuildingColumns, faSackDollar, faLocationDot as solidLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import bcimg from "../asserts/images/back1.avif";
import v1 from "../asserts/images/rest1.webp";
import v2 from "../asserts/images/rest2.jpg";
import v3 from "../asserts/images/rest3.avif";
import '../asserts/venues.css';
import Dropdown from './Dropdown';
import Footer from './Footer';
import Navbar from './Navbar';
import Registration from './RegistrationForms/Registeration';

const venuesData = [
  {
    img: v2,
    name: "Hot Spot Restaurant",
    description: "Elegant",
    location: "NTF Road",
    price: "Rs.65000 Half Day Rent",
    rating: 4.2,
  },
  {
    img: v1,
    name: "Residency Restaurants",
    description: "Star Banquet Hall",
    location: "Kanpur Highway",
    price: "Rs.75000 Half Day Rent",
    rating: 4.3,
  },
  {
    img: v3,
    name: "Social Kitchen",
    description: "Special Banquet Hall",
    location: "Mount Road, Chennai",
    price: "Rs.50000 Half Day Rent",
    rating: 4.5,
  },
  {
    img: v1,
    name: "Charlie Residency",
    description: "Special Banquet Hall",
    location: "Mount Road, Delhi",
    price: "Rs.50000 Half Day Rent",
    rating: 4.5,
  }
];

const cities = ["Chennai", "Delhi", "Mumbai", "Hyderabad", "Jaipur", "Bangalore"];
const budgets = ["Under 10000 Rs", "10001 Rs to 20000 Rs", "20001 Rs to 30000 Rs", "30001 Rs to 50000 Rs", "50001 Rs to 75000 Rs", "100000 Rs +"];
const ratings = ["Under 1", "Between 1 and 2", "Between 2 and 3", "Between 3 and 4", "Between 4 and 5", "Above 5"];

const Venues = () => {
  const bcstyle = {
    backgroundImage: `url(${bcimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '40vh',
    width: '100vw',
  };
  
  const customStyles = {
    content: {
      width: '65%',
      height: 'auto',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f8f9fa',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedVenue, setSelectedVenue] = useState(null);
  const itemsPerPage = 3;

  const filterByBudget = (price, selectedBudget) => {
    const priceValue = parseInt(price.replace(/[^0-9]/g, ''), 10);
    switch (selectedBudget) {
      case "Under 10000 Rs":
        return priceValue < 10000;
      case "10001 Rs to 20000 Rs":
        return priceValue >= 10001 && priceValue <= 20000;
        case "20001 Rs to 30000 Rs":
          return priceValue >= 20001 && priceValue <= 30000;
          case "30001 Rs to 50000 Rs":
            return priceValue >= 30001 && priceValue <= 50000;
            case "50001 Rs to 75000 Rs":
              return priceValue >= 50001 && priceValue <= 75000;
              case "100000 Rs +":
                return priceValue > 100000;
                default:
                  return true;
      }
  };

  const filterByRating = (rating, selectedRating) => {
    switch (selectedRating) {
      case "Under 1":
        return rating < 1;
        case "Between 1 and 2":
          return rating >= 1 && rating <= 2;
      case "Between 2 and 3":
        return rating >= 2 && rating <= 3;
      case "Between 3 and 4":
        return rating >= 3 && rating <= 4;
      case "Between 4 and 5":
        return rating >= 4 && rating <= 5;
        case "Above 5":
          return rating > 5;
      default:
        return true;
    }
  };

  const filteredVenues = venuesData.filter((venue) => {
    return (
      (!selectedCity || venue.location.includes(selectedCity)) &&
      (!selectedBudget || filterByBudget(venue.price, selectedBudget)) &&
      (!selectedRating || filterByRating(venue.rating, selectedRating))
    );
  });

  const paginatedVenues = filteredVenues.slice(currentIndex, currentIndex + itemsPerPage);

  useEffect(() => {
    setCurrentIndex(0); // Reset pagination when filters change
  }, [selectedCity, selectedBudget, selectedRating]);

  const handleCityChange = (event) => setSelectedCity(event.target.value);
  const handleBudgetChange = (event) => setSelectedBudget(event.target.value);
  const handleRatingChange = (event) => setSelectedRating(event.target.value);
  
  const renderFilterOptions = (label, options, selectedValue, onChange) => (
    <>
      <FormLabel id={`filter-${label}`} style={{ marginLeft: '-12px', color: 'tomato', fontSize: '18px' }}>{label}</FormLabel>
      <RadioGroup aria-labelledby={`filter-${label}`} value={selectedValue} name={`filter-${label}`} onChange={onChange}>
        {options.map((option, index) => (
          <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </>
  );
  
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + itemsPerPage, filteredVenues.length - itemsPerPage));
  };
  
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleRequestQuote = (venue) => {
    setSelectedVenue(venue);
    setVisible(true);
  };
  
  return (
    <div className="hcontainer">
      <div className="header" style={bcstyle}>
        <Navbar />
        <h2>Find Your Perfect Venue</h2>
        <Dropdown/>
      </div>

      <div className="vscenter">
        <div className="filter">
          <h2>Filter Your Search</h2>
          <FormControl style={{ marginLeft: '43px' }}>
            {renderFilterOptions("Cities", cities, selectedCity, handleCityChange)}
            {renderFilterOptions("Budget", budgets, selectedBudget, handleBudgetChange)}
            {renderFilterOptions("Rating", ratings, selectedRating, handleRatingChange)}
          </FormControl>
        </div>
        {paginatedVenues.map((venue, index) => (
          <div className="scard" key={index}>
            <img src={venue.img} alt={`venue${index + 1}`} />
            <div className="content">
              <h2>{venue.name}</h2>
              <p>  <FontAwesomeIcon style={{ color: 'black' }} icon={faBuildingColumns} size="1x" />{venue.description}</p>
             
              <p> <FontAwesomeIcon style={{ color: 'black' }} icon={solidLocationDot} size="1x" /> {venue.location}</p>
            
              <p><FontAwesomeIcon style={{ color: 'black', marginLeft: '3%' }} icon={faSackDollar} size="1x" />{venue.price}</p>
            
              <p>  <FontAwesomeIcon style={{ color: 'black' }} icon={regularStar} size="1x" />Rating: {venue.rating}</p>
              <button onClick={() => handleRequestQuote(venue)}>Request Quote</button>
            </div>
          </div>
        ))}
        <div className="pagination">
          <button onClick={handlePrevClick} disabled={currentIndex === 0}>Previous</button>
          <button onClick={handleNextClick} disabled={currentIndex + itemsPerPage >= filteredVenues.length} style={{ marginLeft: '250%' }} >Next</button>
        </div>
      </div>

      <Modal isOpen={visible} style={customStyles} onRequestClose={() => setVisible(false)}>
        <Registration selectedVenue={selectedVenue} onClose={() => setVisible(false)} />
      </Modal>

      <Footer />
    </div>
  );
};

export default Venues;
