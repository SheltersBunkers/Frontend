import { axiosWithAuth } from "../utls/axiosWithAuth";
import axios from 'axios';
import {AsyncStorage} from 'react-native';

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN";
export const LOGIN_FAILURE = "LOGIN";

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


export const login = (history, user) => dispatch => {
    dispatch({ type: LOGIN })

    axios.post('https://bunkr-up.herokuapp.com/login', user)
    .then(res => {
        AsyncStorage.setItem('Bunkr_token', res.data.token);
        dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    })
    .then(res => history.push('/map'))
    .catch(err => {
        dispatch({ type: LOGIN_FAILURE, payload: err })
    })
}

export const register = (history, user) => dispatch => {
    dispatch({ type: REGISTERING })

    let clean = {
        username: user.username,
        password: user.password,
        email: user.email
    }
    axios.post('https://bunkr-up.herokuapp.com/login/register', clean)
    .then(res => {
        AsyncStorage.setItem('Bunkr_token', res.data.token);
        dispatch({ type: REGISTERING_SUCCESS, payload: res.data })
        
    })
    .then(res => history.push('/map'))
    .catch(err => {
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
    let token;
    token = AsyncStorage.getItem('Bunkr_token');

    const messageObj = {
        comment: message,
        user_id: userId,
        shelter_id: id
    }

    return axiosWithAuth(token)
        .post(`https://bunkr-up.herokuapp.com/comments/${id}`, messageObj)
        .then(res => {
            dispatch({ type: POST_TO_SHELTER_SUCCESS, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: POST_TO_SHELTER_FAILURE, payload: token })
        })
}



