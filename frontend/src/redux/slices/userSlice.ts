import { fetchUserInfo } from "@/services/userService";
import { User } from "@/types/userInfo";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: User = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
}

export const fetchProfileByEmail = createAsyncThunk('user/fetchUserInfo', async () => {
    const response = await fetchUserInfo()
    
    return response.data
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(fetchProfileByEmail.fulfilled, (state, action) => {
        //   state = action.payload
        return {...state, ...action.payload}
        })
    },
})

export default userSlice.reducer