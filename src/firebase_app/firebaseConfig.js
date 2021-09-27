const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "social-dilemma-01.firebaseapp.com",
    projectId: "social-dilemma-01",
    storageBucket: "social-dilemma-01.appspot.com",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

export default firebaseConfig;