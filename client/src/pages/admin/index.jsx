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

const Admin = () => {
const [doctorAddress,setDoctorAddress] = useState('')
const [hospitalAddress,setHospitalAddress] = useState('')
const [doctorName,setDoctorName] = useState('')
const [doctorEmail,setDoctorEmail] = useState('')
const [doctorContact,setDoctorContact] = useState('')
const [doctorWork,setDoctorWork] = useState('')

  const {
    state: { contract, accounts, role, loading },
    dispatch,
  } = useEth()

  const {setAlert} = useAlert()
  const navigate = useNavigate()

  const registerDoctor = async () => {
    try {
       if (!/^(0x)?[0-9a-f]{40}$/i.test(doctorAddress)) {
        setAlert('Please enter a valid doctor address', 'error')
        return
      }
       if (!/^(0x)?[0-9a-f]{40}$/i.test(hospitalAddress)) {
        setAlert('Please enter a valid hospital address', 'error')
        return
      }
      if(doctorName == ""){
        setAlert('Please enter valid doctor name','error')
        return
      }
        if(!validator.isEmail(doctorEmail)){
        setAlert("Please enter valid doctor email",'error')
        return
      }
      if(!validator.isMobilePhone(doctorContact,'en-IN')){
        setAlert("Please enter valid doctor mobile no",'error')
        return
      }
    
      if(doctorWork == ""){
        setAlert("Please enter valid doctor work",'error')
        return
      }

      await contract.methods.addDoctor(doctorAddress,hospitalAddress,doctorName,doctorEmail,doctorContact,doctorWork).send({ from: accounts[0] })
      setAlert('Doctor Added Successfully!','success')
      dispatch({
        type: 'ADD_DOCTOR',
      })
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
                        placeholder='Register Doctor by wallet address'
                        value={doctorAddress}
                        onChange={e => setDoctorAddress(e.target.value)}
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
                        placeholder='Enter Doctor Name'
                        value={doctorName}
                        onChange={e => setDoctorName(e.target.value)}
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
                        placeholder='Enter Doctor Email'
                        value={doctorEmail}
                        onChange={e => setDoctorEmail(e.target.value)}
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
                        placeholder='Enter Doctor Mobile Number'
                        value={doctorContact}
                        onChange={e => setDoctorContact(e.target.value)}
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
                        placeholder='Enter Doctor Role'
                        value={doctorWork}
                        onChange={e => setDoctorWork(e.target.value)}
                        InputProps={{ style: { fontSize: '15px'} }}
                        InputLabelProps={{ style: { fontSize: '15px'} }}
                        size='small'
                      />
                    </FormControl>
                  </Box>
              <CustomButton text='Doctor Register' handleClick={() => registerDoctor()}>
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

export default Admin