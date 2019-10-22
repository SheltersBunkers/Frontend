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
                <Text style={styles.company}>Dorothy's</Text>
                <Text style={styles.company1}>Bunker</Text>
             </View>   
             
             <View style={styles.topMid}>

             </View>
             <View style={styles.topBot}>
                 <TouchableOpacity onPress={() => history.push("/map")}style={styles.madeButtons}><Text style={styles.center}>Find a storm shelter</Text></TouchableOpacity>
             </View> 
    
                <View style={styles.bottom}>
                <View style={{marginBottom: 15}}>
                    <TouchableOpacity title="Login" onPress={() => history.push("/login")}><Text style={styles.log}>Login</Text></TouchableOpacity>
                </View>
                    <TouchableOpacity title="Register" onPress={() => history.push("/register")} ><Text style={styles.reg}>Register</Text></TouchableOpacity>
                </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    reg: {
        color: "#3366CC",
        textAlign: "center",
        fontSize: 15
    },
    log: {
        color: "#3366CC",
        textAlign: "center",
        fontSize: 15,
        marginBottom: 10
    },
    bottom: {
        flex: 1
    },
    top: {
        flex: 1
    },
    topMid: {
        flex: 1
    },
    topBot: {
        flex: 1
    },
    company: {
        fontSize: 60,
        marginTop: 100,
        textAlign: "center",
        color: "#3366CC"
    },
    company1: {
        fontSize: 60,
        textAlign: "center",
        marginTop: -20,
        color: "#3366CC"
    },
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#D0D0D0"
    },
    madeButtons: {
        marginTop: 10,
        width: 350,
        height: 100,
        borderRadius: 5,
        backgroundColor: "#3366CC",
        alignSelf: "center",
    },
    center: {
        textAlign: "center",
        fontSize: 30,
        color: "white",
        paddingTop: 30
    }
})

export default Home;