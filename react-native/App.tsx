import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PharmacyList from './Pharmacy';
import CityList from './City';
import ZoneList from './Zone';
import PharmacyMap from './PharmacyMap';
// import PharmacyList from './Pharmacy';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* <ZoneList/> */}
      <PharmacyMap/>
      {/* <CityList/> */}
      {/* <PharmacyList /> */}
    </View>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
