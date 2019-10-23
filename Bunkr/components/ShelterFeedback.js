import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link } from 'react-router';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { loggingIn } from '../actions'
const validationSchema = yup.object().shape({
    shelterName: yup.string().required('Shelter Name is a required field'),
    address: yup.string(),
    yourName: yup.string(),
    info: yup.string().required("Tell us necessary information."),
    contactNum: yup.string()
})

const ShelterFeedback = ({ history }) => {
    const dispatch = useDispatch();

    return (
        <View style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.reg}>Dorothy's</Text>
                <Text style={styles.reg1}>Bunker</Text>
            </View>
            <SafeAreaView style={styles.safe}>
            
            <Formik initialValue={{shelterName: '', address: '', yourName: '', info: '', contactNum: ''}}  
            onSubmit={(values, actions) => { dispatch(login(history, values))}}
            validationSchema={validationSchema}>
                {formikProps => (
                    <>
                    <TextInput  placeholder="Shelter Name" style={styles.input} onChangeText={formikProps.handleChange('shelterName')} onBlur={formikProps.handleBlur("shelterName")}  />
                    <Text style={styles.alert}>{formikProps.touched.shelterName && formikProps.errors.shelterName}</Text>
                    <TextInput placeholder="Shelter Address" style={styles.input} onChangeText={formikProps.handleChange('address')} onBlur={formikProps.handleBlur("address")} />
                    <TextInput placeholder="Relevant Information" style={styles.input} onChangeText={formikProps.handleChange('info')} onBlur={formikProps.handleBlur("info")} />
                    <Text style={styles.alert}>{formikProps.touched.info && formikProps.errors.info}</Text>
                    <TextInput placeholder="Shelter Contact Information" style={styles.input} onChangeText={formikProps.handleChange('contactNum')} onBlur={formikProps.handleBlur("address")} />
                    <TextInput placeholder="Your Name" style={styles.input} onChangeText={formikProps.handleChange('yourName')} onBlur={formikProps.handleBlur("yourName")} />
                    {loggingIn ? 
                        <ActivityIndicator /> : 
                        <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.madeButtons}><Text style={styles.center}>Submit</Text></TouchableOpacity>}
                    </>
                    
                )}
            </Formik>
            <View style={{flexDirection: "row", marginTop: 50}}>
                <TouchableOpacity onPress={() => history.push('/')} style={styles.buttons}><Text style={styles.blueColor}>  Home page!</Text></TouchableOpacity>
            </View>
    </SafeAreaView>
    </View>
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