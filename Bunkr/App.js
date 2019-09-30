import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Map from './components/Map';
import Home from './components/Home';


export default function App() {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/map" component={Map} />
            
        </Switch>
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
