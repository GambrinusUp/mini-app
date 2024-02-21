import axios from "axios";

const API_URL = 'https://localhost:7167/';

function createRequest(userId, keyId, date, lessonNumber) {
    return axios.post(API_URL + "BookerBid?userId=" + userId + "&keyId=" + keyId + "&date=" +
        date + "&lessonNumber=" + lessonNumber)
        .then((response) => {
            console.log("token", response);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

function getRequests(userId) {
    return axios.get(API_URL + "BookerBid?userId=" + userId)
        .then((response) => {
            console.log("token", response);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            console.log(error);
            if(error.code && error.code === "ERR_NETWORK")
                return {status: 418, errors: error.message};
            return {status: error.response.status, errors: error.response.data.errors};
        });
}

export const bookingAPI = {
    createRequest : createRequest,
    getRequests : getRequests
}