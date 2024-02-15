import { Card, CardContent, Typography, Grid, Box } from '@mui/material'
import React from 'react'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import { grey } from '@mui/material/colors'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import useEth from '../contexts/EthContext/useEth'
import useAlert from '../contexts/AlertContext/useAlert'




const Request = ({ request }) => {
  const [access,doctorId] = request

   const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const {setAlert} = useAlert()
  // const [b64,setb64] = useState("")

  const givePermission = async (doctorId,access) => {
    try{
      await contract.methods.grantAccess(doctorId,access).send({ from: accounts[0] })
      if(access){
        setAlert("request granted","success")
      }
      else{
        setAlert("request rejected","error")
      }

    }catch(err){
      console.error(err);
    }
  }


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
                Request From
              </Typography>
              <Typography variant='h6'>{doctorId}</Typography>
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Access
              </Typography>
              <Typography variant='h6'>{access.toString()}</Typography>
            </Box>
          </Grid>
            <Grid item xs={10}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h6' color={grey[600]}>
                Access
              </Typography>
               <Box mx={2} display='flex' flexDirection='row'>
                      <Stack direction="row" spacing={2}>
      <Button variant="contained" color='error' value={doctorId} startIcon={<DeleteIcon />} onClick={(e) => givePermission(e.target.value,false)}>
        Reject
      </Button>
      <Button variant="contained" color='success' value={doctorId} endIcon={<SendIcon />} onClick={(e) => givePermission(e.target.value,true)}>
        Accept
      </Button>
    </Stack>
                </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>

   
    </>
    
  )
}

export default Request
