import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ZoneList: React.FC = () => {
  const zones = [
    { name: 'Zone A', icon: 'map-marker' },
    { name: 'Zone B', icon: 'map-marker' },
    { name: 'Zone C', icon: 'map-marker' },
    { name: 'Zone D', icon: 'map-marker' },
    { name: 'Zone E', icon: 'map-marker' },
    { name: 'Zone F', icon: 'map-marker' },
    { name: 'Zone G', icon: 'map-marker' },
    { name: 'Zone H', icon: 'map-marker' },
    { name: 'Zone I', icon: 'map-marker' },
    { name: 'Zone J', icon: 'map-marker' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Liste des Zones existantes</Text>
      </View>
      <ScrollView>
        <View style={styles.zoneRow}>
          {zones.map((zone, index) => (
            <View key={index} style={styles.zoneContainer}>
              <View style={styles.zoneIconContainer}>
                <MaterialCommunityIcons name="map-marker"  size={24} color="black" />
              </View>
              <Text style={styles.zoneName}>{zone.name}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    padding: 20,
    backgroundColor: '#fff',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 15,
  },
  zoneRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  zoneContainer: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 15,
    marginBottom: 30,
    marginHorizontal: 9, // Ajout de l'espace horizontal entre les rectangles
  },
  zoneIconContainer: {
    marginRight: 15,
  },
  zoneName: {
    fontSize: 16,
  },
});

export default ZoneList;
