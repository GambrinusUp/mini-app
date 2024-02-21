import axios from "axios";

const API_URL = 'https://localhost:7167/api/';

function getKeys(date, timeSlot) {
    return axios.get(API_URL + "Key/byTimeslot?date=" + date + "&timeSlot=" + timeSlot + "&page=1&size=200")
        .then((response) => {
            console.log("token", response.data);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

export const keysAPI = {
    getKeys : getKeys
}