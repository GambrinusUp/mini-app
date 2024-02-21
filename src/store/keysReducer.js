import {keysAPI} from "../api/keysAPI";

const LOAD_KEYS = "LOAD_KEYS";
const CLEAR_KEYS = "CLEAR_KEYS";

let initialState = {
    keys : [],
    errors: []
}

const keysReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case LOAD_KEYS:
            newState.keys = action.data;
            return newState;
        case CLEAR_KEYS:
            newState.keys = [];
            return newState;
        default:
            return newState;
    }
}

export function getKeysActionCreator(data) {
    return {type: LOAD_KEYS, data: data}
}

export function clearKeysActionCreator() {
    return { type: CLEAR_KEYS };
}

export const getKeysThunkCreator = (date, timeSlot) => (dispatch) => {
    dispatch(clearKeysActionCreator());

    return keysAPI.getKeys(date, timeSlot).then(
        (data) => {
            if(data.status === 200) {
                dispatch(getKeysActionCreator(data.data));
                return Promise.resolve();
            }
            return Promise.reject();
        }
    ).catch(
        (error) => {
            console.log(error.status);
    });
};

export default keysReducer;