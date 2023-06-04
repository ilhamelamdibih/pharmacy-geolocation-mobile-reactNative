import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ZoneList: { cityName: string };
  PharmacyList: { zoneName: string; cityName: string };
};

type ZoneListScreenRouteProp = RouteProp<RootStackParamList, 'ZoneList'>;
type ZoneListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ZoneList'>;

interface Zone {
  id: number;
  nom: string;
}

interface ZoneListProps {
  route: ZoneListScreenRouteProp;
  navigation: ZoneListScreenNavigationProp;
}

const ZoneList: React.FC<ZoneListProps> = ({ route, navigation }) => {
  const { cityName } = route.params;
  const [zones, setZones] = useState<Zone[]>([]);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await fetch(`http://192.168.1.40:8080/api/villes/${cityName}/zones`);
        const data = await response.json();
        setZones(data);
      } catch (error) {
        console.error('Error fetching Zones: ', error);
      }
    };

    fetchZones();
  }, [cityName]);

  const handleZonePress = (zoneName: string) => {
    navigation.navigate('PharmacyList', { cityName, zoneName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Liste des Zones existantes</Text>
      </View>
      <ScrollView>
        {zones.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="information-outline" size={48} color="gray" style={styles.icon} />
            <Text style={styles.emptyMessage}>Aucune zone disponible</Text>
          </View>
        ) : (
          <View style={styles.zoneRow}>
            {zones.map((zone, index) => (
              <TouchableOpacity
                key={zone.id}
                style={styles.zoneContainer}
                onPress={() => handleZonePress(zone.nom)}
              >
                <View style={styles.zoneIconContainer}>
                  <MaterialCommunityIcons name="map-marker" size={24} color="black" />
                </View>
                <Text style={styles.zoneName}>{zone.nom}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
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
    marginHorizontal: 9,
  },
  zoneIconContainer: {
    marginRight: 15,
  },
  zoneName: {
    fontSize: 16,
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

export default ZoneList;
