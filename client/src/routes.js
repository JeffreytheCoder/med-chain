// Guards
import Layout from './components/layouts/Layout'
import AlertPopup from './components/layouts/AlertPopup'

// Pages
import Home from './pages'
import Patient from './pages/patient'
import Doctor from './pages/doctor'
import HeaderAppBar from './components/layouts/Layout'
import Unknown from './pages/unknown'
import Admin from './pages/admin'
import RegisterPatient from './pages/doctor/RegisterPatient'
import RegisterHospital from './pages/admin/RegisterHospital'
import SearchHospital from './pages/admin/SearchHospital'
import SearchDoctor from './pages/admin/SearchDoctor'
import ViewRequests from './pages/patient/ViewRequests'
import GiveEmergencyAccess from './pages/patient/GiveEmergencyAccess'
import ViewEmergencyAccess from './pages/patient/ViewEmergencyAccess'
import SeeRequests from './pages/emergencyPerson/SeeRequests'

const routes = [
  {
    path: '/',
    children: [
      {
        path: '',
        element: (
          <>
            <AlertPopup />
            <Home />
          </>
        ),
      },
      {
        path: 'admin',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Admin />
          </>
        ),
      },
       {
        path: 'admin/registerDoctor',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Admin />
          </>
        ),
      },
       {
        path: 'admin/searchDoctor',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <SearchDoctor />
          </>
        ),
      },
       {
        path: 'admin/registerHospital',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <RegisterHospital />
          </>
        ),
      },
       {
        path: 'admin/searchHospital',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <SearchHospital />
          </>
        ),
      },
      {
        path: 'patient',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Patient />
          </>
        ),
      },
      {
        path: 'patient/viewAccessRequests',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <ViewRequests />
          </>
        ),
      },
      {
        path: 'patient/giveEmergencyAccess',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <GiveEmergencyAccess />
          </>
        ),
      },
       {
        path: 'patient/viewEmergencyAccess',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <ViewEmergencyAccess />
          </>
        ),
      },
      {
        path: 'doctor',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Doctor />
          </>
        ),
      },
      {
        path: 'doctor/registerPatient',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <RegisterPatient />
          </>
        ),
      },
      {
       path: 'emergencyPerson/seeRequests',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <SeeRequests />
          </>
        ),
      },
      {
        path: 'unknown',
        element: (
          <>
            <HeaderAppBar />
            <AlertPopup />
            <Unknown />
          </>
        ),
      },
    ],
  },
]

export default routes
