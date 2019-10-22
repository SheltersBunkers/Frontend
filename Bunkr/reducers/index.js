import { 
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTERING,
    REGISTERING_SUCCESS,
    REGISTERING_FAILURE,
    FETCHING_COMMENTS_BY_SHELTER_ID,
    GET_COMMENTS_BY_SHELTER_ID_SUCCESS,
    GET_COMMENTS_BY_SHELTER_ID_FAILURE, 
    FETCHING_LOCATIONS,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_FAILURE,
    POSTING,
    POST_TO_SHELTER_SUCCESS,
    POST_TO_SHELTER_FAILURE 
} from '../actions/index.js';


const initialState = {
    user: null,
    comments: [],
    loggingIn: false,
    fetchingComments: false,
    locations: [],
    fetchingLocations: false,
    registering: false,
    posting: false,
    postFailed: false,
    logginFailed: "",
    errors: null,
    regFailure: null
}

export default reducer = (state = initialState, action) => {
    switch(action.type){
        
        case LOGIN:
            return {
                ...state,
                user: action.payload,
                loggingIn: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loggingIn: false,
                errors: null
            }
        case LOGIN_FAILURE: 
            return  {
                ...state,
                loggingIn: false,
                logginFailed: true,
                errors: action.payload
            }
        case REGISTERING:
            return {
                ...state,
                registering: true
            }
        case REGISTERING_SUCCESS:
            return {
                ...state,
                registering: false,
                regFailure: null,
                user: action.payload
            }
        case REGISTERING_FAILURE:
            return {
                ...state,
                registering: false,
                regFailure: "Username is taken."
            }
        case FETCHING_COMMENTS_BY_SHELTER_ID:
            return {
                ...state,
                fetchingComments: true
            }
        case GET_COMMENTS_BY_SHELTER_ID_SUCCESS: 
            return {
                ...state,
                comments: action.payload,
                fetchingComments: false
            }
        case GET_COMMENTS_BY_SHELTER_ID_FAILURE:
            return {
                ...state,
                comments: "Error fetching data"
            }

        case FETCHING_LOCATIONS:
            return {
                ...state,
                fetchingLocations: true
            }
        case GET_LOCATIONS_SUCCESS:
            return {
                ...state,
                locations: action.payload,
                fetchingLocations: false
            }
        case GET_LOCATIONS_FAILURE:
            return {
                ...state,
                fetchingLocations: false
            }
        case POSTING:
            return {
                ...state,
                posting: true
            }
        case POST_TO_SHELTER_SUCCESS:
            return {
                ...state,
                posting: false
            }
        case POST_TO_SHELTER_FAILURE:
            return {
                ...state,
                posting: false,
                postFailed: action.payload
            }
        default:
            return state
    }
}
