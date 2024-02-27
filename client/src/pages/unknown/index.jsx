import useEth from '../../contexts/EthContext/useEth'
import { useNavigate } from 'react-router-dom'

const Unknown = () => {
	const {
    state: { role, loading, accounts },
    dispatch,
  } = useEth()

  const navigate = useNavigate()

  const ActionSection = () => {
    if (!accounts) {
      return (
       
          <h1>Open your MetaMask wallet to get connected, then refresh this page</h1>
        
      )
    } else {
      if (role === 'admin') {
      	return( navigate('/admin'))
       
      } else if (role === 'patient') {
      	return( navigate('/patient'))
       
      } else if (role === 'doctor') {
      	return(navigate('/doctor'))
       	
      }else if (role === 'emergencyPerson') {
        return(navigate('/emergencyPerson/seeRequests'))
        
      }else{
        return (
            <h1>Unknown</h1>
        )
      }

    }
  }
	return (
		<>
		<ActionSection/>
		</>
	)
}

export default Unknown;