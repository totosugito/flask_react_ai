import {createSlice} from "@reduxjs/toolkit";

const SLICE_KEY = "chat"

export function getData() {
    return (JSON.parse(localStorage.getItem(SLICE_KEY)));
}

export function setData(data) {
    localStorage.setItem(SLICE_KEY, JSON.stringify(data));
}

const data = getData();
const initialState = data
    ? {
        data: data.data ? data.data : [],
    }
    : {data: []};

const dataSlice = createSlice({
    name: SLICE_KEY,
    initialState,
    reducers: {
        clearData(state, action) {
            state.data = []
            setData(state)
        },
        addData(state, action) {
            state.data.push(action.payload)
            setData(state)
        },
        updateData(state, action) {
            state.data = action.payload
            setData(state)
        },
    }
})

const {reducer, actions} = dataSlice;
export const {
    clearData,
    addData,
    updateData
} = actions;
export default reducer;