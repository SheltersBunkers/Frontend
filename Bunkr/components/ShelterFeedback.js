import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView } from 'react-native';


const ShelterFeedback = ({history}) => {
    const [ name, setName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ city, setCity ] = useState('');
    const [ state, setState ] = useState('');

    return (
        <SafeAreaView>
            <TextInput  placeholder="Shelter Name" style={styles.input} onChangeText={text => setName(text)} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#D0D0D0"
    },
})


export default ShelterFeedback;