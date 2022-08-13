import { initializeApp } from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './config'

export default initializeApp(firebaseConfig)
