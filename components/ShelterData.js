import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text, Button, ActivityIndicator, TouchableOpacity, TextInput, ScrollView, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import  Map  from './Map';
import { withRouter } from 'react-router-native';
import { post_comment_to_shelter, get_comments_by_id } from '../actions';
import { useSelector, useDispatch }  from 'react-redux';
import moment from 'moment';
import socketIO from 'socket.io-client';



const ShelterData = ({ history, location }) => {
    const [ distance, setDistance ] = useState(null);
    const [ message, setMessage ] = useState('');
    const [ showComments, setShowComments ] = useState(false);
    const [ socketComments, setSocketComments ] = useState([]);
    const [ new1, setNew1 ] = useState(false);
    const [ someoneTyping, setSomeoneTyping ] = useState(false);
    const [ whoseTyping, setWhoseTyping ] = useState([]);

    const dispatch = useDispatch();

    const user = useSelector( state => state.user);
    const shelterComments = useSelector( state => state.comments );
    const failed = useSelector( state => state.postFailed );
    const shelter = useSelector( state => state.shelter);
   

    let socket = socketIO('https://bunkr-up-socketio.herokuapp.com/', { transports: ['websocket'], jsonp: false });
    

    // useEffect(() => {
    //     setDistance(getDistance(
    //         {latitude: shelter.lat, longitude: shelter.lng },
    //         {latitude: shelter.your_lat, longitude: shelter.your_lng }
    //     ) * 0.00062137)

    // }, [])
    
    useEffect(() =>{
        dispatch(get_comments_by_id(shelter.id));
        setSocketComments([]);
    }, [failed, showComments]);

    useEffect(() => {
        if (showComments){
            connect()
        } else {
            setSomeoneTyping(false)
        }}, [showComments]);

    connect = () => {
        socket.connect();
            socket.on(`${shelter.name}`, (msg) => {
                let newSocketComments = socketComments;
                newSocketComments.unshift(msg);
                setSocketComments(newSocketComments)
                setSomeoneTyping(false);
                rerun();
            })
            socket.on(`${shelter.name}/typing`, (msg) => {
            
                if (!user && msg.typing) {
                        setSomeoneTyping(true)
                } else if (user) {
                    if (msg.user !== user.username && msg.typing){
                        setSomeoneTyping(true);
                    }
                }
                })
            }

    sendComment = () => {
        if (message !== ''){
            dispatch(post_comment_to_shelter(shelter.id, message, user.id));
            socket.emit('shelter', { user: user.username, message: message, shelter: shelter.name, time: Date.now() });
            setMessage('')
            
        }
        
    }

    rerun = () => { //put in to toggle state and rerender when using socketio cause comments weren't always rendering to screen when they should have been cause state was changing.
        setNew1(true);
        setNew1(false);
    }
    if (message.length > 0){
        socket.emit('typing', { user: user.username, shelter: shelter.name, typing: true })
    }
    if (user && message.length === 0) {
        socket.emit('typing', { user: user.username, shelter: shelter.name, typing: false })
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
                            pinColor={"blue"}
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
                        <TouchableOpacity onPress={() => history.push('/login')} style={styles.madeButton}>
                            <Text style={styles.logOrReg}>Login or register to comment</Text>
                        </TouchableOpacity>} 
                        <TouchableOpacity onPress={() => setShowComments(!showComments)} style={styles.madeButton}>
                            <Text style={styles.logOrReg}>View comments on shelter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => history.push('/')} style={styles.madeButton}>
                            <Text style={styles.logOrReg}>Home</Text>
                        </TouchableOpacity>
                        { shelter.description ? <Text style={styles.notice}>{shelter.description}</Text> : <Text style={styles.notice}>Some shelters may NOT be open to the public.</Text>}
                </View> : 
                <View>
                    { user && 
                        <View> 
                            <TextInput
                                style={styles.input}
                                placeholder="    Type comment"
                                onChangeText={(text) => setMessage(text)}
                                value={message}
                                /> 
                        <TouchableOpacity onPress={() => sendComment()} style={styles.madeButton} >
                            <Text style={styles.sub}>Submit comment</Text>
                        </TouchableOpacity>  
                        </View> }
                        {(!user) ? <View> 
                        <TouchableOpacity onPress={() => history.push('/login')}>
                            <Text style={styles.logOrReg1}>Login or register to comment</Text>
                        </TouchableOpacity></View> : null }
                            <Text style={styles.comments}>COMMENTS</Text>
                            {(someoneTyping)  && <Text style={styles.ital}>Someone is typing...</Text>}
                            <ScrollView style={styles.scrollView}>
                            
                            {(shelterComments.length === 0 && socketComments.length === 0) && <Text style={styles.first}>Be the first to comment on this Shelter</Text>}{socketComments.length > 0 && socketComments.map(comment => {
                                return ( 
                                    <View key={Math.random()}>
                                        <View style={styles.flexing}>
                                            <Text style={styles.commentUser}>{comment.user}</Text>
                                            <Text style={styles.comment1}>{moment(moment.utc(comment.time).toDate()).local().format('LLL')}</Text>
                                        </View>
                                        <Text style={styles.comment}>{comment.message}</Text>
                                    </View> )
                            })}
                                 {shelterComments.map(comment => {
                                    return (
                                    <View key={comment.id}>
                                        <View style={styles.flexing}>
                                            <Text style={styles.commentUser}>{comment.username}</Text>
                                            <Text style={styles.comment1}>{moment(moment.utc(comment.posted_at).toDate()).local().format('LLL')}</Text>
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
    notice: {
        marginLeft: 20,
        marginRight: 20,
        fontWeight: "bold"
    },
    ital: {
        fontStyle: "italic",
        fontSize: 14,
        marginLeft: 30
    },
    description: {
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        fontSize: 15
    },
    closeText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 8,
        marginLeft: "90%"
    },
    comment1: {
        color: "#3366CC",
        position: "absolute",
        right: 10,
        fontWeight: "bold",
        fontSize: 12
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
        fontWeight: "bold",
        paddingTop: Platform.OS === "ios" ? 3 : 0
    },
    commentUser: {
        fontSize: 14,
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
        marginTop: -10,
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
        color: "white",
        paddingTop: Platform.OS === "ios" ? 3 : 0,
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
        backgroundColor: "#E8E8E8"
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