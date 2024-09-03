import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   formSubmissionResponse:""
}

export const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    submissionMessage: (state) => {

      state.formSubmissionResponse = "Form Submitted Successfully"
    }
  
  },
})

// Action creators are generated for each case reducer function
export const { submissionMessage } = testingSlice.actions

export default testingSlice.reducer