import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';
// import locations from './data'; //a few locations to map over.
import MapView, { Marker } from 'react-native-maps';
import { get_locations, ddropUserropUser } from '../actions'
import { useSelector, useDispatch }  from 'react-redux';
import * as Location from 'expo-location';

const Map = ({ history }) => {
    const [ ready, setReady ] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [ showShelter, setShowShelter ] = useState(false);
    // const locations = useSelector(state => state.locations);

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);



    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setUserLocation(location);
        })();
      }, []);
    

    useEffect(() => {
        dispatch(get_locations())
    }, [])

    useEffect(() =>{
        if (user) {
            if (user.expiration < Date.now()) {
            dispatch(dropUser());
        }
        }
        
    })

    
    showIndividualShelter = (shelter) => {
       dispatch(selectedShelter(shelter));

    }
    if (locations.length === 0){
        return <View><ActivityIndicator size="large" color="#0000ff" /></View>
    }
    console.log(userLocation)
    return (
       
        <View>
        {(selectedShelter) && history.push('/shelter')}
        (userLocation.longitude && userLocation.latitude) ?
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
            <Marker 
                coordinate={{latitude: userLocation.latitude, longitude: userLocation.longitude}}
                title="Your Location" />
           {locations.map(marker => (
                <Marker
                    key={marker.id}
                    coordinate={{latitude: marker.lat, longitude: marker.lng}}
                    title={marker.name}
                    pinColor={"blue"}
                    onPress={() => showIndividualShelter(marker) }
                /> 
                    
            ))} 
            </MapView> 
            :
            <ActivityIndicator size="large" color="#0000ff" />
        }
            
        </View>
           
        
    ) 
}

const styles = StyleSheet.create({
    map: {
      flex: 3,
      width: 1000
    }
  });


export default Map;


{/* <Marker
  coordinate={marker.latlng}
  image={require('../assets/pin.png')}
/> */}  //to render with custom marker.
