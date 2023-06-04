// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import PharmacyList from './Pharmacy';
// import CityList from './City';
// import ZoneList from './Zone';
// import PharmacyMap from './PharmacyMap';
// import ConsultPharmacies from './ConsultPharmacies';
// // import PharmacyList from './Pharmacy';

// export default function App() {
//   return (
//     <View style={{ flex: 1 }}>
//       {/* <ZoneList/> */}
//       {/* <PharmacyMap/> */}
//       {/* <CityList/> */}
//       {/* <PharmacyList /> */}
//       <ConsultPharmacies/>
//     </View>
//     // <View style={styles.container}>
//     //   <Text>Open up App.tsx to start working on your app!</Text>
//     //   <StatusBar style="auto" />
//     // </View>
//   );
// }


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CityList from './City';
import ZoneList from './Zone';
import PharmacyList from './Pharmacy';
import PharmacyMap from './PharmacyMap';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CityList" component={CityList} />
        <Stack.Screen name="ZoneList" component={ZoneList} />
        <Stack.Screen name="PharmacyList" component={PharmacyList} />
        <Stack.Screen name="PharmacyMap" component={PharmacyMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
