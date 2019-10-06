import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Map from './components/Map';
import Home from './components/Home';
import ShelterData from './components/ShelterData';


export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={Map} />
          <Route exact path="/shelter" component={ShelterData} />
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1
  }
});
