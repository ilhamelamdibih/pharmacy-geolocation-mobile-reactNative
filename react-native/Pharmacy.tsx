import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

interface Pharmacy {
  id: number;
  nom: string;
  image: string;
}

const PharmacyList: React.FC = () => {

const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);

useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('http://192.168.43.31:8080/api/pharmacies');
        const data = await response.json();
        setPharmacies(data);
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, []);
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {pharmacies.map((pharmacy, index) => (
        <View key={pharmacy.id} style={styles.card}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: pharmacy.image }} style={styles.image} />
          </View>
          <Text style={styles.name}>{pharmacy.nom}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
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
});

export default PharmacyList;
