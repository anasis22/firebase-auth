import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBYwLjj2hy-JGLu6EEpn6S38UE83vla5Vg",
    authDomain: "trial-c4054.firebaseapp.com",
    projectId: "trial-c4054",
    storageBucket: "trial-c4054.appspot.com",
    messagingSenderId: "658094014205",
    appId: "1:658094014205:web:377e1ad7d6dee7d5918894",
    measurementId: "G-R2GYPW8KKV"
  };

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
