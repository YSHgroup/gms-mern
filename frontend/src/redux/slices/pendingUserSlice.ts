
import { allowPendingUser, getPendingUser, rejectPendingUser } from '@/services/userService'
import { PendingUser } from '@/types/userInfo';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPendingUser = createAsyncThunk(
    'pending_user/fetchPendingUser',
    async () => {
        const response = await getPendingUser(); // Call your async function
        if(response.error) throw Error(JSON.stringify(response.error))
        return response; // Return the result
    }
);

export const allowPendingUserController = createAsyncThunk(
    'pending_user/allowPendingUserController',
    async (id: string) => {
        await allowPendingUser(id); // Call your async function
        const response = await getPendingUser()
        if(response.error) throw Error(JSON.stringify(response.error))
        return response; // Return the result
    }
);

export const rejectPendingUserController = createAsyncThunk(
    'pending_user/rejectPendingUserController',
    async (id: string) => {
        await rejectPendingUser(id); // Call your async function
        const response = await getPendingUser()
        if(response.error) throw Error(JSON.stringify(response.error))
        return response; // Return the result
    }
);


type PendingUserState = {
    pendingUsers: PendingUser[]
    loading: boolean
    error: null | string | undefined
}

const initialState: PendingUserState = {
    pendingUsers: [],
    loading: false,
    error: '',
}

export const pendingUserSlice = createSlice({
  name: 'pending_user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchPendingUser.pending, (state) => {
            state.loading = true; // Set loading state
            console.log('pending pending: ')
        })
        .addCase(fetchPendingUser.fulfilled, (state, action) => {
            console.log('pending fulfilled: ', action.payload)
            state.loading = false; // Reset loading state
            state.pendingUsers = action.payload.pendingUser; // Set the fetched users
        })
        .addCase(fetchPendingUser.rejected, (state, action) => {
            console.log('pending rejected: ', action.payload)
            state.loading = false; // Reset loading state
            state.error = action.error.message; // Set error message
        })
        .addCase(allowPendingUserController.fulfilled, (state, action) => {
            state.pendingUsers = action.payload.pendingUser; // Set error message
            console.log('pending: ', action.payload)
        })
        .addCase(rejectPendingUserController.fulfilled, (state, action) => {
            state.pendingUsers = action.payload.pendingUser; // Set error message
            console.log('pending: ', state.pendingUsers, action.payload)
        })}
})

// Action creators are generated for each case reducer function
// export { fetchPendingUser }

export default pendingUserSlice.reducer