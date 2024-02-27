import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React, { useCallback,useContext } from 'react'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import Hospital from '../../components/Hospital'
import Doctor from '../../components/Doctor'
import AdminAccess from '../../components/access/adminAccess'





const SearchHospital = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()
  const { setAlert } = useAlert()

  const [hospitalExist, setHospitalExist] = useState(false)
  const [searchHospitalAddress, setSearchHospitalAddress] = useState('')
  const [hospitalDetails,setHospitalDetails] = useState([])
  
  

  const searchHospital = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(searchHospitalAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      const hospitalExists = await contract.methods.getHospitalExists(searchHospitalAddress).call({ from: accounts[0] })
      if (hospitalExists) {
        setHospitalExist(true)
    
        
        // setAlert("you have access","success")
        const hospitalDetails = await contract.methods.getHospital(searchHospitalAddress).call({ from: accounts[0] })
        console.log(' details :>> ', hospitalDetails)
        setHospitalDetails(hospitalDetails)
      }
      else{
        setAlert("Hospital not exist, register hospital!","error")
        // setAccess(false)

      }

      
    } catch (err) {
      console.log(err)
    }
  }


  if (loading) {
    return (
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    )
  } else {
    return (
      <Box display='flex' justifyContent='center' width='100vw'>
        <Box width='60%' my={5}>
          {!accounts ? (
            <Box display='flex' justifyContent='center'>
              <Typography variant='h6'>Open your MetaMask wallet to get connected, then refresh this page</Typography>
            </Box>
          ) : (
            <>
              
              {role === 'admin' && (
                <>

                  <Typography variant='h4'>Hospital Details</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Search Hospital by wallet address'
                        value={searchHospitalAddress}
                        onChange={e => setSearchHospitalAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    <Box mx={2}>
                      <CustomButton text={'Search'} handleClick={() => {searchHospital()}}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                  </Box>

                  {hospitalExist && hospitalDetails.length === 0 && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No records found</Typography>
                    </Box>
                  )}

                  {hospitalExist && hospitalDetails.length > 0 && (
                    <>
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                        <Box mb={2}>
                          <Hospital  hospital={hospitalDetails}/>
                        </Box>
                    </Box>
                    {hospitalDetails[hospitalDetails.length-1].length > 0 && (
                      <>
                      <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>{hospitalDetails[hospitalDetails.length-1].length} Doctors found</Typography>
                    </Box>
                        <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                         {hospitalDetails[hospitalDetails.length-1].map((doctor, index) => (
                        <Box mb={2}>
                          <Doctor key={index} doctor={doctor} />
                        </Box>
                      ))}
                    </Box>
                    </>

                      )}
                    {hospitalDetails[hospitalDetails.length-1].length == 0 && (

                      <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No Doctors found</Typography>
                    </Box>
                      )}
                  
                    </>
                  )}
                </>
              )}
              <AdminAccess role={role}/>
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default SearchHospital
