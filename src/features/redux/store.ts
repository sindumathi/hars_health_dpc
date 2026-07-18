import { configureStore } from "@reduxjs/toolkit";
import registationReducer from './slice/resgistrationSlice'
export const store = configureStore({ reducer :{
    registration: registationReducer
}});
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch= typeof store.dispatch
