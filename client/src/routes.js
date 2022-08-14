// Guards
import Layout from './components/layouts/Layout'
import AlertPopup from './components/layouts/AlertPopup'

// Pages
import Home from './pages'
import Patient from './pages/patient'
import Doctor from './pages/doctor'
import HeaderAppBar from './components/layouts/Layout'

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
    ],
  },
]

export default routes
