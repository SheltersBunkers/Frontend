import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
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


    return (
        <View style={styles.page}>
        <Text style={styles.reg}>DORTHY'S BUNKR</Text>
        <SafeAreaView style={styles.safe}>
            <Formik initialValue={{username: '', email: '', password: '', verifyPassword: ''}}  
            onSubmit={(values, actions) => { dispatch(login(history, values))}}
            validationSchema={validationSchema}>
                {formikProps => (
                    <>
                    <TextInput  placeholder="Username" style={styles.input} onChangeText={formikProps.handleChange('username')} onBlur={formikProps.handleBlur("username")} autoFocus />
                    <Text style={styles.alert}>{formikProps.touched.username && formikProps.errors.username}</Text>
                    <TextInput type="password" placeholder="Password" style={styles.input} onChangeText={formikProps.handleChange('password')} secureTextEntry onBlur={formikProps.handleBlur("password")} autoFocus />
                    <Text style={styles.alert}>{formikProps.touched.password && formikProps.errors.password}</Text>
                    {formikProps.isSubmitting ? 
                        <ActivityIndicator /> : 
                        <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.madeButtons}><Text style={styles.center}>LOGIN</Text></TouchableOpacity>}
                    </>
                    
                )}
            </Formik>
            <View style={{flexDirection: "row", marginTop: 50}}>
                <Text>Not registered?</Text> 
                <TouchableOpacity onPress={() => history.push('/register')} style={styles.buttons}><Text>  Register Here!</Text></TouchableOpacity>
            </View>
    </SafeAreaView>
    </View>
    )
}
const styles = StyleSheet.create({
    reg: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
        marginTop: "20%",
        color: "#66C7F4",
        fontWeight: "bold"
    
    },
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#6C6EA0"
    },
    safe: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        paddingTop: 40,
        paddingBottom: 40,
        marginLeft: 30,
        marginRight: 30,
        borderColor: "black",
        borderWidth: 3
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
        borderWidth: 1,
        borderColor: "black",
        textAlign: "center",
        borderRadius: 10,
        backgroundColor: "#C1CAD6"
    },
    center: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: 15
    }
})

export default Login;