import { Box, Divider, FormControl,Select,InputLabel,MenuItem, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert'
import validator from 'validator'
import '../../App.css'
import DoctorAccess from '../../components/access/doctorAccess'


  
  const RegisterPatient = () => {
    const {
    state: { contract, accounts, role, loading},
  } = useEth()
  const { setAlert } = useAlert()

  const [addPatientAddress, setAddPatientAddress] = useState('')
  const [addPatientName,setAddPatientName] = useState('')
  const [addPatientAge,setAddPatientAge] = useState('')
  const [addPatientGender,setAddPatientGender] = useState('')
  const [addPatientContact,setAddPatientContact] = useState('')
  const [addPatientLocation,setAddPatientLocation] = useState('')
  const [addPatientCause,setAddPatientCause] = useState('')






  const registerPatient = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(addPatientAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      if(addPatientName == ""){
        setAlert('Please enter valid Name','error')
        return
      }
      if(addPatientAge == ""){
        setAlert('Please enter valid Age','error')
        return
      }
      if(addPatientGender == ""){
        setAlert('Please enter valid gender','error')
        return
      }
      if(!validator.isMobilePhone(addPatientContact)){
        setAlert('Please enter valid mobile number','error')
        return
      }
      if(addPatientLocation == ""){
        setAlert('Please enter valid location','error')
        return
      }if(addPatientCause == ""){
        setAlert('Please enter valid cause','error')
        return
      }
      await contract.methods.addPatient(addPatientAddress,addPatientName,Number.parseInt(addPatientAge),addPatientGender,addPatientContact,addPatientLocation,addPatientCause).send({ from: accounts[0] })
        setAlert('Patient registered successfully!','success')
    } catch (err) {
      setAlert('Registration failed!','error')
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
             
              {role === 'doctor' && (
                <>
          
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
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter patient name'
                        value={addPatientName}
                        onChange={e => setAddPatientName(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter patient age'
                        value={addPatientAge}
                        onChange={e => setAddPatientAge(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <InputLabel sx={{fontSize:"15px"}} id="demo-simple-select-label">Gender</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={addPatientGender}
                        label="Gender"
                        onChange={(e) => setAddPatientGender(e.target.value)}
                        sx={{fontSize:"15px"}}
                      >
                        <MenuItem sx={{fontSize:"15px"}} value={"male"}>Male</MenuItem>
                        <MenuItem sx={{fontSize:"15px"}} value={"female"}>Female</MenuItem>
                        <MenuItem sx={{fontSize:"15px"}} value={"transgender"}>Transgender</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter patient mobile number'
                        value={addPatientContact}
                        onChange={e => setAddPatientContact(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <textarea
                        rows="8"
                        cols="50"
                        placeholder='Enter patient location'
                        value={addPatientLocation}
                        onChange={e => setAddPatientLocation(e.target.value)}
                      ></textarea>
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter patient problem'
                        value={addPatientCause}
                        onChange={e => setAddPatientCause(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                    <Box mx={2}>
                      <CustomButton text={'Register'} handleClick={() => registerPatient()}>
                        <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                </>
              )}
              <DoctorAccess role={role}/>
            </>
          )}
        </Box>
      </Box>
    )
  }

}

export default RegisterPatient