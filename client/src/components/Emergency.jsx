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




const Emergency = ({ emergency }) => {
  const [personId,patientId,personName,personRelation,personContact,personLocation,access] = emergency

   const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const {setAlert} = useAlert()
  // const [b64,setb64] = useState("")

  const giveAccess = async (personId,access) => {
    try{
      await contract.methods.manageEmergencyAccess(personId,access).send({ from: accounts[0] })
      if(access){
        setAlert("access granted","success")
      }
      else{
        setAlert("access rejected","error")
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
                Person ID
              </Typography>
              <Typography variant='h6'>{personId}</Typography>
              <Typography variant='h6' color={grey[600]}>
                Patient ID
              </Typography>
              <Typography variant='h6'>{patientId}</Typography>
               <Typography variant='h6' color={grey[600]}>
                Person Name
              </Typography>
              <Typography variant='h6'>{personName}</Typography>
              <Typography variant='h6' color={grey[600]}>
                Relation
              </Typography>
              <Typography variant='h6'>{personRelation}</Typography>
              <Typography variant='h6' color={grey[600]}>
                Person Contact
              </Typography>
              <Typography variant='h6'>{personContact}</Typography>
              <Typography variant='h6' color={grey[600]}>
                Person Location
              </Typography>
              <Typography variant='h6'>{personLocation}</Typography>
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
      <Button variant="contained" color='error' value={personId} startIcon={<DeleteIcon />} onClick={(e) => giveAccess(e.target.value,false)}>
        Reject
      </Button>
      <Button variant="contained" color='success' value={personId} endIcon={<SendIcon />} onClick={(e) => giveAccess(e.target.value,true)}>
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


export default Emergency
