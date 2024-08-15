import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tarefa 1</td>
              <td>50 minutos</td>
              <td>Há cerca de 1 dia</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>50 minutos</td>
              <td>Há cerca de 1 dia</td>
              <td>
                <Status statusColor="yellow">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>50 minutos</td>
              <td>Há cerca de 1 dia</td>
              <td>
                <Status statusColor="green">Concluído</Status>
              </td>
            </tr>
            <tr>
              <td>Tarefa 1</td>
              <td>50 minutos</td>
              <td>Há cerca de 1 dia</td>
              <td>
                <Status statusColor="red">Interrompido</Status>
              </td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
