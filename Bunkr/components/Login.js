import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput } from 'react-native';
import { login, register } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';

const Login = () => {
    const [ toggle, setToggle ] = useState(false);
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    

    return (
        <View style={styles.page}>
        { (toggle) ? 
        <>
            <Text>Register</Text>
            <TextInput
                            style={{height: 40}}
                            placeholder="Insert Message here"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            /> 
            <TextInput
                            style={{height: 40}}
                            placeholder="Insert Message here"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            /> 
            <TextInput
                            style={{height: 40}}
                            placeholder="Insert Message here"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            /> 
        </> : 
        <>
            <Text>Login</Text>
            <TextInput
                            style={{height: 40}}
                            placeholder="Insert Message here"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            /> 
            <TextInput
                            style={{height: 40}}
                            placeholder="Insert Message here"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            /> 
        </> }
        </View>
    )
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        width: '100%',
        backgroundColor: '#96CDFF'
    }
})

