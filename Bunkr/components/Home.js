import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import tornado from '../assets/tornado.jpg';

const Home = ({ history }) => {
    const [ toggle, setToggle ] = useState(false);

    return (
        <View style={{width: '100%', height: '100%'}}>
            <ImageBackground source={tornado} style={{width: '110%', height: '110%'}}>
                <View style={styles.top}>
                    
                </View>
                <Button title="Map" onPress={() => history.push("/map")}/>
                
                <Text style={styles.cred}>Photo: Nikolas Noonan</Text>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    
    top: {
        flex: 6,
        marginTop: 70
    },
    cred: {
        flex:1,
        fontSize: 15,
        color: "white"
    }

})

export default Home;