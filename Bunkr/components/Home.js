import React from 'react';
import {View, Text, Button} from 'react-native';

const Home = ({ history }) => {
    return (
        <View>
        <Text>Bunkr</Text>
        <Button title="Map" onPress={() => history.push("/map")}/>
    </View>
    )
};


export default Home;