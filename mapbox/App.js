import React from 'react';
import './App.css';
import MapboxExample from './MapboxExample';
import logo from './logo.jpeg'; // Update with the actual path to your logo

const App = () => {
  return (
    <div className="container">
      <div className="left-section">
        <MapboxExample />
      </div>
      <div className="right-section">
        <div className="top">
          <select id="options" className="dropdown-select">
            <option value="demand">Demand</option>
            <option value="supply">Supply</option>
            <option value="price_dist">Price Distribution</option>
            <option value="pop_density">Population Density</option>
          </select>
          <button className="optimize-button">Optimize</button>
          <img src={logo} alt="Website Logo" className="logo" />
        </div>
        <div className="bottom">
          Bottom stuff
        </div>
      </div>
    </div>
  );
};

export default App;

