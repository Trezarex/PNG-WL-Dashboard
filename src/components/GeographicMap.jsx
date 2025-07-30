import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Tooltip } from 'react-leaflet';
import { MapPin, Users, Target } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './GeographicMap.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const GeographicMap = ({ data, title = "Geographic Coverage", height = 450 }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // PNG locations with real coordinates
  const locationCoordinates = {
    'Port Moresby': { lat: -9.4438, lng: 147.1803, region: 'NCD' },
    'Lae': { lat: -6.7231, lng: 146.9961, region: 'Morobe' },
    'Madang': { lat: -5.2215, lng: 145.7869, region: 'Madang' },
    'Goroka': { lat: -6.0833, lng: 145.3833, region: 'Eastern Highlands' },
    'Kokopo': { lat: -4.3519, lng: 152.2667, region: 'East New Britain' },
    'Mount Hagen': { lat: -5.8667, lng: 144.2167, region: 'Western Highlands' },
    'Kundiawa': { lat: -6.0167, lng: 144.9667, region: 'Simbu' },
    'Alotau': { lat: -10.3158, lng: 150.4572, region: 'Milne Bay' }
  };

  // Calculate max beneficiaries for scaling
  const maxBeneficiaries = useMemo(() => 
    Math.max(...data.map(item => item.beneficiaries)), 
    [data]
  );

  // Get location data with coordinates
  const mapData = useMemo(() => {
    return data.map(item => {
      const coords = locationCoordinates[item.name];
      if (!coords) return null;
      
      const radius = Math.max(5000, (item.beneficiaries / maxBeneficiaries) * 50000);
      const intensity = Math.min(1, (item.beneficiaries / maxBeneficiaries) * 0.8 + 0.2);
      
      return {
        ...item,
        ...coords,
        radius,
        intensity
      };
    }).filter(Boolean);
  }, [data, maxBeneficiaries]);

  const totalBeneficiaries = useMemo(() => 
    data.reduce((sum, item) => sum + item.beneficiaries, 0), 
    [data]
  );

  const totalLocations = data.length;

  // PNG center coordinates
  const pngCenter = { lat: -6.3150, lng: 143.9555 };

  // Custom marker icon
  const createCustomIcon = (color) => {
    return L.divIcon({
      className: 'custom-marker',
      html: `
        <div style="
          background: ${color};
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            background: white;
            width: 6px;
            height: 6px;
            border-radius: 50%;
          "></div>
        </div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  };

  return (
    <div className="geographic-map">
      <div className="map-header">
        <h3 className="map-title">{title}</h3>
        <div className="map-stats">
          <div className="stat-item">
            <Users size={16} />
            <span>{totalBeneficiaries.toLocaleString()} Beneficiaries</span>
          </div>
          <div className="stat-item">
            <Target size={16} />
            <span>{totalLocations} Locations</span>
          </div>
        </div>
      </div>

      <div className="map-container" style={{ height }}>
        <MapContainer
          center={[pngCenter.lat, pngCenter.lng]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {mapData.map((location) => (
            <div key={location.name}>
              <Circle
                center={[location.lat, location.lng]}
                radius={location.radius}
                pathOptions={{
                  color: `rgba(139, 92, 246, ${location.intensity})`,
                  fillColor: `rgba(139, 92, 246, ${location.intensity * 0.3})`,
                  fillOpacity: 0.4,
                  weight: 2
                }}
              />
              
              <Marker
                position={[location.lat, location.lng]}
                icon={createCustomIcon(`rgba(139, 92, 246, ${location.intensity})`)}
                eventHandlers={{
                  click: () => setSelectedLocation(location.name)
                }}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
                  <div className="map-tooltip">
                    <strong>{location.name}</strong><br />
                    {location.beneficiaries.toLocaleString()} beneficiaries<br />
                    {location.programs} programs
                  </div>
                </Tooltip>
              </Marker>
            </div>
          ))}
        </MapContainer>
      </div>

      {/* Location details panel */}
      {selectedLocation && (
        <div className="location-details">
          <div className="details-header">
            <h4>{selectedLocation}</h4>
            <button 
              className="close-btn"
              onClick={() => setSelectedLocation(null)}
            >
              ×
            </button>
          </div>
          <div className="details-content">
            {mapData.find(loc => loc.name === selectedLocation) && (
              <>
                <div className="detail-item">
                  <span className="detail-label">Beneficiaries:</span>
                  <span className="detail-value">
                    {mapData.find(loc => loc.name === selectedLocation)?.beneficiaries.toLocaleString()}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Programs:</span>
                  <span className="detail-value">
                    {mapData.find(loc => loc.name === selectedLocation)?.programs}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Region:</span>
                  <span className="detail-value">
                    {mapData.find(loc => loc.name === selectedLocation)?.region}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Impact Level:</span>
                  <span className="detail-value">
                    {mapData.find(loc => loc.name === selectedLocation)?.intensity > 0.7 ? 'High' : 
                     mapData.find(loc => loc.name === selectedLocation)?.intensity > 0.4 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Coordinates:</span>
                  <span className="detail-value">
                    {mapData.find(loc => loc.name === selectedLocation)?.lat.toFixed(4)}, {mapData.find(loc => loc.name === selectedLocation)?.lng.toFixed(4)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Map legend */}
      <div className="map-legend-overlay">
        <div className="legend-title">Impact Level</div>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }}></div>
            <span>Low</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'rgba(139, 92, 246, 0.6)' }}></div>
            <span>Medium</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'rgba(139, 92, 246, 1)' }}></div>
            <span>High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicMap; 