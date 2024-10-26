import React, { useEffect, useRef } from 'react';
import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxExample = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    console.log('MapboxExample useEffect started');
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZDEwMjMiLCJhIjoiY20yb3YxaGN4MGwwazJqczNwYTBlNzgwNyJ9.mvTybZ2s3abpNYVbQiUbpg';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [72.8777, 19.0760],
      zoom: 10
    });

    map.on('load', () => {
      console.log('Map loaded');
      fetch('/DS2.geojson')
        .then(response => {
          console.log('GeoJSON response:', response);
          return response.json();
        })
        .then(data => {
          console.log('GeoJSON data:', data);
          
          // Add custom markers
          data.features.forEach((feature) => {
            const { geometry, properties } = feature;
            const { coordinates } = geometry;

            // Create a DOM element for the marker
            const el = document.createElement('div');
            el.className = 'marker';
            
            // Create an image element
            const img = document.createElement('img');
            img.src = '/onlyLogo-removebg-preview.png';
            img.style.width = '100%';
            img.style.height = '100%';
            
            // Add error handling for image loading
            img.onerror = () => {
              console.error('Failed to load marker image');
              el.style.backgroundColor = 'red'; // Fallback color
            };
            
            el.appendChild(img);

            // Create the popup
            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${properties.region}</h3>`);

            // Create the marker
            new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .setPopup(popup)
              .addTo(map);

            console.log(`Marker added for ${properties.region}`);
          });
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
    });

    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapboxExample;
