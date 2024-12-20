import { getRequests } from '@/services/grantService'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState: Record<string, any> = {
    data: [],
    loading: false,
    error: ""
}

export const fetchRequestData = createAsyncThunk('request/fetchRequestData', async () => {
    try {
        const response = await getRequests()
        if(!response.data) throw new Error("No fetched data");

        const requestData = response.data.map((application: any) => {
            return {
              ...application,
              id: application._id,
              name: application.firstName + " " + application.lastName,
            };
          })
        
        return requestData
    } catch (error) {
        console.error(error)
    }
})

export const requestSlice = createSlice({
    name: "request",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchRequestData.fulfilled, (state, action) => {
            state.data = action.payload??[]
        }).addCase(fetchRequestData.pending, (state) => {
            state.loading = true
        }).addCase(fetchRequestData.rejected, (state, action) => {
            state.error = action.error
        })
    },
})

export default requestSlice.reducer