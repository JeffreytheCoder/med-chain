import { AppBar, Chip, Toolbar, Box, Typography } from '@mui/material'
import React from 'react'
import useEth from '../../contexts/EthContext/useEth'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import logo from '../../assets/MedBlock.png'
import { grey, teal } from '@mui/material/colors'
import '../../App.css'

const HeaderAppBar = () => {
  const {
    state: { accounts, role },
  } = useEth()

  return (
    <AppBar position='static' style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
          <a href='/'>
            <img src={logo} alt='med-chain-logo' style={{ height: 80, weight: 80 }} />
          </a>
          {role === 'doctor' && (
            <>
             <a className='register-patient-nav' href='/doctor/registerPatient'>
             Register Patient
              </a>
               <a className='register-patient-nav' href='/doctor' style={{marginLeft:20}}>
             Search Patient
              </a>
              </>
            )}
           {role === 'admin' && (
            <>
             <a className='register-patient-nav' href='/admin/registerDoctor' >
             Register Doctor
              </a>
               <a className='register-patient-nav' href='/admin/searchDoctor' style={{marginLeft:20}}>
             Search Doctor
              </a>
              <a className='register-patient-nav' href='/admin/registerHospital' style={{marginLeft:20}}>
             Register Hospital
              </a>
               <a className='register-patient-nav' href='/admin/searchHospital' style={{marginLeft:20}} >
             Search Hospital
              </a>
              </>
            )}
           {role === 'patient' && (
            <>
              <a className='register-patient-nav' href='/patient/giveEmergencyAccess' >
             Emergency Access
              </a>
               <a className='register-patient-nav' href='/patient/viewAccessRequests' style={{marginLeft:20}}>
             Access Requests
              </a>
               <a className='register-patient-nav' href='/patient/viewEmergencyAccess' style={{marginLeft:20}}>
             Manage Access
              </a>
              </>
            )}
           {role === 'emergencyPerson' && (
              <>
              <a className='register-patient-nav' href='/emergencyPerson/seeRequests' >
             Emergency Requests
              </a>
              </>

            )}
          <Box flexGrow={1} />
          <Box display='flex' alignItems='center'>
            <Box mb={0.1}>
              <PersonRoundedIcon style={{ color: grey[700], fontSize: '22px' }} />
            </Box>
            <Box ml={0.5} mr={2}>
              <Typography variant='h6' color='black'>
                {accounts ? accounts[0] : 'Wallet not connected'}
              </Typography>
            </Box>
            <Chip
              label={role === 'unknown' ? 'not registered' : role}
              style={{ fontSize: '12px', backgroundColor: teal['A700'], color: 'white' }}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
export default HeaderAppBar
