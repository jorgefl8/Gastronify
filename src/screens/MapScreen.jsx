import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import theme from "../theme.js";

const MapScreen = ({ back }) => {
  const locations = [
    {
      city: 'Sevilla',
      places: [
        {
          title: 'Gastronify Reina Mercedes',
          coordinates: {
            latitude: 37.357762,
            longitude: -5.986322,
          },
        },
        {
          title: 'Gastronify Casco Antiguo',
          coordinates: {
            latitude: 37.388928,
            longitude: -5.995247,
          },
        },
        {
          title: 'Gastronify Nervion',
          coordinates: {
            latitude: 37.382184,
            longitude: -5.975838,
          },
        },
      ],
    },
    {
      city: 'Madrid',
      places: [
        {
          title: 'Gastronify Madrid Centro',
          coordinates: {
            latitude: 40.416775,
            longitude: -3.703790,
          },
        },
      ],
    },
    {
      city: 'Barcelona',
      places: [
        {
          title: 'Gastronify Barcelona Ciudad',
          coordinates: {
            latitude: 41.385063,
            longitude: 2.173404,
          },
        },
      ],
    },
    {
      city: 'Valencia',
      places: [
        {
          title: 'Gastronify Valencia Centro',
          coordinates: {
            latitude: 39.469907,
            longitude: -0.376288,
          },
        },
      ],
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.3891,
    longitude: -5.9845,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const onLocationPress = (location) => {
    setMapRegion({
      ...mapRegion,
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    });
    setSelectedLocation(location);
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Locations</Text>
        <TouchableOpacity onPress={() => back()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <MapView
          style={styles.map}
          region={mapRegion}
        >
          {locations.map((city, cityIndex) => (
            city.places.map((location, locationIndex) => (
              <Marker
                key={`${cityIndex}-${locationIndex}`}
                title={location.title}
                coordinate={location.coordinates}
                pinColor={selectedLocation === location ? 'blue' : 'red'}
              />
            ))
          ))}
        </MapView>
        <View style={styles.locationContainer}>
          {locations.map((city, cityIndex) => (
            <View key={cityIndex}>
              <Text style={styles.cityTitle}>Locations in {city.city}</Text>
              {city.places.map((location, locationIndex) => (
                <TouchableOpacity
                  key={`${cityIndex}-${locationIndex}`}
                  style={styles.locationItem}
                  onPress={() => onLocationPress(location)}
                >
                  <Text style={styles.locationTitle}>{location.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'left',
  },
  map: {
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: 'column',
  },
  locationItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 16,
  },
  cityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
});

export default MapScreen;
