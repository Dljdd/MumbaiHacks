import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import populationDensityData from './data/population_density.json';
import coordsData from './data/coords.json';
import coordsSupplyData from './data/coords2.json';

const MapboxExample = ({ heatmapType }) => {
  const mapContainerRef = useRef();
  const markerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FhZDEwMjMiLCJhIjoiY20yb3YxaGN4MGwwazJqczNwYTBlNzgwNyJ9.mvTybZ2s3abpNYVbQiUbpg';

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [72.8977, 19.0760],
      zoom: 11,
    });

    const addHeatmapLayer = (data, coords) => {
      const heatmapData = Object.keys(data).map(location => {
        const coordinates = coords[location];
        return {
          location: coordinates,
          density: data[location],
        };
      }).filter(item => item.location);

      map.addSource('heatmap-data', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: heatmapData.map(item => ({
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: item.location,
            },
            properties: {
              density: item.density,
            },
          })),
        },
      });

      map.addLayer({
        id: 'heatmap',
        type: 'heatmap',
        source: 'heatmap-data',
        maxzoom: 15,
        paint: {
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'density'],
            0, 0,
            100000, 1,
          ],
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(0, 0, 0, 0)',
            0.1, 'rgba(255, 0, 0, 0.8)',
            0.3, 'rgba(255, 165, 0, 0.8)',
            0.5, 'rgba(255, 255, 0, 0.8)',
            0.7, 'rgba(0, 255, 0, 0.8)',
            1, 'rgba(0, 0, 255, 0.8)',
          ],
          'heatmap-radius': 130,
        },
      });
    };

    map.on('load', () => {
      if (map.getLayer('heatmap')) {
        map.removeLayer('heatmap');
        map.removeSource('heatmap-data');
      }

      if (heatmapType === 'population_density') {
        addHeatmapLayer(populationDensityData, coordsData);
      } else if (heatmapType === 'supply') {
        addHeatmapLayer(populationDensityData, coordsSupplyData);
      }

      fetch('/DS2.geojson')
        .then(response => response.json())
        .then(data => {
          data.features.forEach((feature) => {
            const { geometry, properties } = feature;
            const { coordinates } = geometry;

            const el = document.createElement('div');
            el.className = 'marker';
            
            const img = document.createElement('img');
            img.src = '/onlyLogo-removebg-preview.png';
            img.style.width = '100%';
            img.style.height = '100%';
            
            img.onerror = () => {
              console.error('Failed to load marker image');
              el.style.backgroundColor = 'red';
            };
            
            el.appendChild(img);

            const popup = new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h3>${properties.region}</h3>`);

            new mapboxgl.Marker(el)
              .setLngLat(coordinates)
              .setPopup(popup)
              .addTo(map);
          });
        })
        .catch(error => console.error('Error loading GeoJSON:', error));
    });

    map.on('click', async (e) => {
      const coordinates = e.lngLat;
      console.log(`Clicked coordinates: ${coordinates.lng}, ${coordinates.lat}`);

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new mapboxgl.Marker({ color: 'red' })
        .setLngLat(coordinates)
        .addTo(map);

      try {
        const response = await fetch('http://localhost:3001/api/coordinates', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('API response:', data);
        // Handle the API response here (e.g., update state, display information)
      } catch (error) {
        console.error('Error sending coordinates to API:', error);
      }
    });

    return () => map.remove();
  }, [heatmapType]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />;
};

export default MapboxExample;
