import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const locations = [
    {
      title: 'Gastronify Reina Mercedes',
      coordinates: {
        latitude: 40.7128,
        longitude: -74.0060,
      },
    },
    {
      title: 'Gastronify Casco Antiguo',
      coordinates: {
        latitude: 40.7120,
        longitude: -74.0010,
      },
    },
    {
      title: 'Gastronify Nervion',
      coordinates: {
        latitude: 40.7130,
        longitude: -74.0050,
      },
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.7128,
          longitude: -74.0060,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location, index) => (
          <Marker
            key={index}
            title={location.title}
            coordinate={location.coordinates}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
