import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React, { useCallback,useContext } from 'react'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import Doctor from '../../components/Doctor'
import AdminAccess from '../../components/access/adminAccess'





const SearchDoctor = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()
  const { setAlert } = useAlert()

  const [doctorExist, setDoctorExist] = useState(false)
  const [searchDoctorAddress, setSearchDoctorAddress] = useState('')
  const [doctorDetails,setDoctorDetails] = useState([])
  
  

  const searchDoctor = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(searchDoctorAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      const doctorExists = await contract.methods.getDoctorExists(searchDoctorAddress).call({ from: accounts[0] })
      if (doctorExists) {
        setDoctorExist(true)
    
        
        // setAlert("you have access","success")
        const doctorDetails = await contract.methods.getDoctor(searchDoctorAddress).call({ from: accounts[0] })
        console.log(' details :>> ', doctorDetails)
        setDoctorDetails(doctorDetails)
      }
      else{
        setAlert("Doctor not exist, register doctor!","error")
        // setAccess(false)

      }

      
    } catch (err) {
      console.log(err)
    }
  }


  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return (
      <Box display='flex' justifyContent='center' width='100vw'>
        <Box width='60%' my={5}>
          {!accounts ? (
            <Box display='flex' justifyContent='center'>
              <Typography variant='h6'>Open your MetaMask wallet to get connected, then refresh this page</Typography>
            </Box>
          ) : (
            <>
             
              {role === 'admin' && (
                <>

                  <Typography variant='h4'>Doctor Details</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Search Hospital by wallet address'
                        value={searchDoctorAddress}
                        onChange={e => setSearchDoctorAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    <Box mx={2}>
                      <CustomButton text={'Search'} handleClick={() => {searchDoctor()}}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                  </Box>

                  {doctorExist && doctorDetails.length === 0 && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No records found</Typography>
                    </Box>
                  )}

                  {doctorExist && doctorDetails.length > 0 && (
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      
                        <Box mb={2}>
                          <Doctor  doctor={doctorDetails}/>
                        </Box>
                      
                    </Box>
                  )}
                </>
              )}
              <AdminAccess role={role}/>
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default SearchDoctor
