import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import "mapbox-gl/dist/mapbox-gl.css";
import { dialogClasses } from "@mui/material";

const Map = ({
  locations = [
    "Shilphata,maharashtra",
    "Pune,maharashtra",
    "Kaygaon,maharashtra",
    "Shegaon,maharashtra",
    "Diva,maharashtra",
    "Mulund,maharashtra",
    "Ambivali,maharashtra",
  ],
}) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  const markersRef = useRef([]);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGVlZWVlZWVlcCIsImEiOiJjbHoydHIybjIydzR3MmpzZ2d2MGdmY3R1In0.qX3n7ZP6LZj3SQMKlwkTmg";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [72.965813, 19.1658558], // starting position [lng, lat]
      zoom: 9, // starting zoom
      style: "mapbox://styles/mapbox/navigation-night-v1", // map style
      logoPosition: "bottom-right",
    });

    mapRef.current = map;

    // Initialize the geocoding service
    const geocodingClient = MapboxGeocoding({
      accessToken: mapboxgl.accessToken,
    });

    // Function to add a marker
    const addMarker = (coordinates) => {
      if (coordinates && coordinates.length === 2) {
        // Add default marker to the map
        const marker = new mapboxgl.Marker()
          .setLngLat(coordinates) // marker position [lng, lat]
          .addTo(map);
        markersRef.current.push(coordinates);
      } else {
        console.error("Invalid coordinates:", coordinates);
      }
    };

    // Get coordinates for all locations and fit map bounds
    const fitMapToBounds = () => {
      if (markersRef.current.length) {
        const bounds = new mapboxgl.LngLatBounds();
        markersRef.current.forEach((coords) => {
          if (coords) {
            bounds.extend(coords);
          }
        });
        map.fitBounds(bounds, { padding: 50 });
      }
    };

    // Loop through the locations array
    const geocodePromises = locations.map((location) =>
      geocodingClient
        .forwardGeocode({
          query: location,
          limit: 1,
        })
        .send()
    );

    Promise.all(geocodePromises)
      .then((responses) => {
        responses.forEach((response) => {
          const match = response.body;
          if (match.features.length) {
            const coordinates = match.features[0].center;
            // Add marker to the map at the location's coordinates
            addMarker(coordinates);
          }
        });
        // Adjust the map to fit all markers after all markers have been added
        fitMapToBounds();
      })
      .catch((error) => {
        console.error("Error geocoding location:", error);
      });

    // Clean up on unmount
    return () => map.remove();
  }, [locations]);

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div ref={mapContainerRef} className="w-[100%] h-[100%] rounded-[10px]" />
    </div>
  );
};

export default Map;
