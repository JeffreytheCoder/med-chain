import { Box } from '@mui/material'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      {children}
    </Box>
  )
}

export default Layout
