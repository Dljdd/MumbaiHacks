import React from 'react';
import './App.css';
import MapboxExample from './MapboxExample';

const App = () => {
  return (
    <div className="container">
      {/* Left section with MapboxExample */}
      <div className="left-section">
        <MapboxExample />
      </div>

      {/* Right section with placeholder content */}
      <div className="right-section">
        <div className="top">
          <div className="dropdown">
            <select id="options" className="dropdown-select">
              <option value="demand">Demand</option>
              <option value="supply">Supply</option>
              <option value="price_dist">Price Distribution</option>
              <option value="pop_density">Population Density</option>
            </select>
          </div>
          
        </div>
        <div className="bottom">
          Bottom stuff
        </div>
      </div>
    </div>
  );
};

export default App;
