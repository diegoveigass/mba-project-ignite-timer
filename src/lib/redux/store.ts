import { configureStore } from '@reduxjs/toolkit'
import cycleSlice from './slices/cycle-slice'
import { localStorageMiddleware } from './middleware/middlewares'

export const store = configureStore({
  reducer: {
    cycle: cycleSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(localStorageMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
