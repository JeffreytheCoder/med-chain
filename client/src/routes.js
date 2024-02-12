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
