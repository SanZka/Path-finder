import React, { useState } from 'react';
import './WelcomePopup.css'; // Ensure you have appropriate styles for your popup

function WelcomePopup({ onClose }) {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [error, setError] = useState('');

  const handleStartLocationChange = (event) => {
    setStartLocation(event.target.value);
  };

  const handleEndLocationChange = (event) => {
    setEndLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (startLocation === '' || endLocation === '') {
      setError('Both start location and end location must be selected');
    } else if (startLocation === endLocation) {
      setError('Start location and end location cannot be the same');
    } else {
      setError('');
      onClose();
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold">Welcome to the Path Visualizer App</h2>
          <label className="font-bold" htmlFor="start-location">Choose Start Location:</label>
          <select
            name="startLocation"
            id="start-location"
            value={startLocation}
            onChange={handleStartLocationChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="current location">Current Location</option>
            <option value="eliza">Queen Elizabeth Park</option>
            <option value="golf">Golf Course</option>
            <option value="memorial">Memorial South Park</option>
            <option value="trout">Trout Lake Community Center</option>
            <option value="avanue">E-49 Ave</option>
          </select>
          <br />
          <br />
          <label className="font-bold" htmlFor="end-location">Choose Destination:</label>
          <select
            name="endLocation"
            id="end-location"
            value={endLocation}
            onChange={handleEndLocationChange}
          >
            <option value="">--Please choose an option--</option>
            {/* <option value="current location">Current Location</option> */}
            <option value="eliza">Queen Elizabeth Park</option>
            <option value="golf">Golf Course</option>
            <option value="memorial">Memorial South Park</option>
            <option value="trout">Trout Lake Community Center</option>
            <option value="avanue">E-49 Ave</option>
          </select>
          <br />
          <br />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit">Continue</button>
        </form>
      </div>
    </div>
  );
}

export default WelcomePopup;
