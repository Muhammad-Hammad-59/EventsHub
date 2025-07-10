"use client";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function LocationCard({ location }) {
  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(true);
 console.log("location in card", location.address);
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location.address)}`
        );
        const data = await response.json();
        if (data.length > 0) {
          setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
        } else {
          console.warn("Location not found");
        }
      } catch (err) {
        console.error("Geocoding error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [location.address]);

  return (
    <div className="border p-6 rounded-xl shadow-sm bg-backgroundSecondary w-full">
      <h3 className="text-lg font-semibold mb-4">Location</h3>
      <hr />
      <p className="mt-4 text-sm text-gray-700">{location.address}</p>

      <div className="mt-4 w-full">
        {loading ? (
          <p className="text-sm text-gray-500">Loading map...</p>
        ) : coords ? (
          <MapContainer
            center={coords}
            zoom={15}
            scrollWheelZoom
            zoomControl={false}
             className="rounded-xl w-full h-[200px]  z-0"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coords}>
              <Popup>{location.address}</Popup>
            </Marker>
            <ZoomControl position="bottomright" />
          </MapContainer>
        ) : (
          <p className="text-sm text-red-500">Could not locate address</p>
        )}
      </div>
    </div>
  );
}
