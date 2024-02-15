import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Backdrop, CircularProgress,RadioGroup, FormControl,FormControlLabel,Radio} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CustomButton from '../../components/CustomButton'
import useEth from '../../contexts/EthContext/useEth'
import Record from '../../components/Record'
import { MyContext } from '../../contexts/PermissionContext/PermissionContext';
import Request from '../../components/Request'

const Patient = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const [records, setRecords] = useState([])
  const [loadingRecords, setLoadingRecords] = useState(true)

  const [requests,setRequests] = useState([])
  const [viewRequest,setViewRequest] = useState(false)




  useEffect(() => {

    const getRecords = async () => {
      try {
        const records = await contract.methods.getRecords(accounts[0]).call({ from: accounts[0] })
        // console.log(records)
        setRecords(records)
        setLoadingRecords(false)
      } catch (err) {
        console.error(err)
        setLoadingRecords(true)
      }
    }

      
    getRecords()
    
    
  })

    const getRequests = async () => {
      try{
        const requests = await contract.methods.getRequests(accounts[0]).call({ from: accounts[0] })
        console.log(requests)
        setRequests(requests)
        setViewRequest(true)
        return
      }catch(err){
        console.error(err)
      }
    }

  if (loading || loadingRecords) {
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
              {role === 'unknown' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>You're not registered, please go to home page</Typography>
                </Box>
              )}
              {role === 'doctor' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only patient can access this page</Typography>
                </Box>
              )}
              {role === 'patient' && (
                <>
                  <Typography variant='h4'>My Records</Typography>

                  {records.length === 0 && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No records found</Typography>
                    </Box>
                  )}

                  {records.length > 0 && (
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      {records.map((record, index) => (
                        <Box mb={2}>
                          <Record key={index} record={record} />
                        </Box>
                      ))}
                    </Box>
                  )}
                  <Box mx={2}>
                      <CustomButton text={'See Requests'} handleClick={() => getRequests()}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    {requests.length > 0 && viewRequest && (
                      <>
                         <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      {requests.map((request, index) => (
                        <Box mb={2}>
                          <Request key={index} request={request} />
                        </Box>
                      ))}
                    </Box>
                    <Box mx={2}>
                      <CustomButton text={'Close Requests'} handleClick={() => setViewRequest(false)}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    </>


                      )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default Patient
