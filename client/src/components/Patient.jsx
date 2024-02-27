import { Card, CardContent, Typography, Grid, Box } from '@mui/material'
import React from 'react'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import { grey } from '@mui/material/colors'
import useAlert from '../contexts/AlertContext/useAlert'




const Patient = ({ patient }) => {
  const [patientId,patientName,patientAge,patientGender,patientContact,patientLocation,patientCause] = patient



  const {setAlert} = useAlert()
  // const [b64,setb64] = useState("")



  return (
    <>
   
      <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <DescriptionRoundedIcon style={{ fontSize: 40, color: grey[700] }} />
          </Grid>
          <Grid item xs={3}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Id
              </Typography>
              <Typography variant='h6'>{patientId}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Name
              </Typography>
              <Typography variant='h6'>{patientName}</Typography>
            </Box>
          </Grid>
            <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Age
              </Typography>
              <Typography variant='h6'>{patientAge}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Gender
              </Typography>
              <Typography variant='h6'>{patientGender}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Contact
              </Typography>
              <Typography variant='h6'>{patientContact}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Location
              </Typography>
              <Typography variant='h6'>{patientLocation}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Patient Problem
              </Typography>
              <Typography variant='h6'>{patientCause}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

   
    </>
    
  )
}


export default Patient
