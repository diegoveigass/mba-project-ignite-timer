import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CountdownState {
  amountSecondsPassed: number
}

const initialState = {
  amountSecondsPassed: 0,
} as CountdownState

export const countdownSlice = createSlice({
  name: '@app/countdown',
  initialState,
  reducers: {

    setAmountSecondsPassed: (state, action: PayloadAction<number>) => {
      state.amountSecondsPassed = action.payload
    },
  },
})

export const {
  setAmountSecondsPassed,
} = countdownSlice.actions

export default countdownSlice.reducer
