import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PharmacyMap: React.FC = () => {
    const [latitude, setLatitude] = useState('31.6306');
    const [longitude, setLongitude] = useState('-7.9891');

  const handleLatitudeChange = (value: string) => {
    setLatitude(value);
  };

  const handleLongitudeChange = (value: string) => {
    setLongitude(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>L'emplacement de la pharmacie</Text>
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: Number(latitude),
            longitude: Number(longitude),
          }}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 10,
  },
  inputLabel: {
    marginRight: 10,
  },
  inputIconContainer: {
    marginRight: 5,
  },
  input: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default PharmacyMap;
