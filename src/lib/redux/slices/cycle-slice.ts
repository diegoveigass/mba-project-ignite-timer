import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { differenceInSeconds } from 'date-fns'

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
  amountSecondsPassed: number
}

const cyclesStoraged = localStorage.getItem('@app/cycles') !== null
  ? JSON.parse(localStorage.getItem('@app/cycles')!) as Cycle[]
  : []

const activeCycleStoraged = localStorage.getItem('@app/active-cycle') !== null
  ? JSON.parse(localStorage.getItem('@app/active-cycle')!) as Cycle
  : null

const initialState = {
  cycles: cyclesStoraged,
  activeCycle: activeCycleStoraged,
  amountSecondsPassed: activeCycleStoraged
    ? differenceInSeconds(
      new Date(),
      new Date(activeCycleStoraged?.startDate))
    : 0,

} as CycleState

export const cycleSlice = createSlice({
  name: '@app/cycle',
  initialState,
  reducers: {
    createCycle: (state, action: PayloadAction<Cycle>) => {
      state.cycles.push(action.payload)
      state.activeCycle = action.payload

      localStorage.setItem('@app/cycles', JSON.stringify(state.cycles))
      localStorage.setItem(
        '@app/active-cycle', JSON.stringify(state.activeCycle),
      )
    },
    markCurrentCycleAsInterrupted: (state) => {
      const cycleToInterruptIndex =
        state.cycles.findIndex((cycle) => cycle.id === state.activeCycle?.id)

      if (cycleToInterruptIndex < 0) { return state }

      state.cycles[cycleToInterruptIndex].interruptedDate =
      new Date().toISOString()

      state.activeCycle = null
      state.amountSecondsPassed = 0

      localStorage.setItem('@app/cycles', JSON.stringify(state.cycles))
      localStorage.setItem(
        '@app/active-cycle', JSON.stringify(state.activeCycle),
      )
    },
    markCurrentCycleAsFinished: (state) => {
      const cycleToFinishingIndex =
        state.cycles.findIndex((cycle) => cycle.id === state.activeCycle?.id)

      if (cycleToFinishingIndex < 0) { return state }

      state.cycles[cycleToFinishingIndex].finishedDate =
       new Date().toISOString()

      localStorage.setItem('@app/cycles', JSON.stringify(state.cycles))
    },
    setActiveCycle: (state, action: PayloadAction<Cycle | null>) => {
      state.activeCycle = action.payload
      localStorage.setItem(
        '@app/active-cycle', JSON.stringify(state.activeCycle),
      )
    },
    setAmountSecondsPassed: (state, action: PayloadAction<number>) => {
      state.amountSecondsPassed = action.payload
    },
  },
})

export const {
  createCycle,
  markCurrentCycleAsFinished,
  markCurrentCycleAsInterrupted,
  setActiveCycle,
  setAmountSecondsPassed,
} = cycleSlice.actions

export default cycleSlice.reducer
