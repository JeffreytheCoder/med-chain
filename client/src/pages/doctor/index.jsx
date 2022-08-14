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
import ipfs from '../../ipfs'
import { useEffect } from 'react'
import Record from '../../components/Record'

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
      if (!/^(0x)?[0-9a-f]{40}$/i.test(searchPatientAddress)) {
        setAlert('Please enter a valid wallet address', 'error')
        return
      }
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
      await contract.methods.addPatient(addPatientAddress).send({ from: accounts[0] })
    } catch (err) {
      console.error(err)
    }
  }

  const addRecordCallback = useCallback(
    async (buffer, fileName, patientAddress) => {
      console.log('patientAddress :>> ', patientAddress)
      if (!patientAddress) {
        setAlert('Please search for a patient first', 'error')
        return
      }
      try {
        const res = await ipfs.add(buffer)
        const ipfsHash = res[0].hash
        if (ipfsHash) {
          console.log('ipfsHash, fileName,searchPatientAddress :>> ', ipfsHash, fileName, patientAddress)
          await contract.methods.addRecord(ipfsHash, fileName, patientAddress).send({ from: accounts[0] })
          setAlert('Record uploaded', 'success')
          setAddRecord(false)
        }
      } catch (err) {
        setAlert('Record upload failed', 'error')
        console.error(err)
      }
    },
    [addPatientAddress, accounts, contract]
  )

  return (
    <Box width='60%' my={5}>
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
          <CustomButton text={'Search'} handleClick={() => searchPatient()}>
            <SearchRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        </Box>
        <CustomButton text={'New Record'} handleClick={() => setAddRecord(true)} disabled={!patientExist}>
          <CloudUploadRoundedIcon style={{ color: 'white' }} />
        </CustomButton>
      </Box>

      {patientExist && records.length === 0 && (
        <Box display='flex' alignItems='center' justifyContent='center' my={5}>
          <Typography variant='h5'>No records found</Typography>
        </Box>
      )}

      {patientExist && records.length > 0 && (
        <Box display='flex' flexDirection='column' mt={3} mb={-2}>
          {records.map((record, index) => (
            <Box mb={2}>
              <Record key={index} record={record} />
            </Box>
          ))}
        </Box>
      )}

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
