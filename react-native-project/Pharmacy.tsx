import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Pharmacy {
  id: number;
  nom: string;
  image: string;
  adresse: string;
}

interface PharmacyListProps {
  route: {
    params: {
      cityName: string;
      zoneName: string;
    };
  };
  navigation: any;
}

const PharmacyList: React.FC<PharmacyListProps> = ({ route, navigation }) => {
  const { cityName, zoneName } = route.params;
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch(
          `http://192.168.1.40:8080/api/villes/${cityName}/zones/${zoneName}/pharmacies`
        );
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, [cityName, zoneName]);

  const handleGoToMap = () => {
    navigation.navigate('PharmacyMap', { zoneName, cityName });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Consult Pharmacies</Text>
        <TouchableOpacity style={styles.mapButton} onPress={handleGoToMap}>
          <MaterialCommunityIcons name="map" size={24} color="white" />
          <Text style={styles.mapButtonText}>Map</Text>
        </TouchableOpacity>
      </View>
      {pharmacies.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="information-outline" size={48} color="gray" style={styles.icon} />
          <Text style={styles.emptyMessage}>Aucune pharmacie disponible</Text>
        </View>
      ) : (
        pharmacies.map((pharmacy, index) => (
          <View key={pharmacy.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: pharmacy.image }} style={styles.image} />
            </View>
            <Text style={styles.name}>{pharmacy.nom}</Text>
            <Text style={styles.adresse}>{pharmacy.adresse}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  mapButtonText: {
    marginLeft: 4,
    color: 'white',
    fontSize: 16,
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 16,
  },
  imageContainer: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  name: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
  },
  adresse: {
    paddingBottom: 6,
    textAlign: 'center',
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

export default PharmacyList;
