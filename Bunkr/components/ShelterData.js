import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { gray } from 'ansi-colors';



const ShelterData = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.bar}>Open</Text>
            <Text style={styles.shelterName}>Valley Center Methodist Church</Text>
            <Text style={styles.address}>560 N. Park St., Valley Center, KS</Text>
            <Text style={styles.distance}>2.5 miles away</Text>
            <Text style={styles.hairLineWidth}></Text>
            <Text style={styles.telephoneNum}>337-555-3848</Text>
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