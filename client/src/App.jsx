import { EthProvider } from './contexts/EthContext'
import routes from './routes'
import { useRoutes } from 'react-router-dom'
import { AlertProvider } from './contexts/AlertContext/AlertContext'
import { MyProvider } from './contexts/PermissionContext/PermissionContext'

function App() {
  const content = useRoutes(routes)

  return (
    <EthProvider>
      <AlertProvider>
      <MyProvider>
      {content}
      </MyProvider>
      </AlertProvider>
    </EthProvider>
  )
}


export default App
