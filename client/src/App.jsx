import { EthProvider } from './contexts/EthContext'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import { AlertProvider } from './contexts/AlertContext/AlertContext'

function App() {
  const content = useRoutes(routes)

  return (
    <EthProvider>
      <AlertProvider>{content}</AlertProvider>
    </EthProvider>
  )
}

export default App
