import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator} from 'react-native';
import ShelterData from './ShelterData';
import locations from './data'; //a few locations to map over.
import MapView, { Marker } from 'react-native-maps';


const Map = ({ history }) => {
    const [ selectedShelter, setSelectedShelter ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const [ where, setWhere ] = useState({
        lat: null,
        lng: null
    });
    const [ error, setError ] = useState(null);
    const [ showShelter, setShowShelter ] = useState(false);

    useEffect(() => {
        let geoOptions={
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 20 
        };
        setReady(false)
        setError(null)
        navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
    }, [])

    callGeo = () => { //going to use to call ever so often to get location update.// escpecially if speed is greater than 1.
        let geoOptions={
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 20 //since they would be moving would need to grab constantly so every 30 seconds.
        }
        setReady(false)
        setError(null)
        navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
    }

    geoSuccess = (position) => {
        setReady(true)
        setWhere({ lat: position.coords.latitude, lng: position.coords.longitude })

    }
    geoFailure = (err) => {
        setError(true)
    }
    showIndividualShelter = (shelter) => {
        setSelectedShelter(shelter);

    }

    return (
       
        <View>
        {/* <Button onPress={() => history.push("/")} title="Go Back" /> */}
        {(selectedShelter) ? history.push('/shelter', {id: selectedShelter.id, name: selectedShelter.name, lat: selectedShelter.lat, lng: selectedShelter.lng, street_num: selectedShelter.street_num, road: selectedShelter.road, city: selectedShelter.city, state: selectedShelter.state, zip_code: selectedShelter.zip_code, your_lat: where.lat, your_lng: where.lng }) :  
        (where.lat && where.lng) ?
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: where.lat,
                longitude: where.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            >
            <Marker 
                coordinate={{latitude: where.lat, longitude: where.lng}}
                title="Your Location" />
           {locations.map(marker => (
                <Marker
                    key={marker.id}
                    coordinate={{latitude: marker.lat, longitude: marker.lng}}
                    title={marker.name}
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
