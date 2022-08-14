import { Box, Divider, FormControl, Modal, TextField, Typography } from '@mui/material'
import React, { useCallback } from 'react'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import useEth from '../../contexts/EthContext/useEth'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded'
import useAlert from '../../contexts/AlertContext/useAlert'
import AddRecordModal from './AddRecordModal'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'

const Doctor = () => {
  const {
    state: { contract, accounts, role },
    dispatch,
  } = useEth()
  const { setAlert } = useAlert()

  const [patientExist, setPatientExist] = useState(false)
  const [searchPatientAddress, setSearchPatientAddress] = useState('')
  const [addPatientAddress, setAddPatientAddress] = useState('')
  const [records, setRecords] = useState([])
  const [addRecord, setAddRecord] = useState(false)

  const searchPatient = async () => {
    try {
      const patientExists = await contract.methods.getPatientExists(searchPatientAddress).call({ from: accounts[0] })
      if (patientExists) {
        const records = await contract.methods.getRecords(searchPatientAddress).call({ from: accounts[0] })
        console.log('records :>> ', records)
        setRecords(records)
        setPatientExist(true)
      } else {
        setAlert('Patient does not exist', 'error')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const registerPatient = async () => {
    try {
      console.log('addPatientAddress :>> ', addPatientAddress)
      await contract.methods.addPatient(addPatientAddress).send({ from: accounts[0] })
    } catch (err) {
      console.error(err)
    }
  }

  const addRecordCallback = useCallback(
    async file => {
      try {
        console.log('file :>> ', file)
      } catch (err) {
        console.error(err)
      }
    },
    [addPatientAddress, accounts, contract]
  )

  return (
    <Box width='60%' my={5}>
      <Modal open={addRecord} onClose={() => setAddRecord(false)}>
        <AddRecordModal handleClose={() => setAddRecord(false)} handleUpload={addRecordCallback} />
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
          <CustomButton text={'Search'} handleClick={() => searchPatient()}>
            <SearchRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        </Box>
        <CustomButton text={'New Record'} handleClick={() => setAddRecord(true)} disabled={!patientExist}>
          <CloudUploadRoundedIcon style={{ color: 'white' }} />
        </CustomButton>
      </Box>

      <Box mt={6} mb={4}>
        <Divider />
      </Box>

      <Typography variant='h4'>Register Patient</Typography>
      <Box display='flex' alignItems='center' my={1}>
        <FormControl fullWidth>
          <TextField
            variant='outlined'
            placeholder='Register patient by wallet address'
            value={addPatientAddress}
            onChange={e => setAddPatientAddress(e.target.value)}
            InputProps={{ style: { fontSize: '15px' } }}
            InputLabelProps={{ style: { fontSize: '15px' } }}
            size='small'
          />
        </FormControl>
        <Box mx={2}>
          <CustomButton text={'Register'} handleClick={() => registerPatient()}>
            <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Doctor
