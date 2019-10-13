import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';



const GetDirections = ({ history, location }) => {
    const shelter = location.state;
    const [ ready, setReady ] = useState(false);
    const [ where, setWhere ] = useState({
        lat: null,
        lng: null
    });
    const [ error, setError ] = useState(null);

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
    const coordinates = [
        {
            latitude: shelter.your_lat,
            longitude: shelter.your_lng
        },
        {
            latitude: shelter.lat,
            longitude: shelter.lng
        }
    ]
        
    
    const Key = "";

    return (
        <MapView style={styles.map} 
            initialRegion={{
            latitude: shelter.your_lat,
            longitude: shelter.your_lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}>
            <MapView.Marker coordinate={coordinates[0]} />
            <MapView.Marker coordinate={coordinates[1]} />
            <MapViewDirections
                origin={coordinates[0]}
                destination={coordinates[1]}
                strokeWidth={3}
                strokeColor="red"
                apikey={Key}
                />
        </MapView>
    )
}


const styles = StyleSheet.create({
    map: {
      flex: 3,
      width: 1000
    }
  });


export default GetDirections;
