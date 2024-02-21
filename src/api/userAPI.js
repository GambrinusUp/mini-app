import axios from "axios";

const API_URL = 'https://localhost:7167/api/';

function getUsers(name) {
    return axios.get(API_URL + "User/" + name + "/users")
        .then((response) => {
            console.log(response.data);
            return {status: response.status, data: response.data};
        })
        .catch((error) => {
            return {status: error.status, errors: error.data.errors};
        });
}

export const userAPI = {
    getUsers : getUsers
}