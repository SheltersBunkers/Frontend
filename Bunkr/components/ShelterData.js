import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import { gray } from 'ansi-colors';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import  Map  from './Map';
import { withRouter } from 'react-router-native';
import locations from './data';


const ShelterData = ({ history, location }) => {

    const shelter = location.state;
    return (
        <View>
         <View style={styles.top} >
            <Ionicons name="close-0" size={30} onPress={() => history.push('/map')} style={styles.icon} />
                <View style={styles.map} pointerEvents="none"> 
                        <MapView
                                style={styles.map}
                                initialRegion={{
                                latitude: shelter.lat,
                                longitude: shelter.lng,
                                latitudeDelta: .004,
                                longitudeDelta: .004,
                                }}
                            >
                            <Marker 
                                coordinate={{latitude: shelter.lat, longitude: shelter.lng}}
                                title={shelter.name} />
                        </MapView> 
                    </View>
                </View>
            <View style={styles.container}>
                <Text style={styles.bar}>Open</Text>
                <Text style={styles.shelterName}>{shelter.name}</Text>
                <Text style={styles.address}>{shelter.street_num} {shelter.road}, {shelter.city}, {shelter.state}</Text>
                <Text style={styles.distance}>2.5 miles away</Text>
                <Text style={styles.hairLineWidth}></Text>
                <Text style={styles.telephoneNum}>{(shelter.telephone) ? shelter.telephone : "No Phone Number" }</Text>
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
    top: {
        flex: 2
    },
    icon: {
        marginLeft: 30,
        marginTop: 50,
        zIndex: 10
    },
    map: {
        flex: 1
    },
    container: {
        flex: 3
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


export default withRouter(ShelterData);