import {bookingAPI} from "../api/bookingAPI";

const LOAD_REQUESTS = "LOAD_REQUESTS";
const SET_LOADING = "SET_LOADING";
const ADD_ERROR = "ADD_ERROR";
const CLEAR_ERRORS = "CLEAR_ERRORS";

let initialState = {
    requests : [],
    errors: [],
    isLoading: false
}

const bookingReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_REQUESTS:
            newState.requests = action.data;
            return newState;
        case SET_LOADING:
            newState.isLoading = action.isLoading
            return newState;
        case ADD_ERROR:
            newState.errors = [...state.errors, action.error];
            return newState;
        case CLEAR_ERRORS:
            newState.errors = []
            return newState;
        default:
            return newState;
    }
}

export function getRequestsActionCreator(data) {
    return {type: LOAD_REQUESTS, data: data}
}

export function setLoadingActionCreator(isLoading) {
    return { type: SET_LOADING, isLoading };
}

export function addErrorActionCreator(error) {
    return { type: ADD_ERROR, error: error };
}

export function clearErrorActionCreator() {
    return { type: CLEAR_ERRORS };
}

export const getRequestsThunkCreator = (userId) => (dispatch) => {
    dispatch(setLoadingActionCreator(true));
    dispatch(clearErrorActionCreator());

    return bookingAPI.getRequests(userId).then(
        (data) => {
            console.log(data);
            if(data.status === 200) {
                dispatch(getRequestsActionCreator(data.data));
                return Promise.resolve();
            } else {
                dispatch(addErrorActionCreator(data.errors));
            }
            return Promise.reject();
        }
    ).finally(() => {
        dispatch(setLoadingActionCreator(false));
    });
};

export default bookingReducer;