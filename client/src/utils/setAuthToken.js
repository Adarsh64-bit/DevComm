import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        // if token exists apply it to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // if token isnt there then delete the header
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;