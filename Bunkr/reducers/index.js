import { 
    FETCHING_USER_DATA, 
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
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
    fetchingUser: false,
    fetchingComments: false,
    locations: [],
    fetchingLocations: false,
    posting: false
}

export default reducer = (state = initialState, action) => {
    switch(action.type){
        case  FETCHING_USER_DATA:
            return {
                ...state,
                fetchingUser: true
            }
        case GET_USER_DATA_SUCCESS:
            return {
                ...state,
                user: action.payload,
                fetchingUser: false
            }
        case FETCHING_USER_DATA_FAILURE: 
            return  {
                ...state,
                fetchingUser: true
            }
        case FETCHING_COMMMENTS_BY_SHELTER_ID:
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
                posting: false
            }
        default:
            return state
    }
}
