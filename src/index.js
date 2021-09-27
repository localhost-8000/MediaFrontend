import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import firebase from "firebase/compat/app"
import firebaseConfig from "./firebase_app/firebaseConfig";


firebase.initializeApp(firebaseConfig);


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
        <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

