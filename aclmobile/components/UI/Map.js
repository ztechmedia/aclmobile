import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const MapScreen = ({ location, style }) => {
  const mapRegion = {
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const markerCoordinates = {
    latitude: location.lat,
    longitude: location.lng,
  };

  return (
    <MapView
      style={{ ...style }}
      provider={PROVIDER_GOOGLE}
      initialRegion={mapRegion}
    >
      {markerCoordinates && (
        <Marker title="Picked Location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

export default MapScreen;
