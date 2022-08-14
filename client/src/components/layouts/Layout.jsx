import { AppBar, Chip, Toolbar, Box, Typography } from '@mui/material'
import React from 'react'
import useEth from '../../contexts/EthContext/useEth'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import logo from '../../assets/tealNoBG-cropped.png'
import { grey, teal } from '@mui/material/colors'

const HeaderAppBar = () => {
  const {
    state: { accounts, role },
  } = useEth()

  return (
    <AppBar position='static' style={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
          <a href='/'>
            <img src={logo} alt='med-chain-logo' style={{ height: 20, weight: 20 }} />
          </a>
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
