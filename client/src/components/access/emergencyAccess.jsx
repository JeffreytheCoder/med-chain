import React from 'react'
import {Box,Typography} from '@mui/material'

const EmergencyAccess = ({role}) => {
	return (
		<>
		<Box display='flex' my={10} justifyContent='center'>
		 	{role === 'unknown' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>You're not registered, please go to home page</Typography>
                </Box>
              )}
               {role === 'doctor' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only Emergency Person can access this page</Typography>
                </Box>
              )}
                {role === 'patient' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only Emergency Person can access this page</Typography>
                </Box>
              )}
                 {role === 'hospital' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only Emergency Person can access this page</Typography>
                </Box>
              )}
                  {role === 'admin' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only Emergency Person can access this page</Typography>
                </Box>
              )}
                  </Box>
                  </>
		)
} 

export default EmergencyAccess