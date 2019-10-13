import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Map from './components/Map';
import Home from './components/Home';
import ShelterData from './components/ShelterData';
import GetDirections from './components/GetDirections';
// import  store  from './store';
// import { Provider } from 'react-redux';



export default function App() {
  return (
    // <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
            <Route exact path="/" component={Home} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/shelter" component={ShelterData} />
            <Route exact path="/getdirections" component={GetDirections} />
        </View>
      </NativeRouter>
    // </Provider>
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
