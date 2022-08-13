import { EthProvider } from './contexts/EthContext'
import './App.css'
import routes from './routes'
import { useRoutes } from 'react-router-dom'

function App() {
  const content = useRoutes(routes)

  return (
    <EthProvider>
      <div id='App' className='container'>
        {content}
      </div>
    </EthProvider>
  )
}

export default App
