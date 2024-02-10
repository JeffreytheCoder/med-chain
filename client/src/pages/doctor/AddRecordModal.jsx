import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { DropzoneAreaBase } from 'material-ui-dropzone'
import { Box, Chip, IconButton, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import useAlert from '../../contexts/AlertContext/useAlert'
// import {skiffCrypto} from '@skiff-org/skiff-crypto'
import CryptoJS from "crypto-js";
 

const AddRecordModal = ({ handleClose, handleUpload, patientAddress }) => {
  const { setAlert } = useAlert()
  const [file, setFile] = useState(null)
  const [buffer, setBuffer] = useState(null)


 
  const handleFileChange = fileObj => {
    const { file } = fileObj
    setBuffer(null)
    setFile(file)
    console.log('file.name :>> ', file.name)

    var reader = new FileReader();
    reader.onload = () => {
        var key = "askfalq234234123kl4jlkfjalkdsfjq4j!@#LK%Ds#";
        var wordArray = CryptoJS.lib.WordArray.create(reader.result);           // Convert: ArrayBuffer -> WordArray
        var encrypted = CryptoJS.AES.encrypt(wordArray, key).toString();        // Encryption: I: WordArray -> O: -> Base64 encoded string (OpenSSL
        const buff = Buffer.from(encrypted);
        setBuffer(buff)
        console.log(buff)

        // var a = document.createElement("a");
        // var url = window.URL.createObjectURL(fileEnc);
        // var filename = file.name + ".enc";
        // a.href = url;
        // a.download = filename;
        // a.click();
        // window.URL.revokeObjectURL(url);
    };
    reader.readAsArrayBuffer(file);

  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        weight: '100vw',
      }}
    >
      <Box
        width='50vw'
        style={{
          backgroundColor: 'white',
          boxShadow: 24,
          borderRadius: 10,
        }}
        p={2}
        pr={6}
        pb={0}
        position='relative'
      >
        <Box position='absolute' sx={{ top: 5, right: 5 }}>
          <IconButton onClick={() => handleClose()}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Box display='flex' flexDirection='column' my={1}>
          <Typography variant='h4'>Add Record</Typography>
          <Box my={2}>
            <DropzoneAreaBase
              onAdd={fileObjs => handleFileChange(fileObjs[0])}
              onDelete={fileObj => {
                setFile(null)
                setBuffer(null)
              }}
              onAlert={(message, variant) => setAlert(message, variant)}
            />

          </Box>
          <Box display='flex' justifyContent='space-between' mb={2}>
            {file && <Chip label={file.name} onDelete={() => setFile(null)} style={{ fontSize: '12px' }} />}
            <Box flexGrow={1} />
            <CustomButton
              text='upload'
              handleClick={() => handleUpload(buffer, file.name, patientAddress)}
              disabled={!file || !buffer}
            />
            
          </Box>
        </Box>
      </Box>
                    
    </Box>
  )
}

export default AddRecordModal
