import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';
import Map from './components/Map';
import Home from './components/Home';
import ShelterData from './components/ShelterData';
import Register from './components/Register';
import Login from './components/Login';
import  store  from './store';
import { Provider } from 'react-redux';
import ShelterFeedback from './components/ShelterFeedback';
import Disclaimer from './components/Disclaimer';


export default function App() {
  return (
    <Provider store={store}>
      <NativeRouter>
        <View style={styles.container}>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route path ="/login" component={Login} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/shelter" component={ShelterData} />
            <Route path="/disclaimer" component={Disclaimer} />
            <Route path="/shelterfeedback" component={ShelterFeedback} />
        </View>
      </NativeRouter>
    </Provider>
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
