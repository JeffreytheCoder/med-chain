import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import CustomButton from '../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../contexts/AlertContext/useAlert'
import { useState } from 'react'
import '../../App.css'
import validator from 'validator'
import AdminAccess from '../../components/access/adminAccess'

const RegisterHospital = () => {

const [hospitalAddress,setHospitalAddress] = useState('')
const [hospitalName,setHospitalName] = useState('')
const [hospitalContact,setHospitalContact] = useState('')


  const {
    state: { contract, accounts, role, loading }
  } = useEth()

  const {setAlert} = useAlert()
  const navigate = useNavigate()

  const registerHospital = async () => {
    try {
    
       if (!/^(0x)?[0-9a-f]{40}$/i.test(hospitalAddress)) {
        setAlert('Please enter a valid hospital address', 'error')
        return
      }
      if(hospitalName == ""){
        setAlert('Please enter valid hospital name','error')
        return
      }
      if(!validator.isMobilePhone(hospitalContact,'en-IN')){
        setAlert("Please enter valid hospital mobile no",'error')
        return
      }
    

      await contract.methods.addHospital(hospitalAddress,hospitalName,hospitalContact).send({ from: accounts[0] })
      setAlert('Hospital Added Successfully!','success')
      // dispatch({
      //   type: 'ADD_DOCTOR',
      // })
    } catch (err) {
      setAlert("transaction failed!",'error')
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
  else{

   return (
    <>
      {role === 'admin' && (
          <div className='register-doctor'>
          <Box display='flex' flexDirection='column' alignItems='center'>
            {/*<Box mb={2}>*/}
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        color='secondary'
                        variant='outlined'
                        placeholder='Enter hospital address'
                        value={hospitalAddress}
                        onChange={e => setHospitalAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px'} }}
                        InputLabelProps={{ style: { fontSize: '15px'} }}
                        size='small'
                      />
                    </FormControl>
                  </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        color='secondary'
                        variant='outlined'
                        placeholder='Enter hospital Name'
                        value={hospitalName}
                        onChange={e => setHospitalName(e.target.value)}
                        InputProps={{ style: { fontSize: '15px'} }}
                        InputLabelProps={{ style: { fontSize: '15px'} }}
                        size='small'
                      />
                    </FormControl>
                  </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        color='secondary'
                        variant='outlined'
                        placeholder='Enter hospital Mobile Number'
                        value={hospitalContact}
                        onChange={e => setHospitalContact(e.target.value)}
                        InputProps={{ style: { fontSize: '15px'} }}
                        InputLabelProps={{ style: { fontSize: '15px'} }}
                        size='small'
                      />
                    </FormControl>
                  </Box>
              <CustomButton text='Hospital Register' handleClick={() => registerHospital()}>
                <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
              </CustomButton>
            {/*</Box>*/}
            <Typography variant='h5' color='black'>
              If you are a patient, ask your doctor to register for you
            </Typography>
          </Box>
          </div> 

        )}
        <AdminAccess role={role}/>
     
          </>
        )
 }

}

export default RegisterHospital