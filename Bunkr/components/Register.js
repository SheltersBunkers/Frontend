import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router';
import { login, register } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    email: yup.string().required('Email is a required field').email(),
    password: yup.string().required('Password').min(6, 'Minimum 6 characters').max(20, 'Maximum 20 characters'),
    verifyPassword: yup.string().required().label('Confirm password').test('passwords-match', "Passwords must match", function(value) {
        return this.parent.password === value;
    })
})

const Register = ({ history }) => {
    const dispatch = useDispatch();

    return (
    <View style={styles.page}>
    <Text style={styles.reg}>DORTHY'S BUNKR</Text>
    <Text style={{fontSize: 20, textAlign: "center"}}>REGISTERATION</Text>
    <SafeAreaView style={styles.safe}>
        <Formik initialValue={{username: '', email: '', password: '', verifyPassword: ''}}  
        onSubmit={(values, actions) => dispatch(register(history, values))}
        validationSchema={validationSchema}>
            {formikProps => (
                <>
                <TextInput  placeholder="Username" style={styles.input} onChangeText={formikProps.handleChange('username')} onBlur={formikProps.handleBlur("username")} autoFocus />
                <Text style={styles.alert}>{formikProps.touched.username && formikProps.errors.username}</Text>
                <TextInput  placeholder="Email" style={styles.input} onChangeText={formikProps.handleChange('email')} onBlur={formikProps.handleBlur("email")} autoFocus />
                <Text style={styles.alert}>{formikProps.touched.email && formikProps.errors.email}</Text>
                <TextInput type="password" placeholder="Password" style={styles.input} onChangeText={formikProps.handleChange('password')} secureTextEntry onBlur={formikProps.handleBlur("password")} autoFocus />
                <Text style={styles.alert}>{formikProps.touched.password && formikProps.errors.password}</Text>
                <TextInput type="password" placeholder="Verify Password" style={styles.input} onChangeText={formikProps.handleChange('verifyPassword')} secureTextEntry onBlur={formikProps.handleBlur("verifyPassword")} autoFocus />
                <Text style={styles.alert}>{formikProps.touched.verifyPassword &&  formikProps.errors.verifyPassword}</Text>
                {formikProps.isSubmitting ? 
                    <ActivityIndicator /> : 
                    <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.madeButtons}><Text style={styles.center}>SIGN UP</Text></TouchableOpacity>}
                </>
                
            )}
        </Formik>
            <View style={{flexDirection: "row", marginTop: 30}}>
                <Text>Already registered?</Text> 
                <TouchableOpacity onPress={() => history.push('/login')} >
                    <Text> Login Here!</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => history.push('/')} style={styles.goHome}>
                    <Text style={styles.close}>Click here to go to home page!</Text>
            </TouchableOpacity>
    </SafeAreaView>
    </View>
    )
};


const styles = StyleSheet.create({
    reg: {
        fontSize: 20,
        color: "black",
        textAlign: "center",
        marginTop: "10%",
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
    },
    goHome: {
        marginTop: 50
    }
})


export default Register;