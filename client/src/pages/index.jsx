import { Box, Button, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import VideoCover from 'react-video-cover'
import GoldenGate from '../assets/golden-gate.mp4'
import useEth from '../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'

const Home = () => {
  const {
    state: { contract, accounts, role },
  } = useEth()
  const navigate = useNavigate()

  // const [connected, setConnected] = useState(false)
  // const [role, setRole] = useState('unknown')

  // const getConnectedStatus = async () => {
  //   const role = await contract.methods.getSenderRole().call({ from: accounts[0] })
  //   console.log('role', role)
  //   setRole(role)
  // }

  const ActionSection = () => {
    if (!accounts) {
      return (
        <Typography variant='h5' color='white'>
          Open your MetaMask wallet to get connected, then refresh this page
        </Typography>
      )
    } else {
      if (role === 'unknown') {
        return (
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box mb={2}>
              <CustomButton text='Doctor Register' handleClick={() => navigate('/register-doctor')}>
                <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
              </CustomButton>
            </Box>
            <Typography variant='h5' color='white'>
              If you are a patient, ask your doctor to register for you
            </Typography>
          </Box>
        )
      } else if (role === 'patient') {
        return (
          <CustomButton text='Patient Portal' onClick={() => navigate('/patient/appointments')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      } else if (role === 'doctor') {
        return (
          <CustomButton text='Doctor Portal' onClick={() => navigate('/doctor/appointments')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      }
    }
  }

  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' width='100vw' height='100vh'>
      <Box
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <VideoCover
          videoOptions={{
            src: GoldenGate,
            autoPlay: true,
            loop: true,
            muted: true,
          }}
        />
      </Box>
      <Typography variant='h3' fontWeight='800' color='white'>
        MedChain
      </Typography>
      <Box mt={1} mb={2}>
        <Typography variant='h4' color='white'>
          Access to medical records everywhere, powered by Ethereum blockchain.
        </Typography>
      </Box>
      <ActionSection />
    </Box>
  )
}

export default Home
