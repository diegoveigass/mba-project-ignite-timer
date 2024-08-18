import { configureStore } from '@reduxjs/toolkit'
import cycleSlice from './slices/cycle-slice'
import countdownSlice from './slices/countdown-slice'

export const store = configureStore({
  reducer: {
    cycle: cycleSlice,
    countdown: countdownSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
