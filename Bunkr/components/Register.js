import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import { login, register } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    email: yup.string().required('Email is a required field').email(),
    password: yup.string().required('Password').min(6, 'Minimum 6 characters').max(20, 'Maximum 20 characters')
})

const Register = () => {
    return (
    <SafeAreaView style={styles.safe}>
        <Formik initialValue={{username: '', email: '', password: ''}}  
        onSubmit={(values, actions) => {
            alert.stringfiy(values);
            setTimeout(() => {
                actions.setSubmitting(false);
            }, 1000)
        }}
        validationSchema={validationSchema}>
            {formikProps => (
                <>
                <TextInput  placeholder="Username" style={styles.input} onChangeText={formikProps.handleChange('username')}/>
                <Text style={styles.alert}>{formikProps.errors.username}</Text>
                <TextInput  placeholder="Email" style={styles.input} onChangeText={formikProps.handleChange('email')}/>
                <Text style={styles.alert}>{formikProps.errors.email}</Text>
                <TextInput type="password" palceholder="Password" style={styles.input} onChangeText={formikProps.handleChange('password')} />
                <Text style={styles.alert}>{formikProps.errors.password}</Text>
                
                {formikProps.isSubmitting ? 
                    <ActivityIndicator /> : 
                    <Button title="Submit" onPress={formikProps.handSubmit} /> }
                </>
            )}
        </Formik>
    </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    safe: {
        marginTop: 30
    },
    input: {
        borderWidth: 1, borderColor: 'black', padding: 10, marginHorizontal: 30, marginVertical: 5,
        width: 250, borderRadius: 5
    },
    alert: {
        color: 'red'
    }
})


export default Register;