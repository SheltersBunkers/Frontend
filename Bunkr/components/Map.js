import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native';
import ShelterData from './ShelterData';



const Map = ({ history }) => {

    const [ ready, setReady ] = useState(false)
    const [ where, setWhere ] = useState({
        lat: null,
        lng: null
    })
    const [ error, setError ] = useState(null)
    const [ test , setTest ] = useState('Here')
    const [ showShelter, setShowShelter ] = useState(false)

    useEffect(() => {
        let geoOptions={
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 20 //since they would be moving would need to grab constantly so every 30 seconds.
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


    return (
        <View>
            <Text>MAP</Text>
            <Text>{where.lat}</Text>
            <Text>{where.lng}</Text>
            <Button title="Home Page" onPress={() => history.push("/")} />
            <Button onPress={ () => setShowShelter(!showShelter) } title="Show/Hide Shelter"/> 
            {(showShelter) ? <ShelterData /> : null }
        </View>
    )
}

export default Map;