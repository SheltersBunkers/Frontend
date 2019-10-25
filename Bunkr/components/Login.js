import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'react-router';
import { login } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    password: yup.string().required('Password').min(6, 'Minimum 6 characters').max(20, 'Maximum 20 characters'),
})

const Login = ({ history }) => {
    const dispatch = useDispatch();
    const userError = useSelector(state => state.errors);
    const loggingIn = useSelector(state => state.loggingIn);

    return (
        <View style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.reg}>Dorothy's</Text>
                <Text style={styles.reg1}>Bunker</Text>
            </View>
            <SafeAreaView style={styles.safe}>
            
            <Formik initialValue={{username: '', email: '', password: '', verifyPassword: ''}}  
            onSubmit={(values, actions) => { dispatch(login(history, values))}}
            validationSchema={validationSchema}>
                {formikProps => (
                    <>
                    {userError ? <Text style={{color: "red"}}>{userError}</Text> : null }
                    <TextInput  placeholder="Username" style={styles.input1} onChangeText={formikProps.handleChange('username')} onBlur={formikProps.handleBlur("username")}  />
                    <Text style={styles.alert}>{formikProps.touched.username && formikProps.errors.username}</Text>
                    <TextInput type="password" placeholder="Password" style={styles.input} onChangeText={formikProps.handleChange('password')} secureTextEntry onBlur={formikProps.handleBlur("password")} />
                    <Text style={styles.alert}>{formikProps.touched.password && formikProps.errors.password}</Text>
                    {loggingIn ? 
                        <ActivityIndicator /> : 
                        <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.madeButtons}><Text style={styles.center}>LOGIN</Text></TouchableOpacity>}
                    </>
                    
                )}
            </Formik>
            <View style={styles.flexing}>
                <Text style={styles.blueColor}>Not registered?</Text> 
                <TouchableOpacity onPress={() => history.push('/register')} style={styles.buttons}><Text style={styles.blueColor}>  Register Here!</Text></TouchableOpacity>
            </View>
                <TouchableOpacity onPress={() => history.push('/')} style={styles.goHome}>
                    <Text style={styles.blueColor}>Go Home</Text>
            </TouchableOpacity>
            
    </SafeAreaView>
    </View>
    )
}

const styles = StyleSheet.create({
    flexing: {
        flexDirection: "row",
        marginTop: 50
    },
    goHome: {
        marginTop: 50,
        paddingBottom: 20
    },
    blueColor: {
        color: "#3366CC"
    },
    top: {
        marginTop: Platform.OS === "ios" ? 84 : 40
    },
    reg: {
        fontSize: 50,
        textAlign: "center",
        color: "#3366CC",
    
    },
    reg1: {
        fontSize: 50,
        textAlign: "center",
        color: "#3366CC",
        marginTop: -20,
        marginBottom: 20
    },
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#D0D0D0"
    },
    safe: {
        alignItems: "center",
        borderRadius: 30,
        paddingTop: 40,
        paddingBottom: 40,
        marginLeft: 30,
        marginRight: 30,
        borderColor: "black",
        borderWidth: 3,
        backgroundColor: "#E8E8E8"
    },
    input1: {
        borderWidth: 1, 
        borderColor: 'black', 
        padding: 10, 
        marginHorizontal: 30, 
        marginVertical: 5,
        width: 250, 
        borderRadius: 5,
        marginTop: Platform.OS === "ios" ? 40 : 10
    },
    input: {
        borderWidth: 1, 
        borderColor: 'black', 
        padding: 10, 
        marginHorizontal: 30, 
        marginVertical: 5,
        width: 250, 
        borderRadius: 5
    },
    alert: {
        color: "#FF1053"
    },
    buttons: {
        width: 120, 
        height: 80,
        fontSize: 20
    },
    madeButtons: {
        marginTop: 10,
        width: 200,
        height: 60,
        textAlign: "center",
        borderRadius: 5,
        backgroundColor: "#3366CC"
       
    },
    center: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 15,
        color: "white"
    }
})

export default Login;