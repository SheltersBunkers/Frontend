import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
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

const Register = () => {
    return (
    <View style={styles.page}>
    <Text style={styles.reg}>Register</Text>
    <SafeAreaView style={styles.safe}>
        <Formik initialValue={{username: '', email: '', password: '', verifyPassword: ''}}  
        onSubmit={(values, actions) => {
            alert.stringfiy(values);
            setTimeout(() => {
                actions.setSubmitting(false);
            }, 1000)
        }}
        validationSchema={validationSchema}>
            {formikProps => (
                <>
                <TextInput  placeholder="Username" style={styles.input} onChangeText={formikProps.handleChange('username')} onBlur={formikProps.handleBlur("username")} autoFocus />
                <Text style={styles.alert}>{formikProps.errors.username}</Text>
                <TextInput  placeholder="Email" style={styles.input} onChangeText={formikProps.handleChange('email')} onBlur={formikProps.handleBlur("email")} autoFocus />
                <Text style={styles.alert}>{formikProps.errors.email}</Text>
                <TextInput type="password" placeholder="Password" style={styles.input} onChangeText={formikProps.handleChange('password')} secureTextEntry onBlur={formikProps.handleBlur("password")} autoFocus />
                <Text style={styles.alert}>{formikProps.errors.password}</Text>
                <TextInput type="password" placeholder="Verify Password" style={styles.input} onChangeText={formikProps.handleChange('verifyPassword')} secureTextEntry onBlur={formikProps.handleBlur("verifyPassword")} autoFocus />
                <Text style={styles.alert}>{formikProps.errors.verifyPassword}</Text>
                {formikProps.isSubmitting ? 
                    <ActivityIndicator /> : 
                    <Button title="Submit" onPress={formikProps.handleSubmit} style={styles.button} /> }
                </>
            )}
        </Formik>
    </SafeAreaView>
    </View>
    )
};

const styles = StyleSheet.create({
    reg: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
        marginTop: "30%",
        color: "#FF1053"
    
    },
    page: {
        width: "100%",
        height: "100%",
        // backgroundColor: "#C1CAD6"
        backgroundColor: "black"
    },
    safe: {
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 30,
        paddingTop: 40,
        paddingBottom: 40,
        marginLeft: 30,
        marginRight: 30
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
    button: {
        width: 250, 
        height: 160,
        color: "green",
        fontSize: 20,
        marginTop: 10
    }
})


export default Register;