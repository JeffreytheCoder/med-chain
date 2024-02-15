import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React, { useCallback,useContext } from 'react'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert'
import AddRecordModal from './AddRecordModal'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import ipfs from '../../ipfs'
import Record from '../../components/Record'
import CryptoJS from "crypto-js";




const Doctor = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()
  const { setAlert } = useAlert()

  const [patientExist, setPatientExist] = useState(false)
  const [searchPatientAddress, setSearchPatientAddress] = useState('')
  const [records, setRecords] = useState([])
  const [addRecord, setAddRecord] = useState(false)
  const [requestPatientAddress,setRequestPatientAddress] = useState('')
  const [access,setAccess] = useState(false)


  

  const searchPatient = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(searchPatientAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      const patientExists = await contract.methods.getPatientExists(searchPatientAddress).call({ from: accounts[0] })
      if (patientExists) {
        setPatientExist(true)
        const access = await contract.methods.verifyAccess(searchPatientAddress,accounts[0]).call({ from: accounts[0] })
        setAccess(access)
        if(access){
        // setAlert("you have access","success")
        const records = await contract.methods.getRecordsDoctor(searchPatientAddress).call({ from: accounts[0] })
        console.log('records :>> ', records)
        setRecords(records)
      }
      else{
        setAlert("Access Denied, request patient!","error")
        // setAccess(false)

      }

      }
       else if(!patientExists) {
        setAlert('Patient does not exist', 'error')
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getRequestAccess = async () => {
    try {
      if (!/^(0x)?[0-9a-f]{40}$/i.test(requestPatientAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
      const patientExists = await contract.methods.getPatientExists(requestPatientAddress).call({ from: accounts[0] })
      // console.log(requestPatientAddress)
      if(patientExists){
        await contract.methods.requestAccess(requestPatientAddress).send({ from : accounts[0] })
        setAlert('request sent successfully!','success')
      
    }
    else{
      setAlert("patient does not exist!","error")
    }
  }
    catch(err){
      console.error(err)
    }
  }

  const addRecordCallback = useCallback(
    async (buffer, fileName, patientAddress) => {
      if (!patientAddress) {
        setAlert('Please search for a patient first', 'error')
        return
      }
      try {
        const key = "oiewrhg5623475vbeihc39873948^&%E@ZfytfE#&@^ tf1wufhx231277!*YE2"
        const res = await ipfs.add(buffer)
        const ipfsHashValue = res[0].hash
        const ipfsBytes = CryptoJS.enc.Utf8.parse(ipfsHashValue);
        var ipfsHash = CryptoJS.AES.encrypt(ipfsBytes, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL)
        // console.log(ipfsHash)
        // console.log(ipfsHashValue)
       

        if (ipfsHash) {
          await contract.methods.addRecord(ipfsHash, fileName, patientAddress).send({ from: accounts[0] })
          setAlert('New record uploaded', 'success')
          setAddRecord(true)

          // refresh records
          const records = await contract.methods.getRecordsDoctor(patientAddress).call({ from: accounts[0] })
          setRecords(records)
        }
        
      } catch (err) {
        setAlert('Record upload failed', 'error')
        console.error(err)
      }
    },
    [searchPatientAddress, accounts, contract]
  )

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
              {role === 'unknown' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>You're not registered, please go to home page</Typography>
                </Box>
              )}
              {role === 'patient' || role === 'admin' && (
                <Box display='flex' justifyContent='center'>
                  <Typography variant='h5'>Only doctor can access this page</Typography>
                </Box>
              )}
              {role === 'doctor' && (
                <>
                  <Modal open={addRecord} onClose={() => setAddRecord(false)}>
                    <AddRecordModal
                      handleClose={() => setAddRecord(false)}
                      handleUpload={addRecordCallback}
                      patientAddress={searchPatientAddress}
                    />
                  </Modal>

                  <Typography variant='h4'>Patient Records</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Search patient by wallet address'
                        value={searchPatientAddress}
                        onChange={e => setSearchPatientAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    <Box mx={2}>
                      <CustomButton text={'Search'} handleClick={() => {searchPatient()}}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    {access && (
                    <CustomButton text={'New Record'} handleClick={() => setAddRecord(true)} disabled={!patientExist}>
                      <CloudUploadRoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                    )
                  }
                  </Box>

                  {patientExist && !access && (
                    <>
                     <Typography variant='h4'>Request Access</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter Patient Address to request'
                        value={requestPatientAddress}
                        onChange={e => setRequestPatientAddress(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    <Box mx={2}>
                      <CustomButton text={'Request'} handleClick={() => getRequestAccess()}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    </Box>
                    </>

                    )}

                  {patientExist && records.length === 0 && access && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No records found</Typography>
                    </Box>
                  )}

                  {patientExist && records.length > 0 && access && (
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      {records.map((record, index) => (
                        <Box mb={2}>
                          <Record key={index} record={record} />
                        </Box>
                      ))}
                    </Box>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    )
  }
}

export default Doctor
