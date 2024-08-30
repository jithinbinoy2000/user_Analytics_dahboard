import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./userSlice";

const userStore = configureStore({
   reducer:{
    userSlice:userSlice
   }
})
export default userStore;