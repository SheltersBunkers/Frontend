import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import  Map  from './Map';
import { withRouter } from 'react-router-native';
import { getDistance } from 'geolib';
import { post_comment_to_shelter, get_comments_by_id, dropUser } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import date from './date.js'

const ShelterData = ({ history, location }) => {
    const [ distance, setDistance ] = useState(null);
    const shelter = location.state;
    const [ message, setMessage ] = useState('');
    const dispatch = useDispatch();
    const user = useSelector( state => state.user);
    const shelterComments = useSelector( state => state.comments );
    const failed = useSelector( state => state.postFailed )
    const [ showComments, setShowComments ] = useState(false);

    useEffect(() => {
        setDistance(getDistance(
            {latitude: shelter.lat, longitude: shelter.lng },
            {latitude: shelter.your_lat, longitude: shelter.your_lng }
        ) * 0.00062137)

    }, [])
    
    useEffect(() =>{
        dispatch(get_comments_by_id(shelter.id))
    }, [failed]);

    useEffect(() =>{
        if (user) {
            if (user.expiration < Date.now()) {
            dispatch(dropUser());
        }
        }
        
    })

    sendComment = () => {
        if (message !== ''){
            dispatch(post_comment_to_shelter(shelter.id, message, user.id));
            setMessage('');
        }
        
    }

    return (
        <View style={styles.page}>
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
                <View style={styles.container}>
                <TouchableOpacity onPress={(showComments) ? () => setShowComments(!showComments) : () => history.push('/map')} style={styles.close}>
                            <Text style={styles.closeText}>X</Text>
                </TouchableOpacity>
                {(!showComments) ?
                <View>
                    <Text style={styles.shelterName}>{shelter.name}</Text>
                    <Text style={styles.address}>{shelter.street_num} {shelter.road}, {shelter.city}, {shelter.state}</Text>
                    { (distance) ? <Text style={styles.distance}>  { Math.ceil(distance) } {(Math.ceil(distance) > 1) ? 'Miles Away' : 'Mile Away' }</Text> : <ActivityIndicator size="small" color="#0000ff" /> }
                    {(!user) &&
                        <TouchableOpacity onPress={() => history.push('/login', {id: shelter.id, name: shelter.name, lat: shelter.lat, lng: shelter.lng, street_num: shelter.street_num, road: shelter.road, city: shelter.city, state: shelter.state, zip_code: shelter.zip_code, your_lat: shelter.your_lat, your_lng: shelter.your_lng })} style={styles.madeButton}>
                            <Text style={styles.logOrReg}>Login or register to comment</Text>
                        </TouchableOpacity>} 
                        <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.madeButton}>
                            <Text style={styles.logOrReg}>View Comments on Shelter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => history.push('/')} style={styles.madeButton}>
                            <Text style={styles.logOrReg}>Go Home</Text>
                        </TouchableOpacity>
                        
                </View> : 
                <View>
                    { user && 
                        <View> 
                            <TextInput
                                style={styles.input}
                                placeholder="Insert Message here"
                                onChangeText={(text) => setMessage(text)}
                                value={message}
                                /> 
                        <TouchableOpacity onPress={() => sendComment()} style={styles.madeButton} >
                            <Text style={styles.sub}>Submit Comment</Text>
                        </TouchableOpacity>  
                        </View> }
                        {(!user) ? <View> 
                        <TouchableOpacity onPress={() => history.push('/login', {id: shelter.id, name: shelter.name, lat: shelter.lat, lng: shelter.lng, street_num: shelter.street_num, road: shelter.road, city: shelter.city, state: shelter.state, zip_code: shelter.zip_code, your_lat: shelter.your_lat, your_lng: shelter.your_lng }) }>
                            <Text style={styles.logOrReg1}>Login or register to comment</Text>
                        </TouchableOpacity></View> : null }
                            <Text style={styles.comments}>COMMENTS</Text>
                        
                            <ScrollView style={styles.scrollView}>
                            {(shelterComments.length === 0) && <Text style={styles.first}>Be the first to comment on this Shelter</Text>}
                                 {shelterComments.map(comment => {
                                    return (
                                    <View key={comment.id}>
                                        <View style={styles.flexing}>
                                            <Text style={styles.commentUser}>{comment.username}</Text>
                                            <Text style={styles.comment1}>{date(comment.posted_at)}</Text>
                                        </View>
                                        <Text style={styles.comment}>{comment.comment}</Text>
                                    </View> )
                                })} 
                            </ScrollView>
                    </View> }
                </View>
            </View>
    )
}


const styles =  StyleSheet.create({
    closeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: "90%"
    },
    comment1: {
        color: "#3366CC",
        position: "absolute",
        right: 10,
        fontWeight: "bold",
        fontSize: 15
    },
    comment: {
        fontSize: 18,
        margin: 10,
        marginLeft: 15
    },
    input: {
        height: 40,
        backgroundColor: "white", 
        margin: 7
    },
    sub: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    commentUser: {
        fontSize: 15,
        color:"#3366CC",
        marginLeft: 10,
        fontWeight: "bold"
    },
    first: {
        textAlign: "center",
        fontSize: 25,
        fontStyle: "italic",
        marginTop: 15
    },
    scrollView: {
        marginLeft: 10,
        marginRight: 10
    },
    comments: {
        fontSize: 20,
        marginLeft: 15,
        marginTop: 8,
        alignSelf: "center",
        fontWeight: "bold"
    },
    madeButton: {
        alignSelf: "center",
        backgroundColor: "#3366CC",
        height: 50,
        width: 300,
        marginBottom: 25,
        borderRadius: 5,
        paddingTop: 12,
        marginTop: 8
    },
    logOrReg: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    },
    logOrReg1: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 15,
        marginTop: 30
    },
    page: {
        height: "100%",
        width: "100%",
        backgroundColor: "#D0D0D0"
    },
    co: {
        flex: 4
    },
    submit: {
        width: 200
    },
    flexing: {
        flexDirection: 'row'
    },
    icon: {
        marginLeft: 30,
        marginBottom: -100,
        marginTop: 50,
        zIndex: 10
    },
    icon2: {
        marginLeft: 30,
        marginBottom: -100,
        marginTop: 50,
        zIndex: 10,
        position: "absolute",
        right: 20
    },
    map: {
        flex: 2
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
        marginTop: 20,
        textAlign: "center",
        color: "#3366CC",
        fontWeight: "bold"
    },
    address: {
        textAlign: "center",
        fontSize: 15,
        color: "#3366CC"
    },
    distance: {
        color: "gray",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
        color: "#3366CC"
    },
    flexing: {
        flex: 1,
        flexDirection: "row"
    }
})


export default withRouter(ShelterData);