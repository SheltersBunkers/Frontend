import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView } from 'react-native';
import { login, register } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import { styles } from 'ansi-colors';
import * as yup from 'yup';


const validationSchema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    email: yup.string().required('Email is a required field').email(),
    password: yup.string().required('Password').min(6, 'Minimum 6 characters').max(20, 'Maximum 20 characters')
})

const Register = () => {
    <SafeAReaView style={{marginTop: 90}}>
        <Formik iniitalValue={{username: '', email: '', password: ''}} onSubmit={(values, actions) => } validationSchema={validationSchema}>
            {formikProps => (
                <>
                <TextInput value={username} placeholder="Username" style={styles.input} onChangeText={formikProps.handleChange('username')}/>
                <Text style={styles.alert}>{formikProps.errors.username}</Text>
                <TextInput value={username} placeholder="Email" style={styles.input} onChangeText={formikProps.handleChange('email')}/>
                <Text style={styles.alert}>{formikProps.errors.email}</Text>
                <TextInput value={password} palceholder="Password" style={style.input} onChangeText={formikProps.handleChange('password')} />
                <Text style={styles.alert}>{formikProps.errors.password}</Text>
                
                {formikProps.isSubmitting ? 
                    <ActivityIndicator /> : 
                    <Button title="Submit" onPress={formikProps.handSubmit} /> }
                </>
            )}
        </Formik>
    </SafeAReaView>

};

const style = StyleSheet.create({
    input: {
        borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 5
    }
    alert: {
        color: red
    }
})
