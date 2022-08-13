import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded'
import { teal } from '@mui/material/colors'
import VideoCover from 'react-video-cover'
import GoldenGate from '../assets/golden-gate.mp4'

const Home = () => {
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
      <Typography variant='h4' fontWeight='800' color='white'>
        MedChain
      </Typography>
      <Box mt={1} mb={2}>
        <Typography variant='h5' color='white'>
          Access to medical records everywhere, powered by Ethereum blockchain.
        </Typography>
      </Box>
      <Button
        startIcon={<AccountBalanceWalletRoundedIcon style={{ color: 'white' }} />}
        style={{
          backgroundColor: teal['A700'],
          textTransform: 'none',
          padding: '5px 15px',
        }}
      >
        <Typography variant='h6' color='white'>
          Collect wallet
        </Typography>
      </Button>
    </Box>
  )
}

export default Home
