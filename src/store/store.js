import { configureStore } from '@reduxjs/toolkit'
import testingReducer from '../../src/store/testing/testingSlice'

export const store = configureStore({
  reducer: {
      testing: testingReducer
  },
})