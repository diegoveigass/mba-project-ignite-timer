import { HandPalm, Play } from 'phosphor-react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from './components/new-cycle-form'
import { Countdown } from './components/countdown'
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks'
import {
  createCycle,
  Cycle,
  markCurrentCycleAsInterrupted,
} from '../../lib/redux/slices/cycle-slice'
import { setAmountSecondsPassed } from '../../lib/redux/slices/countdown-slice'

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.number(),
})

type NewCycleFormData = z.infer<typeof newCycleFormSchema>

export function Home() {
  const dispatch = useAppDispatch()

  const activeCycle = useAppSelector(state => state.cycle.activeCycle)

  console.log(activeCycle)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    const { task, minutesAmount } = data

    const newCycle: Cycle = {
      id: new Date().getTime().toString(),
      minutesAmount,
      task,
      startDate: new Date().toISOString(),
    }

    dispatch(createCycle(newCycle))

    reset()
  }

  function handleInterruptCycle() {
    dispatch(markCurrentCycleAsInterrupted())
    dispatch(setAmountSecondsPassed(0))
  }

  const task = watch('task')
  const isButtonSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

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
              type="submit"
              disabled={isButtonSubmitDisabled}
            >
              <Play size={24} />
              Começar
            </StartCountdownButton>
            )}
      </form>
    </HomeContainer>
  )
}
