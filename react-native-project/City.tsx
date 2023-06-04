import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface City {
  id: number;
  nom: string;
  icon: 'city';
}

interface CityListProps {
  navigation: NavigationProp<Record<string, object | undefined>>;
}

const CityList: React.FC<CityListProps> = ({ navigation }) => {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://192.168.1.40:8080/api/villes');
        const data = await response.json();
        setCities(data as City[]);
      } catch (error) {
        console.error('Error fetching Cities: ', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityPress = (cityName: string) => {
    navigation.navigate('ZoneList', { cityName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Villes existé</Text>
      <ScrollView>
        {cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.cityContainer}
            onPress={() => handleCityPress(city.nom)}
          >
            <MaterialCommunityIcons name="city-variant-outline" size={24} color="black" />
            <Text style={styles.cityName}>{city.nom}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgreen',
    paddingVertical: 30,
  },
  cityName: {
    marginLeft: 15,
    fontSize: 16,
  },
});

export default CityList;
