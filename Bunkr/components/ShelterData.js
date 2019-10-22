import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TextInput } from 'react-native';
import { gray } from 'ansi-colors';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import  Map  from './Map';
import { withRouter } from 'react-router-native';
import locations from './data';
import { getDistance } from 'geolib';
import { post_comment_to_shelter, get_comments_by_id } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import {AsyncStorage} from 'react-native';


const ShelterData = ({ history, location }) => {
    const [ distance, setDistance ] = useState(null);
    const shelter = location.state;
    const [ message, setMessage ] = useState('');
    const dispatch = useDispatch();
    const user = useSelector( state => state.user);
    const shelterComments = useSelector( state => state.comments );
    const failed = useSelector( state => state.postFailed )

    useEffect(() => {
        setDistance(getDistance(
            {latitude: shelter.lat, longitude: shelter.lng },
            {latitude: shelter.your_lat, longitude: shelter.your_lng }
        ) * 0.00062137)

    }, [])
    
    useEffect(() =>{
        dispatch(get_comments_by_id(shelter.id))
    }, [shelterComments, failed]);



    sendComment = () => {
        dispatch(post_comment_to_shelter(shelter.id, message, user.id));
        setMessage('');
    }

    return (
        <View>
         <View style={styles.top} >
            <View style={styles.flexing}>
                <Ionicons name="md-arrow-back" size={40} onPress={() => history.push('/map')} style={styles.icon} />
                <Ionicons name="md-close-circle-outline" size={40} onPress={() => history.push('/')} style={styles.icon2}/>
            </View>
            <View style={styles.map} pointerEvents="none"> 
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: shelter.lat,
                    longitude: shelter.lng,
                    latitudeDelta: .004,
                    longitudeDelta: .004,
                    }}
                    >
                <Marker 
                    coordinate={{latitude: shelter.lat, longitude: shelter.lng}}
                    title={shelter.name} />
                </MapView> 
            </View>
        </View>
             
            <View style={styles.container}>
                <Text style={styles.shelterName}>{shelter.name}</Text>
                <Text style={styles.address}>{shelter.street_num} {shelter.road}, {shelter.city}, {shelter.state}</Text>
                 { (distance) ? <Text style={styles.distance}>  { Math.ceil(distance) } {(Math.ceil(distance) > 1) ? 'Miles' : 'Mile' }</Text> : <ActivityIndicator size="small" color="#0000ff" /> }
                <Text style={styles.hairLineWidth}></Text>
                <Text style={styles.telephoneNum}>{(shelter.telephone) ? shelter.telephone : "No Phone Number" }</Text>
                <Text style={styles.hairLineWidth}></Text>
                {(!user) ? <>
                <Button title="Log in or Register to Comment" onPress={() => history.push('/login')} />
                <Text style={styles.comments}>COMMENTS</Text>
                </>: 
                    <>
                        <TextInput
                            style={{height: 40}}
                            placeholder="Insert Message here"
                            onChangeText={(text) => setMessage(text)}
                            value={message}
                            /> 
                        <Button onPress={() => sendComment()} title="Submit" style={styles.submit}/>
                        <Text style={styles.comments}>COMMENTS</Text>
                    </>}
                <View style={styles.co}>
                    {shelterComments.map(comment => {
                        return <Text>{comment.comment}</Text>
                    })}
                </View>
            </View> 
        </View>
    )
}

const styles =  StyleSheet.create({
    co: {
        flex: 4
    },
    submit: {
        width: 200
    },
    flexing: {
        flexDirection: 'row'
    },
    top: {
        flex: 2
    },
    icon: {
        marginLeft: 30,
        marginBottom: -50,
        marginTop: 50,
        zIndex: 10
    },
    icon2: {
        marginLeft: 30,
        marginBottom: -50,
        marginTop: 50,
        zIndex: 10,
        position: "absolute",
        right: 20
    },
    map: {
        flex: 8
    },
    container: {
        flex: 3
    },
    bar: {
        backgroundColor: "black",
        color: "green",
        height: 60,
        fontSize: 25,
        textAlign: "center",
        paddingTop: 8,
        flex: 2
    },
    shelterName: {
        fontSize: 20,
        marginTop: 10,
        textAlign: "center"
    },
    address: {
        marginTop: 10,
        textAlign: "center",
        fontSize: 16
    },
    distance: {
        color: "gray",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10
    },
    hairLineWidth: {
        width: 400,
        height: 1,
        backgroundColor: "black"
    },
    telephoneNum: {
        color: "teal",
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 10
    },
    flexing: {
        flex: 1,
        flexDirection: "row"
    }
})


export default withRouter(ShelterData);