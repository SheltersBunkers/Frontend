import React, { useEffect, useState } from 'react';
import {View, Text, Button} from 'react-native';



const Map = ({ history }) => {

    const [ ready, setReady ] = useState(false)
    const [ where, setWhere ] = useState({
        lat: null,
        lng: null
    })
    const [ error, setError ] = useState(null)
    const [ test , setTest ] = useState('Here')

    useEffect(() => {
        let geoOptions={
            enableHighAccuracy: true,
            timeOut: 20000,
            maximumAge: 60 * 60 //since they would be moving would need to grab constantly so every 30 seconds.
        };
        setReady(false)
        setError(null)
        navigator.geolocation.getCurrentPosition(geoSuccess, geoFailure, geoOptions);
    }, [])

    geoSuccess = (position) => {
        // console.log(coords.latitude)
        setReady(true)
        setWhere({ lat: coords.latitude, lng: coords.longitude })
    }
    geoFailure = (err) => {
        setWhere({ lat: "50", lng: "50"})
        setError(true)
    }

    return (
        <View>
            <Text>HI</Text>
            <Text>{(where.lat) ? where.lat : 'HI'}</Text>
            <Text>{where.lng}</Text>
            <Text>{error}</Text>
            <Text>MAP</Text>
            <Button title="Home Page" onPress={() => history.push("/")} />
        </View>
    )
}

export default Map;