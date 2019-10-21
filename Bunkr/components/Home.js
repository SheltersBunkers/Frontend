import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import tornado from '../assets/tornado.jpg';
import { useSelector }  from 'react-redux';
import {AsyncStorage} from 'react-native';


const Home = ({ history }) => {
    const [ toggle, setToggle ] = useState(false);
    const state = useSelector(state => state.user);

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.company}>DORTHY'S</Text>
                <Text style={styles.company1}>BUNKER</Text>
             </View>   
                <Button title="Login" onPress={() => history.push("/login")}/>
                <Button title="Register" onPress={() => history.push("/register")}/>
                <Button title="Map" onPress={() => history.push("/map")}/>
                <View style={styles.bottom}>
                <TouchableOpacity onPress={() => history.push("/map")}style={styles.madeButtons}><Text style={styles.center}>FIND A STORM SHELTER NOW!</Text></TouchableOpacity>
                </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    bottom: {
        flex: 1
    },
    top: {
        flex: 3
    },
    company: {
        fontSize: 60,
        marginTop: 100,
        textAlign: "center",
    },
    company1: {
        fontSize: 60,
        textAlign: "center",
        marginTop: -20
    },
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#6C6EA0"
    },
    madeButtons: {
        marginTop: 10,
        width: 350,
        height: 100,
        borderWidth: 3,
        borderColor: "#FF1053",
        textAlign: "center",
        borderRadius: 10,
        backgroundColor: "#C1CAD6",
        alignSelf: "center"
    },
    center: {
        textAlign: "center",
        fontSize: 30
    }
})

export default Home;