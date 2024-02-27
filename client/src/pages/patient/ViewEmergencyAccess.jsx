import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Backdrop, CircularProgress,RadioGroup, FormControl,FormControlLabel,Radio} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CustomButton from '../../components/CustomButton'
import useEth from '../../contexts/EthContext/useEth'
import Emergency from '../../components/Emergency'
import useAlert from '../../contexts/AlertContext/useAlert'
import PatientAccess from '../../components/access/patientAccess'


const ViewEmergencyAccess = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const [access,setAccess] = useState([])
  const [viewAccess,setViewAccess] = useState(false)

  const {setAlert} = useAlert()

    const getAccess = async () => {
      try{
        const access = await contract.methods.viewEmergencyAccess().call({ from: accounts[0] })
        // console.log(requests)
        setAccess(access)
        setViewAccess(true)
        return
      }catch(err){
        console.error(err)
      }
    }

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
  else {
    return (
      <Box display='flex' justifyContent='center' width='100vw'>
        <Box width='60%' my={5}>
          <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
          {!accounts ? (
            <Box display='flex' justifyContent='center'>
              <Typography variant='h6'>Open your MetaMask wallet to get connected, then refresh this page</Typography>
            </Box>
          ) : (
            <>
             
              {role === 'patient' && (
                <>
                  <Box mx={2}>
                      <CustomButton text={'See Access'} handleClick={() => getAccess()}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    {access.length > 0 && viewAccess && (
                      <>
                         <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      {access.map((access, index) => (
                        <Box mb={2}>
                          <Emergency key={index} emergency={access} />
                        </Box>
                      ))}
                    </Box>
                    <Box mx={2}>
                      <CustomButton text={'Close Requests'} handleClick={() => setViewAccess(false)}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    </>


                      )}
                    {access.length == 0 && viewAccess && (
                        setAlert('No access given','error')
                      )}
                
                    
                </>
              )}
              <PatientAccess role={role}/>
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default ViewEmergencyAccess
