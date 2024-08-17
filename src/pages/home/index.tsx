import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/new-cycle-form'
import { Countdown } from './components/countdown'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number(),
})

type NewCycleFormData = z.infer<typeof newCycleFormSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const totalSeconds = activeCycle
    ? activeCycle.minutesAmount * 60
    : 0

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate)

        if (secondsDifference >= totalSeconds) {
          setCycles((state) => state.map((cycle) => {
            if (cycle.id === activeCycleId) {
              return {
                ...cycle,
                finishedDate: new Date(),
              }
            } else {
              return cycle
            }
          }))
          clearInterval(interval)

          setActiveCycleId(null)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const { task, minutesAmount } = data

    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      minutesAmount,
      task,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }

  const currentSeconds = activeCycle
    ? totalSeconds - amountSecondsPassed
    : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const task = watch('task')
  const isButtonSubmitDisabled = !task

  function handleInterruptCycle() {
    setCycles((state) => state.map((cycle) => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date(),
        }
      } else {
        return cycle
      }
    }))

    setActiveCycleId(null)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm />

        <Countdown />

        {activeCycle
          ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
            )
          : (
            <StartCountdownButton
              disabled={isButtonSubmitDisabled}
              type="submit"
            >
              <Play size={24} />
              Começar
            </StartCountdownButton>
            )}
      </form>
    </HomeContainer>
  )
}
