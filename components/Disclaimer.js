import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity, Platform } from 'react-native';


const Disclaimer = ({ history }) => {
    return (
        <View style={styles.page}>
            <SafeAreaView>
            <View style={styles.top}>
                <Text style={styles.company}>Dorothy's</Text>
                <Text style={styles.company1}>Bunker</Text>
            </View>   
            <View>
                <Text style={styles.blueColor}>We can not guarantee that any of these are actually shelters that open to the public.  Comments posted on the shelters are from users who have no affliation with Dorothy's Bunker.  The information on the shelters were found various places on the internet and were not checked to make sure they were in existence or actually open to the public.  Our goal is to connect users with information and to help them make their own decisions with the information provided. We are not responsible for the shelters or the choices you or other users make.  In severe weather sometimes the best option is to stay put.  It is always best to arrive early at public shelters that are open.  Don't wait until its too late and get caught in the severe weather.  For more information and severe weather tips search fema.gov.  Good Luck!</Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => history.push('/')} style={styles.madeButtons}><Text style={styles.center}>Home</Text></TouchableOpacity>
            </View>
            </SafeAreaView>
        </View>

    )
}

const styles = StyleSheet.create({
    madeButtons: {
        marginTop: 15,
        width: 200,
        height: 60,
        borderRadius: 10,
        backgroundColor: "#3366CC",
        alignSelf: "center"
    },
    center: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 15,
        color: "white"
    },
    company: {
        fontSize: 50,
        marginTop:  Platform.OS === "ios" ? 15 : 40,
        textAlign: "center",
        color: "#3366CC"
    },
    company1: {
        fontSize: 50,
        textAlign: "center",
        marginTop: -20,
        color: "#3366CC"
    },
    blueColor: {
        color: "#3366CC",
        fontSize: 18,
        marginLeft: 15,
        marginRight: 15
    },
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#E8E8E8"
    },
    buttons: {
        width: 80, 
        height: 50,
        fontSize: 20,
        alignSelf: "center"
    }
})

export default Disclaimer;