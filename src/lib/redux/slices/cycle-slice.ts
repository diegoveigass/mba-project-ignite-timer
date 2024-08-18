import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: string
  interruptedDate?: string
  finishedDate?: string
}

export interface CycleState {
  cycles: Cycle[]
  activeCycle: Cycle | null
}

const initialState = {
  cycles: [],
  activeCycle: null,
} as CycleState

export const cycleSlice = createSlice({
  name: '@app/cycle',
  initialState,
  reducers: {
    createCycle: (state, action: PayloadAction<Cycle>) => {
      state.cycles.push(action.payload)
      state.activeCycle = action.payload
    },
    markCurrentCycleAsInterrupted: (state) => {
      const cycleToInterruptIndex =
        state.cycles.findIndex((cycle) => cycle.id === state.activeCycle?.id)

      if (cycleToInterruptIndex === -1) { return state }

      state.cycles[cycleToInterruptIndex].interruptedDate =
      new Date().toISOString()

      state.activeCycle = null

      return state
    },
    markCurrentCycleAsFinished: (state) => {
      const cycleToFinishingIndex =
        state.cycles.findIndex((cycle) => cycle.id === state.activeCycle?.id)

      if (cycleToFinishingIndex === -1) { return state }

      state.cycles[cycleToFinishingIndex].finishedDate =
       new Date().toISOString()

      return state
    },
    setActiveCycle: (state, action: PayloadAction<Cycle | null>) => {
      state.activeCycle = action.payload
    },
  },
})

export const {
  createCycle,
  markCurrentCycleAsFinished,
  markCurrentCycleAsInterrupted,
  setActiveCycle,
} = cycleSlice.actions

export default cycleSlice.reducer
