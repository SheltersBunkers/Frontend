import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { gray } from 'ansi-colors';

 
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
        <View style={styles.container}>
            <Text style={styles.bar}>Open</Text>
            <Text style={styles.shelterName}>{props.shelter.name}</Text>
            <Text style={styles.address}>{props.shelter.street_num} {props.shelter.road}, {props.shelter.city}, {props.shelter.state}</Text>
            <Text style={styles.distance}>2.5 miles away</Text>
            <Text style={styles.hairLineWidth}></Text>
            <Text style={styles.telephoneNum}>{(props.shelter.telephone) ? props.shelter.telephone : null }</Text>
            <Text style={styles.hairLineWidth}></Text>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        height: 500,
        width: 400,
        top: 80,
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
    }
})


export default ShelterData;