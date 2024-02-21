import {userAPI} from "../api/userAPI";

const LOAD_USER = "LOAD_USER";
const CLEAR_KEYS = "CLEAR_KEYS";
const SET_LOADING = "SET_LOADING";

let initialState = {
    users : [],
    isLoading: false
}

const userReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_USER:
            newState.users = action.data;
            return newState;
        case CLEAR_KEYS:
            newState.users = [];
            return newState;
        case SET_LOADING:
            newState.isLoading = action.isLoading
            return newState;
        default:
            return newState;
    }
}

export function getUsersActionCreator(data) {
    return {type: LOAD_USER, data: data}
}

export function clearKeysActionCreator() {
    return { type: CLEAR_KEYS };
}

export function setLoadingActionCreator(isLoading) {
    return { type: SET_LOADING, isLoading };
}

export const getUsersThunkCreator = (name) => (dispatch) => {
    dispatch(clearKeysActionCreator());
    dispatch(setLoadingActionCreator(true));

    return userAPI.getUsers(name).then(
        (data) => {
            if(data.status === 200) {
                dispatch(getUsersActionCreator(data.data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    ).finally(() => {
        dispatch(setLoadingActionCreator(false));
    });
};

export default userReducer;