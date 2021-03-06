import React from 'react';
import {StyleSheet, View, Text, ActivityIndicator, TextInput, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { register } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';


const SignupSchema = yup.object().shape({
    username: yup.string().required('Username is a required field'),
    email: yup.string().required('Email is a required field').email(),
    password: yup.string().required('Password is a required field').min(6, 'Minimum 6 characters').max(20, 'Maximum 20 characters'),
    verifyPassword: yup.string().required().label('Confirm password').test('passwords-match', "Passwords must match", function(value) {
        return this.parent.password === value;
    })
})

const Register = ({ history, location }) => {
    const dispatch = useDispatch();
    
    const registering = useSelector(state => state.registering);
    const regFailure = useSelector(state => state.regFailure);

    const shelter = location.state;

    return (
    <View style={styles.page}>
        <View style={styles.top}>
            <Text style={styles.reg}>Dorothy's</Text>
            <Text style={styles.reg1}>Bunker</Text>
         </View>
    <SafeAreaView style={styles.safe}>
        <Formik initialValues={{username: '', email: '', password: '', verifyPassword: ''}}  
        onSubmit={(values) => dispatch(register(history, values, shelter))}
        validationSchema={SignupSchema}>
            {({ handleChange, handleBlur, handleSubmit, touched, errors}) => (
                <>
                { regFailure ? <Text>{regFailure}</Text> : null }
                <TextInput  placeholder="Username" style={styles.input1} onChangeText={handleChange('username')} onBlur={handleBlur('username')}/>
                <Text style={styles.alert}>{touched.username && errors.username}</Text>
                <TextInput  placeholder="Email" style={styles.input} onChangeText={handleChange('email')} onBlur={handleBlur("email")}  />
                <Text style={styles.alert}>{touched.email && errors.email}</Text>
                <TextInput type="password" placeholder="Password" style={styles.input} onChangeText={handleChange('password')} secureTextEntry onBlur={handleBlur("password")}  />
                <Text style={styles.alert}>{touched.password && errors.password}</Text>
                <TextInput type="password" placeholder="Verify Password" style={styles.input} onChangeText={handleChange('verifyPassword')} secureTextEntry onBlur={handleBlur("verifyPassword")}  />
                <Text style={styles.alert}>{touched.verifyPassword &&  errors.verifyPassword}</Text>
                {registering ? 
                    <ActivityIndicator /> : 
                    <TouchableOpacity onPress={handleSubmit} style={styles.madeButtons}><Text style={styles.center}>Sign up</Text></TouchableOpacity>}
                </>
                
            )}
        </Formik>
            <View style={{flexDirection: "row", marginTop: 30}}>
                <Text style={styles.color}>Already registered?</Text> 
                <TouchableOpacity onPress={() => history.push('/login', shelter)} >
                    <Text style={styles.color}> Login Here!</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => history.push('/')} style={styles.goHome}>
                    <Text style={styles.color}>Home</Text>
            </TouchableOpacity>
    </SafeAreaView>
    </View>
    )
};

 
const styles = StyleSheet.create({
    color: {
        color: "#3366CC",
        paddingBottom: 20
    },
    top: {
        marginTop: 40
    },
    reg: {
        fontSize: 50,
        color: "#3366CC",
        textAlign: "center",
        color: "#3366CC"
    },
    reg1: {
        fontSize: 50,
        color: "#3366CC",
        textAlign: "center",
        color: "#3366CC",
        marginTop: -20
    },
    page: {
        width: "100%",
        height: "100%",
        backgroundColor: "#E8E8E8"
       },
    safe: {
        alignItems: "center",
        backgroundColor: "#F8F8F8",
        borderRadius: 10,
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
        borderRadius: 5,
        marginTop: Platform.OS === "ios" ? 5 : -1,
        marginBottom: Platform.OS === "ios" ? 5 : -1
    },
    input1: {
        borderWidth: 1, 
        borderColor: 'black', 
        padding: 10, 
        marginHorizontal: 30, 
        marginVertical: 5,
        width: 250, 
        borderRadius: 5,
        marginTop: Platform.OS === "ios" ? 40 : 1,
        marginBottom: Platform.OS === "ios" ? 5 : -1
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
        borderRadius: 10,
        backgroundColor: "#3366CC"
    },
    center: {
        textAlign: "center",
        fontSize: 20,
        paddingTop: Platform.OS === "ios" ? 18 : 15,
        color: "white"
    },
    goHome: {
        marginTop: 50
    }
})


export default Register;