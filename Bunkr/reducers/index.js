import { GET_USER_DATA, GET_COMMENTS_BY_SHELTER_ID, FETCHING_USER_DATA, FETCHING_COMMENTS } from '../actions/index.js';

const initialState = {
    user: null,
    comments: [],
    fetchingUser: false,
    fetchingComments: false
}

export default getData = (state = initialState, action) => {
    switch(action.type){
        case GET_USER_DATA:
            return {
                ...state,
                user: action.payload,
                fetchingUser: false
            }
        case FETCHING_USER_DATA: 
            return  {
                ...state,
                fetchingUser: true
            }
        case GET_COMMENTS_BY_SHELTER_ID: 
            return {
                ...state,
                comments: action.payload,
                fetchingComments: false
            }
        case FETCHING_COMMENTS:
            return {
                ...state,
                fetchingComments: true
            }
    }
}
