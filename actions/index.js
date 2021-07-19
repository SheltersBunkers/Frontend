import { axiosWithAuth } from "../utls/axiosWithAuth";
import axios from 'axios';
import {AsyncStorage} from 'react-native';


export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const REGISTERING = "REGISTERING";
export const REGISTERING_SUCCESS = "REGISTERING_SUCCESS";
export const REGISTERING_FAILURE = "REGISTERING_FAILURE";

export const FETCHING_USER_DATA = "FETCHING_USER_DATA";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_FAILURE = "GET_USER_DATA_FAILURE";

export const FETCHING_COMMENTS_BY_SHELTER_ID = "FETCHING_COMMENTS_BY_SHELTER_ID";
export const GET_COMMENTS_BY_SHELTER_ID_SUCCESS = "GET_COMMENTS_BY_SHELTER_ID_SUCCESS";
export const GET_COMMENTS_BY_SHELTER_ID_FAILURE = "GET_COMMENTS_BY_SHELTER_ID_FAILURE";

export const FETCHING_LOCATIONS = "FETCHING_LOCATIONS";
export const GET_LOCATIONS_SUCCESS = "GET_LOCATIONS_SUCCESS";
export const GET_LOCATIONS_FAILURE = "GET_LOCATIONS_FAILURE";

export const POSTING = "POSTING";
export const POST_TO_SHELTER_SUCCESS = "POST_TO_SHELTER_SUCCESS";
export const POST_TO_SHELTER_FAILURE = "POST_TO_SHELTER_FAILURE";

export const SENDING_FEEDBACK = "SENDING_FEEDBACK";
export const SENDING_FEEDBACK_SUCCESS = "SENDING_FEEDBACK_SUCCESS ";
export const SENDING_FEEDBACK_FAILURE = "SENDING_FEEDBACK_FAILURE";

export const VERIFYING = "VERIFYING";
export const VERIFY_TOKEN_SUCCESS = "VERIFY_TOKEN_SUCCESS";
export const VERIFY_TOKEN_FAILED = "VERIFY_TOKEN_FAILED";
export const CHANGE_REPSONSE = "CHANGE_REPSONSE";

export const SET_SELECTED_SHELTER = "SET_SELECTED_SHELTER";


export const login = (history, user, shelter) => dispatch => {
    dispatch({ type: LOGIN })

    axios.post('https://bunkr-up.herokuapp.com/login', user)
    .then(res => {
        saved = async () => {
            try {
               await AsyncStorage.setItem('Bunkr_token', res.data.token);
               dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            } catch (error){
                console.log('Error')
            }
        }
        saved();
        
    })
    .then(res => (!shelter) ? history.push('/map') : history.push('/shelter'))
    .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: "Username or password is incorrect" })
    })
}

export const register = (history, user, shelter) => dispatch => {
    dispatch({ type: REGISTERING })
    let clean = {
        username: user.username,
        password: user.password,
        email: user.email
    }
    axios.post('https://bunkr-up.herokuapp.com/login/register', clean)
    .then(res => {
        try {
            AsyncStorage.setItem('Bunkr_token', res.data.token)
            console.log('register success.')
            dispatch({ type: REGISTERING_SUCCESS, payload: res.data })
        }catch (error) {
            console.log(error)
        }
        
        
    })
    .then(res => (!shelter) ? history.push('/map') : history.push('/shelter'))
    .catch(err => {
        console.log(err, 'error registering')
        dispatch({ type: REGISTERING_FAILURE, payload: err })
    })
}

export const get_locations = () => dispatch => {
    dispatch({ type: FETCHING_LOCATIONS })

    axios.get('https://bunkr-up.herokuapp.com/shelters')
        .then(res => {
            dispatch({ type: GET_LOCATIONS_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: GET_LOCATIONS_FAILURE, payload: err })
        })
}


export const get_comments_by_id = (id) => dispatch => {

    dispatch({ type: FETCHING_COMMENTS_BY_SHELTER_ID })

    axios.get(`https://bunkr-up.herokuapp.com/comments/${id}`)
        .then(res => {
            dispatch({ type: GET_COMMENTS_BY_SHELTER_ID_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: GET_COMMENTS_BY_SHELTER_ID_FAILURE, payload: err })
        })
}

export const post_comment_to_shelter = (id, message, userId) => dispatch => {
    dispatch({ type: POSTING })
    find = async () => {
        try {
            let token = await AsyncStorage.getItem('Bunkr_token');
             
            const messageObj = {
                comment: message,
                user_id: userId
            }
            return axiosWithAuth(token)
                .post(`https://bunkr-up.herokuapp.com/comments/${id}`, messageObj)
                .then(res => {
                    dispatch({ type: POST_TO_SHELTER_SUCCESS, payload: res.data })
                })
                .catch(err => {
                    dispatch({ type: POST_TO_SHELTER_FAILURE, payload: token })
                })
        } catch (error){
            console.log('something went wrong')
        }
       
    }
    find()

}

export const send_feedback = (feedback) => dispatch => {
    dispatch({ type: SENDING_FEEDBACK })

    const clean = {
        address: feedback.address,
        contactNum: feedback.contactNum,
        info: feedback.info,
        shelterName: feedback.shelterName,
        yourName: feedback.yourName || null
    }

    axios.post('https://bunkr-up.herokuapp.com/tellus', clean)
        .then(res => {
            dispatch({ type: SENDING_FEEDBACK_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: SENDING_FEEDBACK_FAILURE, payload: err })
        })
}


export const verify_token = (user) => dispatch => {
    dispatch({ type: VERIFYING})
    async function tokes() {
            let token = await AsyncStorage.getItem('Bunkr_token');
            let tokObj = { token: token }
             if (token) {
                axios.post('https://bunkr-up.herokuapp.com/verify', tokObj )
                    .then(res => {
                        let saved = async () => {
                            try {
                              AsyncStorage.setItem('Bunkr_token', res.data.token)
                              if (!user){
                                dispatch({ type: VERIFY_TOKEN_SUCCESS, payload: res.data })
                            }
                            } catch {
                                await AsyncStorage.removeItem('Bunkr_token')
                                dispatch({ type: VERIFY_TOKEN_FAILED })
                            }
                        
                        }
                        saved();
                        
                    })
                    .catch(err => {
                        let failed = async () => {
                            await AsyncStorage.removeItem('Bunkr_token')
                            dispatch({ type: VERIFY_TOKEN_FAILED })
                        }
                        failed();
                    })
                }

    }
    tokes();
    

   
}

export const selectedShelter = (shelter) => {
    dispatch({ type: SET_SELECTED_SHELTER, payload: shelter})
}

export const changeResponse = () => dispatch => {
    dispatch({ type: CHANGE_REPSONSE })
}