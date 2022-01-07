import { createSlice } from "@reduxjs/toolkit"
import { act } from "react-dom/cjs/react-dom-test-utils.production.min"

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false.valueOf, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      }
    },
  },
})

export const uiActions = uiSlice.actions
export default uiSlice
