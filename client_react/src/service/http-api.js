
import axios from "axios";

export const httpGet = async (url, config = {}) => {
    try {
        let response = await axios.get(url, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

export const httpPost = async (url, data={}, config={}) => {
    try {
        let response = await axios.post(url, data, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

export const httpPut = async (url, data={}, config={}) => {
    try {
        let response = await axios.put(url, data, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

export const httpDelete = async (url, config = {}) => {
    try {
        let response = await axios.delete(url, config)
        return ({isError: false, data: response.data, message: ""});
    } catch (err) {
        const message =
            err.response && err.response.data.message
                ? err.response.data.message
                : err.message;
        return ({isError: true, data: {}, message: message});
    }
}

const httpApi = {
    httpGet, httpPost, httpPut
};

export default httpApi;