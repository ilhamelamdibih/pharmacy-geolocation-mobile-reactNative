import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ZoneList: { cityName: string };
  PharmacyList: { zoneName: string; cityName: string };
};

type PharmacyListScreenRouteProp = RouteProp<RootStackParamList, 'PharmacyList'>;
type PharmacyListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PharmacyList'>;

interface PharmacyListProps {
  route: PharmacyListScreenRouteProp;
  navigation: PharmacyListScreenNavigationProp;
}

const ConsultPharmacies: React.FC<PharmacyListProps> = ({ route, navigation }) => {
  const { zoneName, cityName } = route.params;

  const handleGoToMap = () => {
    // navigation.navigate('PharmacyMap', { zoneName, cityName });
  };

  const handleSelectPharmacy = () => {
    navigation.navigate('PharmacyList', { zoneName, cityName });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Consult pharmacies</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.goToMapButton]}
          onPress={handleGoToMap}
        >
          <Text style={styles.buttonText}>Go to Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.selectPharmacyButton]}
          onPress={handleSelectPharmacy}
        >
          <MaterialCommunityIcons name="hospital" size={20} color="blue" />
          <Text style={styles.buttonText}>Select a Pharmacy</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: '80%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToMapButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'orange',
  },
  selectPharmacyButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'blue',
  },
  buttonText: {
    marginLeft: 5,
    color: 'black',
  },
});

export default ConsultPharmacies;
