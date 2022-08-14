import { Box, Alert, Typography } from '@mui/material'
import useAlert from '../../contexts/AlertContext/useAlert'

const AlertPopup = () => {
  const { text, type } = useAlert()

  if (text && type) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '8px',
          width: '100%',
          height: 'auto',
        }}
      >
        <Alert
          severity={type}
          sx={{
            position: 'absolute',
            zIndex: 1000000,
            width: 'auto',
            paddingRight: '25px',
          }}
        >
          <Typography variant='h6'>{text}</Typography>
        </Alert>
      </Box>
    )
  } else {
    return <></>
  }
}

export default AlertPopup
