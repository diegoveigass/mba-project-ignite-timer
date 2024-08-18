import { FormContainer, MinutesAmountInput, TaskInput } from './styles'
import { useAppSelector } from '../../../../lib/redux/hooks'
import { useFormContext } from 'react-hook-form'

export function NewCycleForm() {
  const { register } = useFormContext()
  const activeCycle = useAppSelector((state) => state.cycle.activeCycle)

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        {...register('task')}
        type="text"
        id="task"
        list="task-suggestions"
        disabled={!!activeCycle}
        placeholder="De um nome para o seu projeto"
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountInput
        {...register('minutesAmount', { valueAsNumber: true })}
        type="number"
        id="minutesAmount"
        placeholder="00"
        disabled={!!activeCycle}
        max={60}
        min={5}
        step={5}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
