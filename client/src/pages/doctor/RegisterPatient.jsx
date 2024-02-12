import { Box, Divider, FormControl, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert' 

  
  const RegisterPatient = () => {
    const {
    state: { contract, accounts, role, loading},
  } = useEth()
  const { setAlert } = useAlert()

  const [addPatientAddress, setAddPatientAddress] = useState('')


  const registerPatient = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(addPatientAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      await contract.methods.addPatient(addPatientAddress).send({ from: accounts[0] })
        setAlert('Patient registered successfully!','success')
    } catch (err) {
      console.error(err)
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
              {role === 'unknown' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>You're not registered, please go to home page</Typography>
                </Box>
              )}
              {role === 'patient' || role === 'admin' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only doctor can access this page</Typography>
                </Box>
              )}
              {role === 'doctor' && (
                <>
                  <Box mt={6} mb={4}>
                    <Divider />
                  </Box>

                  <Typography variant='h4'>Register Patient</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Register patient by wallet address'
                        value={addPatientAddress}
                        onChange={e => setAddPatientAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    <Box mx={2}>
                      <CustomButton text={'Register'} handleClick={() => registerPatient()}>
                        <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                  </Box>
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }

}

export default RegisterPatient