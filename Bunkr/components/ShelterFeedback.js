import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'react-router';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import { send_feedback } from '../actions';


const validationSchema = yup.object().shape({
    shelterName: yup.string().required('Shelter Name is a required field'),
    address: yup.string().required("Shelter address is required."),
    yourName: yup.string(),
    info: yup.string().required("Tell us necessary information."),
    contactNum: yup.string().required("Shelter number is required.")
})

const ShelterFeedback = ({ history }) => {
    const dispatch = useDispatch();
    const sendingFeedback = useSelector(state => state.sendingFeedback);
    const response = useSelector(state => state.feedbackResponse)

    return (
        <View style={styles.page}>
            <View style={styles.top}>
                <Text style={styles.reg}>Dorothy's</Text>
                <Text style={styles.reg1}>Bunker</Text>
            </View>
            <SafeAreaView style={styles.safe}>
            
            <Formik initialValue={{shelterName: '', address: '', yourName: '', info: '', contactNum: ''}}  
            onSubmit={(values, actions) => { dispatch(send_feedback(values))}}
            validationSchema={validationSchema}>
                {formikProps => (
                    <>
                    <TextInput  placeholder="Shelter Name" style={styles.input1} onChangeText={formikProps.handleChange('shelterName')} onBlur={formikProps.handleBlur("shelterName")}  />
                    <Text style={styles.alert}>{formikProps.touched.shelterName && formikProps.errors.shelterName}</Text>
                    <TextInput placeholder="Shelter Address" style={styles.input} onChangeText={formikProps.handleChange('address')} onBlur={formikProps.handleBlur("address")} />
                    <Text style={styles.alert}>{formikProps.touched.address && formikProps.errors.address}</Text>
                    <TextInput placeholder="Relevant Information" style={styles.input} onChangeText={formikProps.handleChange('info')} onBlur={formikProps.handleBlur("info")} />
                    <Text style={styles.alert}>{formikProps.touched.info && formikProps.errors.info}</Text>
                    <TextInput placeholder="Shelter Phone Number" style={styles.input} onChangeText={formikProps.handleChange('contactNum')} onBlur={formikProps.handleBlur("contactNum")} />
                    <Text style={styles.alert}>{formikProps.touched.contactNum && formikProps.errors.contactNum}</Text>
                    <TextInput placeholder="Your Name (optional)" style={styles.input} onChangeText={formikProps.handleChange('yourName')} onBlur={formikProps.handleBlur("yourName")} />
                    { response ? <Text style={styles.blueColor}>{response}</Text> : null }
                    {sendingFeedback ? 
                        <ActivityIndicator /> : 
                        <TouchableOpacity onPress={formikProps.handleSubmit} style={styles.madeButtons}><Text style={styles.center}>Submit</Text></TouchableOpacity>}
                    </>
                    
                )}
            </Formik>
            <View style={{flexDirection: "row", marginTop: 50}}>
                <TouchableOpacity onPress={() => history.push('/')} style={styles.buttons}><Text style={styles.blueColor}>Go Home</Text></TouchableOpacity>
            </View>
    </SafeAreaView>
    </View>
    )
}

const styles = StyleSheet.create({
    blueColor: {
        color: "#3366CC"
    },
    top: {
        marginTop: 40
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
        paddingTop: 20,
        marginLeft: 30,
        marginRight: 30,
        borderColor: "black",
        borderWidth: 3,
        backgroundColor: "#E8E8E8",
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
    input1: {
        borderWidth: 1, 
        borderColor: 'black', 
        padding: 10, 
        marginHorizontal: 30, 
        marginVertical: 5,
        width: 250, 
        borderRadius: 5,
        marginTop: Platform.OS === 'ios' ? 40 : 1
    },
    alert: {
        color: "#FF1053"
    },
    buttons: {
        width: 80, 
        height: 50,
        fontSize: 20,
        alignSelf: "center"
    },
    madeButtons: {
        marginTop: 20,
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


export default ShelterFeedback;