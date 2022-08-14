import { Card, CardContent, IconButton, Typography, Grid, Box } from '@mui/material'
import React from 'react'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import { grey } from '@mui/material/colors'
import moment from 'moment'
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded'
import { useNavigate } from 'react-router-dom'

const Record = ({ record }) => {
  const [cid, name, patientId, doctorId, timestamp] = record
  const navigate = useNavigate()

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <DescriptionRoundedIcon style={{ fontSize: 40, color: grey[700] }} />
          </Grid>
          <Grid item xs={3}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Record name
              </Typography>
              <Typography variant='h6'>{name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Doctor
              </Typography>
              <Typography variant='h6'>{doctorId}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Created time
              </Typography>
              <Typography variant='h6'>{moment.unix(timestamp).format('MM-DD-YYYY HH:mm')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <a href={`https://med-chain.infura-ipfs.io/ipfs/${cid}`} target='_blank' rel='noopener noreferrer'>
              <IconButton>
                <CloudDownloadRoundedIcon fontSize='large' />
              </IconButton>
            </a>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Record
