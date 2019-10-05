import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { gray } from 'ansi-colors';
import MapView, { Marker } from 'react-native-maps';

 
// id: 1,
    
// lat: 34.5433261,

// lng: -77.43597869999999,

// name: "Dixon Middle School",

// street_num: "118",

// road: "Ridge Field Avenue",

// city: "Sneads Ferry",

// state: "NC ",

// zip_code: "28445"


const ShelterData = (props) => {
    return (
        <View>
            <View style={styles.map}>
                <MapView
                        style={styles.map}
                        initialRegion={{
                        latitude: props.shelter.lat,
                        longitude: props.shelter.lng,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        }}
                    >
                    <Marker 
                        coordinate={{latitude: props.shelter.lat, longitude: props.shelter.lng}}
                        title={props.shelter.name} />
                </MapView> 
            </View>
        <View style={styles.container}>
            <Text style={styles.bar}>Open</Text>
            <Text style={styles.shelterName}>{props.shelter.name}</Text>
            <Text style={styles.address}>{props.shelter.street_num} {props.shelter.road}, {props.shelter.city}, {props.shelter.state}</Text>
            <Text style={styles.distance}>2.5 miles away</Text>
            <Text style={styles.hairLineWidth}></Text>
            <Text style={styles.telephoneNum}>{(props.shelter.telephone) ? props.shelter.telephone : "No Phone Number" }</Text>
            <Text style={styles.hairLineWidth}></Text>
            <Text style={styles.comments}>COMMENTS</Text>
            <View style={styles.flexing}>
                <Text style={styles.users}>todd</Text>
                <Text style={styles.date}>9/26/19 7:10PM</Text>
            </View>
            
            <Text style={styles.comments}>This shelter is open!</Text>
            <Text style={styles.users}>chase</Text><Text>9/26/19 7:10PM</Text>
            <Text style={styles.comments}>This shelter is open!</Text>
            <Text style={styles.users}>kayla</Text><Text>9/26/19 7:10PM</Text>
            <Text style={styles.comments}>This shelter is open! Bring snacks! And a phone charger!</Text>
            
        </View>
    </View>
    )
}

const styles =  StyleSheet.create({
    map: {
        height: 400,
        width: 400
    },
    container: {
        height: 500,
        width: 400,
    },
    bar: {
        backgroundColor: "black",
        color: "green",
        height: 60,
        fontSize: 25,
        textAlign: "center",
        paddingTop: 8
    },
    shelterName: {
        fontSize: 20,
        marginTop: 10,
        textAlign: "center"
    },
    address: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 16
    },
    distance: {
        color: "gray",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    hairLineWidth: {
        width: 400,
        height: 1,
        backgroundColor: "black"
    },
    telephoneNum: {
        color: "teal",
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    users: {
        color: "gray",
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10
    },
    date: {
        color: "gray",
        fontSize: 16,
        textAlign: "right",
        position: "absolute",
        right: 10
    },
    comments: {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    flexing: {
        flex: 1,
        flexDirection: "row"
    }
})


export default ShelterData;