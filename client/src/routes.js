// Guards
import Layout from './components/layouts/Layout'
import AlertPopup from './components/layouts/AlertPopup'

// Pages
import Home from './pages'
import Patient from './pages/patient'
import Doctor from './pages/doctor'

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
          <Layout>
            <AlertPopup />
            <Patient />
          </Layout>
        ),
      },
      {
        path: 'doctor',
        element: (
          <Layout>
            <AlertPopup />
            <Doctor />
          </Layout>
        ),
      },
    ],
  },
]

export default routes
