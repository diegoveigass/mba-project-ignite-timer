import { configureStore } from '@reduxjs/toolkit'
import cycleSlice from './slices/cycle-slice'
import countdownSlice from './slices/countdown-slice'
import { localStorageMiddleware } from './middleware/middlewares'

export const store = configureStore({
  reducer: {
    cycle: cycleSlice,
    countdown: countdownSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(localStorageMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
