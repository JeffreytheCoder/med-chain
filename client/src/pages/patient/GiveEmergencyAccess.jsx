import React, { useState, useEffect, useContext } from 'react'
import { Box, Typography, Backdrop, CircularProgress,RadioGroup, FormControl,FormControlLabel,Radio,TextField} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import CustomButton from '../../components/CustomButton'
import useEth from '../../contexts/EthContext/useEth'
import validator from 'validator'
import useAlert from '../../contexts/AlertContext/useAlert'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import PatientAccess from '../../components/access/patientAccess'




const GiveEmergencyAccess = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const {setAlert} = useAlert()

  const [personAddress,setPersonAddress] = useState('')
  const [personName,setPersonName] = useState('')
  const [personRelation,setPersonRelation] = useState('')
  const [personContact,setPersonContact] = useState('')
  const [personLocation,setPersonLocation] = useState('')


    const addAccess = async () => {
      try{
         if (!/^(0x)?[0-9a-f]{40}$/i.test(personAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      if(personName == ""){
        setAlert("Enter valid name",'error')
        return
      }
      if(personRelation == ""){
        setAlert("Enter valid relation",'error')
        return
      }
       if(!validator.isMobilePhone(personContact)){
        setAlert("Enter valid mobile number",'error')
        return
      }
      if(personLocation == ""){
        setAlert("Enter valid location",'error')
        return
      }
     

        await contract.methods.addEmergencyAccess(personAddress,personName,personRelation,personContact,personLocation,true).send({ from: accounts[0] })
        // console.log(requests)
        setAlert("Emergency person added successfully",'success')
        return
      }catch(err){
        console.error(err)
      }
    }

  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  }
  else {
    return (
      <Box display='flex' justifyContent='center' width='100vw'>
        <Box width='60%' my={5}>
          <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
          {!accounts ? (
            <Box display='flex' justifyContent='center'>
              <Typography variant='h6'>Open your MetaMask wallet to get connected, then refresh this page</Typography>
            </Box>
          ) : (
            <>
              {role === 'patient' && (
                <>

                  <Typography variant='h4'>Add Emergency Person</Typography>

                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter person address'
                        value={personAddress}
                        onChange={e => setPersonAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter parson name'
                        value={personName}
                        onChange={e => setPersonName(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter person relation'
                        value={personRelation}
                        onChange={e => setPersonRelation(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                 
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter person mobile number'
                        value={personContact}
                        onChange={e => setPersonContact(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <textarea
                        rows="8"
                        cols="50"
                        placeholder='Enter patient location'
                        value={personLocation}
                        onChange={e => setPersonLocation(e.target.value)}
                      ></textarea>
                    </FormControl>
                    </Box>
                    <Box mx={2}>
                      <CustomButton text={'Add Access'} handleClick={() => addAccess()}>
                        <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>   
                </>
              )}
              <PatientAccess role={role}/>
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default GiveEmergencyAccess
