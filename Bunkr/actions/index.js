import { axiosWithAuth } from "../utls/axiosWithAuth";
import axios from 'axios';
import { AsyncStorage } from 'react-native';

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




export const get_user = () => dispatch => {
    dispatch({ type: FETCHING_USER_DATA })

    axios.get('')
        .then(result => {

        })
        .catch(err => {

        })
}


export const get_comments_by_id = (id) => {
    dispatch({ type: FETCHING_COMMENTS_BY_SHELTER_ID })

    axios.get('')
        .then()
        .catch()
}

export const get_locations = () => {
    dispatch({ type: FETCHING_LOCATIONS })

    axios.get('')
        .then()
        .catch()
}

export const post_comment_to_shelter = async (id, message) => {
    dispatch({ type: POSTING })

    const token = await AsyncStorage.getItem('token');
    
    return axiosWithAuth(token)
        .then()
        .catch()
}


// to save token 
// await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');