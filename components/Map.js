import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';
// import locations from './data'; //a few locations to map over.
import MapView, { Marker } from 'react-native-maps';
import { get_locations, selected_shelter, set_user_local } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import * as Location from 'expo-location';

const Map = ({ history }) => {
    const [ ready, setReady ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState(null);
    const [ showShelter, setShowShelter ] = useState(false);
    
    const dispatch = useDispatch();

    const locations = useSelector(state => state.locations);
    const user = useSelector(state => state.user);
    const selectedShelter = useSelector(state => state.shelter);
    const user_location = useSelector(state => state.user_location);
    const user_granted_permission = useSelector(state => state.permissions)



    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          dispatch(set_user_local(location));
        })();
      },[]);
    

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
      dispatch(selected_shelter(shelter, history));

    }
    if (locations.length === 0){
        return <View><ActivityIndicator size="large" color="#0000ff" /></View>
    }
    
    return (
       
        <View>
        {(user_location.coords.latitude && user_location.coords.longitude) ?
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: user_location.coords.latitude,
                longitude: user_location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            > 
            <Marker 
                coordinate={{latitude: user_location.coords.latitude, longitude: user_location.coords.longitude}}
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
