import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { teal } from '@mui/material/colors'

const CustomButton = ({ text, handleClick, children }) => {
  return (
    <Button
      startIcon={children}
      style={{
        backgroundColor: teal['A700'],
        textTransform: 'none',
        padding: '10px 20px',
      }}
      onClick={handleClick}
    >
      <Typography variant='h5' color='white'>
        {text}
      </Typography>
    </Button>
  )
}

export default CustomButton
