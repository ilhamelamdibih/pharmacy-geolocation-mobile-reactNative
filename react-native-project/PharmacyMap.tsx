import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

interface Pharmacy {
  id: number;
  latitude: number;
  longitude: number;
}

const PharmacyMap: React.FC = () => {
  const route = useRoute();
  const { cityName, zoneName } = route.params as { cityName: string; zoneName: string };
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch(`http://192.168.1.40:8080/api/villes/${cityName}/zones/${zoneName}/pharmacies`);
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, [cityName, zoneName]);

  // Check if there are any pharmacies available
  if (pharmacies.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="information-outline" size={10} color="gray" style={styles.icon} />
          <Text style={styles.emptyMessage}>Aucune pharmacie disponible</Text>
        </View>
      </View>
    );
  }

  // Set the initial region to the coordinates of the first pharmacy
  const initialRegion = {
    latitude: pharmacies[0].latitude,
    longitude: pharmacies[0].longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>L'emplacement des pharmacies</Text>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        zoomEnabled={true}
        zoomControlEnabled={true}
      >
        {pharmacies.map((pharmacy) => (
          <Marker
            key={pharmacy.id}
            coordinate={{
              latitude: pharmacy.latitude,
              longitude: pharmacy.longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 15,
  },
  map: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: 'gray',
  },
});

export default PharmacyMap;
