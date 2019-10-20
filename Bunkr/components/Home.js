import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import tornado from '../assets/tornado.jpg';

const Home = ({ history }) => {
    const [ toggle, setToggle ] = useState(false);

    return (
        <View style={{width: '100%', height: '100%'}}>
            <ImageBackground source={tornado} style={{width: '110%', height: '110%'}}>
                <View style={styles.top}>
                    <Text style={styles.company}>Dorthy's</Text> 
                    <Text style={styles.company1}>Bunkr</Text>
                </View>
                {/* <Button title="Map" onPress={() => history.push("/map")}/> */}
                
                <Text></Text>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    company: {
        fontSize: 80,
    },
    company1: {
        fontSize: 80,
        marginLeft: 20,
        marginTop: -30
    },
    top: {
        flex: 3,
        marginTop: 70
    }

})

export default Home;