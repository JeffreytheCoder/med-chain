// Guards
import AuthGuard from './components/guards/AuthGuard'
import PatientGuard from './components/guards/PatientGuard'
import DoctorGuard from './components/guards/DoctorGuard'
import Layout from './components/layouts/Layout'
import AlertPopup from './components/layouts/AlertPopup'

// Pages
import Home from './pages'
import RegisterDoctor from './pages/RegisterDoctor'

// Patient
import PatientAppointments from './pages/patient/appointments'
import PatientRecords from './pages/patient/records'

// Doctor
import DoctorAppointments from './pages/doctor/appointments'
import SearchRecords from './pages/doctor/search-records'
import RegisterPatient from './pages/doctor/register-patient'
import { AppBar } from '@mui/material'

const routes = [
  {
    path: '/',
    // element: (
    //   // <AuthGuard>
    //   // <AlertPopup />
    //   // </AuthGuard>
    // ),
    children: [
      { path: '', element: <Home /> },
      { path: 'register-doctor', element: <RegisterDoctor /> },
      {
        path: 'patient',
        // element: (
        //   <PatientGuard>
        //     <Layout />
        //   </PatientGuard>
        // ),
        children: [
          { path: 'appointments', element: <PatientAppointments /> },
          { path: 'my-records', element: <PatientRecords /> },
        ],
      },
      {
        path: 'doctor',
        // element: (
        //   <DoctorGuard>
        //     <Layout />
        //   </DoctorGuard>
        // ),
        children: [
          { path: 'appointments', element: <DoctorAppointments /> },
          { path: 'patient-records', element: <SearchRecords /> },
          { path: 'register-patient', element: <RegisterPatient /> },
        ],
      },
      {
        path: 'layouts',
        children: [
          { path: 'AlertPopup', element: <AlertPopup />},
          { path: 'Layout', element: <Layout />}
        ]
      }
    ],
  },
]

export default routes
