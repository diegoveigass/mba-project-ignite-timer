import { createListenerMiddleware } from '@reduxjs/toolkit'

import { createCycle } from '../slices/cycle-slice'

export const localStorageMiddleware = createListenerMiddleware()

localStorageMiddleware.startListening({
  actionCreator: createCycle,
  effect: (action) => {
    console.log('cycle create', action.payload)
  },
})
