import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDsRs22v0KFNugdUaxqQ_I1b6zsmVjC7jg",
    authDomain: "event-list-b98a7.firebaseapp.com",
    projectId: "event-list-b98a7",
    storageBucket: "event-list-b98a7.appspot.com",
    messagingSenderId: "1051175427025",
    appId: "1:1051175427025:web:bb27c74fa060fafab79ef8",
    measurementId: "G-9RMMXXJZPR"

}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { auth, db}