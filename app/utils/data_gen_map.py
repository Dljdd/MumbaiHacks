import json
import random
from shapely.geometry import Point, Polygon
from shapely.ops import transform
import pyproj
from functools import partial

# Load the existing GeoJSON file
with open('locations.geojson', 'r') as f:
    data = json.load(f)

# Function to create a circular buffer around a point
def create_buffer(lon, lat, radius_km):
    proj_wgs84 = pyproj.Proj(init='epsg:4326')
    proj_utm = pyproj.Proj(init='epsg:32643')  # UTM zone for Mumbai
    project = partial(pyproj.transform, proj_wgs84, proj_utm)
    unproject = partial(pyproj.transform, proj_utm, proj_wgs84)
    
    point = Point(lon, lat)
    point_utm = transform(project, point)
    circle_utm = point_utm.buffer(radius_km * 1000)
    circle_wgs84 = transform(unproject, circle_utm)
    
    return circle_wgs84

# Create dark stores and their service areas
dark_stores = []
for feature in data['features']:
    region = feature['properties']['region']
    coords = feature['geometry']['coordinates']
    
    # Create a dark store at a random location within 0.01 degrees of the region center
    store_lon = coords[0] + random.uniform(-0.01, 0.01)
    store_lat = coords[1] + random.uniform(-0.01, 0.01)
    
    # Create a 2km buffer around the dark store
    buffer = create_buffer(store_lon, store_lat, 2)
    
    dark_stores.append({
        "type": "Feature",
        "properties": {
            "region": region,
            "type": "dark_store"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [store_lon, store_lat]
        }
    })
    
    dark_stores.append({
        "type": "Feature",
        "properties": {
            "region": region,
            "type": "service_area"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [list(buffer.exterior.coords)]
        }
    })

# Create the new GeoJSON structure
new_geojson = {
    "type": "FeatureCollection",
    "features": data['features'] + dark_stores
}

# Save the new GeoJSON file
with open('dark_stores.geojson', 'w') as f:
    json.dump(new_geojson, f, indent=2)

print("Dark stores and service areas have been generated and saved to 'dark_stores.geojson'")

