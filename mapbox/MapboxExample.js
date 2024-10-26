import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef();

  useEffect(() => {
    // Set the Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZDEwMjMiLCJhIjoiY20yb3YxaGN4MGwwazJqczNwYTBlNzgwNyJ9.mvTybZ2s3abpNYVbQiUbpg';

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11', // Map style
      center: [72.8977, 19.0760], // Starting position [lng, lat]
      zoom: 11 // Starting zoom
    });

    // Function to add markers from the GeoJSON file
    const addMarkers = async () => {
  const response = await fetch('/DS2.geojson');
  const geojson = await response.json();
  console.log(geojson); // Check the structure and data

  geojson.features.forEach((feature) => {
    new mapboxgl.Marker()
      .setLngLat(feature.geometry.coordinates)
      .setPopup(new mapboxgl.Popup().setHTML(`<h3>${feature.properties.name}</h3>`))
      .addTo(map);
  });
};


    // Call the addMarkers function to place markers on the map
    addMarkers();

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapboxExample;

