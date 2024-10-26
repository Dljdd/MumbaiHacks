import React from 'react';
import './App.css';
import MapboxExample from './MapboxExample';
import 'mapbox-gl/dist/mapbox-gl.css';
import logo from './logo.jpeg'; // Update with the actual path to your logo

const App = () => {
  return (
    <div className="container" style={{ height: '100vh' }}>
      <div className="left-section" style={{ height: '100%' }}>
        <MapboxExample />
      </div>
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
