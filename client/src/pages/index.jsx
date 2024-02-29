import { Box, FormControl, TextField, Typography, Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import VideoCover from 'react-video-cover'
import BackgroundVideo from '../assets/BackgroundVideo.mp4'
import logo from '../assets/MedBlock.png'
import useEth from '../contexts/EthContext/useEth'
import CustomButton from '../components/CustomButton'
import { useNavigate } from 'react-router-dom'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import '../App.css'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

function ResponsiveDialog() {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        View Information
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle sx={{fontSize:20}} id="responsive-dialog-title">
          {"Want to use Med-Block?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize:15}}>
            You're not recognised as a authorized person for this system, Please contact respective person to learn more.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Home = () => {

  const {
    state: { role, loading, accounts },
    dispatch,
  } = useEth()

  const navigate = useNavigate()


  const ActionSection = () => {
    if (!accounts) {
      return (
        <Typography variant='h5' color='white'>
          Open your MetaMask wallet to get connected, then refresh this page
        </Typography>
      )
    } else {
      if (role === 'admin') {
        return (
          <CustomButton text='Admin Portal' handleClick={() => navigate('/admin')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      } else if (role === 'patient') {
        return (
          <CustomButton text='Patient Portal' handleClick={() => navigate('/patient')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      } else if (role === 'doctor') {
        return (
          <CustomButton text='Doctor Portal' handleClick={() => navigate('/doctor')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      }else if (role === 'emergencyPerson') {
        return (
          <CustomButton text='Emergency Portal' handleClick={() => navigate('/emergencyPerson/seeRequests')}>
            <LoginRoundedIcon style={{ color: 'white' }} />
          </CustomButton>
        )
      }else{
        return (
          <>
          {(
            ResponsiveDialog()

          )}
            </>
        )
      }

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
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        width='100vw'
        height='100vh'
        id='background'
      >
        <Box
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <VideoCover
            videoOptions={{
              src: BackgroundVideo,
              autoPlay: true,
              loop: true,
              muted: true,
            }}
          />
        </Box>
        <Box id='home-page-box' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={3}>
          <img src={logo} alt='med-chain-logo' style={{ height: 250 }} />
          <Box mt={2} mb={5}>
            <Typography variant='h4' color='white'>
              Own Your Health
            </Typography>
          </Box>
          <ActionSection />
          <Box display='flex' alignItems='center' mt={2}>
            <Typography variant='h5' color='white'>
              powered by{' '}
            </Typography>
            <Box mx={1}>
              <img
                src='https://cdn.worldvectorlogo.com/logos/ethereum-1.svg'
                alt='Ethereum logo vector'
                style={{ height: 20 }}
              ></img>
            </Box>
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png'
              alt='Ethereum logo vector'
              style={{ height: 20 }}
            ></img>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default Home
