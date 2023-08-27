import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const previewSlice = createSlice({
    name: 'previewpage',
    initialState,
    reducers: {
        openPreview(state, action) {
            state.push(action.payload)
        },
        removeItem(state, action) {
            return state.filter(item => item.id !== action.payload)
        }
    }
})

export const {openPreview, removeItem} = previewSlice.actions
export default previewSlice.reducer