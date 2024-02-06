import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import CustomButton from '../../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import useAlert from '../../contexts/AlertContext/useAlert'
import { useState } from 'react'
import '../../App.css'

const Admin = () => {
const [doctorAddress,setDoctorAddress] = useState('')

  const {
    state: { contract, accounts },
    dispatch,
  } = useEth()

  const {setAlert} = useAlert()
  const navigate = useNavigate()

  const registerDoctor = async () => {
    try {
       if (!/^(0x)?[0-9a-f]{40}$/i.test(doctorAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      await contract.methods.addDoctor(doctorAddress).send({ from: accounts[0] })
      setAlert('Doctor Added Successfully!','success')
      dispatch({
        type: 'ADD_DOCTOR',
      })
    } catch (err) {
      console.error(err)
    }
  }

   return (
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
              <CustomButton text='Doctor Register' handleClick={() => registerDoctor()}>
                <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
              </CustomButton>
            {/*</Box>*/}
            <Typography variant='h5' color='black'>
              If you are a patient, ask your doctor to register for you
            </Typography>
          </Box>
          </div>
        )

}

export default Admin