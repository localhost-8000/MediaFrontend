import firebase from "./firebase";
import "firebase/compat/auth";

// generate JWT ID Token..
// const generateToken = () => {
//     new Promise((resolve, reject) => {
//         firebase.auth().onAuthStateChanged(async user => {
//             if(user) {
//                 user.getIdToken().then(token => {
//                     resolve("Bearer " + token);
//                 });
//             } else {
//                 reject("");
//             }
//         });
//     });
// }

const generateToken = async () => {
    return new Promise(async resolve => {
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                user.getIdToken().then(token => {
                    // console.log('token gen: ', token);
                    resolve("Bearer " + token);
                })
            }
        });
    });
}

export default generateToken;
