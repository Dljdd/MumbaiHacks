import React, { useEffect, useRef } from 'react';
import mapboxgl from '!mapbox-gl';
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
      center: [72.8777, 19.0760], // Mumbai coordinates
      zoom: 10
    });

    map.on('load', () => {
      // Load GeoJSON data
      fetch('/dark_stores.geojson')
        .then(response => response.json())
        .then(data => {
          console.log('GeoJSON data:', data);
          map.addSource('dark-stores', {
            type: 'geojson',
            data: data
          });

          // Add markers
          map.addLayer({
            id: 'dark-stores-markers',
            type: 'circle',
            source: 'dark-stores',
            paint: {
              'circle-radius': 6,
              'circle-color': '#B42222'
            }
          });

          // Optional: Add popups
          map.on('click', 'dark-stores-markers', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const region = e.features[0].properties.region;

            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<h3>${region}</h3>`)
              .addTo(map);
          });

          // Change cursor to pointer when hovering over a marker
          map.on('mouseenter', 'dark-stores-markers', () => {
            map.getCanvas().style.cursor = 'pointer';
          });

          map.on('mouseleave', 'dark-stores-markers', () => {
            map.getCanvas().style.cursor = '';
          });
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
    });

    // Cleanup on unmount
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapboxExample;
