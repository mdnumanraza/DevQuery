// uncomment this code for running locally-------------

// import { fBaseObj } from './firebase'
// const {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID
// } = fBaseObj

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY  |  API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN |AUTH_DOMAIN ,
//     projectId: process.env.REACT_APP_PROJECT_ID | PROJECT_ID ,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET | STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID |MESSAGING_SENDER_ID ,
//     appId: process.env.REACT_APP_APP_ID | APP_ID,
//   };
//---------------------------------------------------------



// for deployment
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,  
    authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET, 
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID, 
    appId: process.env.REACT_APP_APP_ID, 
  }

  
export default firebaseConfig