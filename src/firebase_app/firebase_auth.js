import firebase from "./firebase";
import "firebase/compat/auth";
import axios from "axios";

import generateToken from "./token_generator";


export const firebaseGoogleLogin = (dispatch) => {
    
    dispatch({
        type: "LOGIN_START",
        payload: {
            gglLoader: true,
            fbLoader: false
        }
    });

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile email");

    firebase.auth().signInWithPopup(provider)
    .then(async result => {

        const profile = result.additionalUserInfo.profile;
        const isNewUser = result.additionalUserInfo.isNewUser;
        
        let idToken = await generateToken();

        if(isNewUser) {

            //==========register user==========================
            const data = {
                name: profile.name,
                email: profile.email,
                photourl: profile.picture
            };

            axios.post("/auth/register", data, {
                headers: {
                    "Authorization": idToken
                }
            }).then(res => {
                console.log("data is: ", res.data);
                if(res.status === 200) {
                    alert(`Welcome ${profile.name}. \nWe are very glad to have you on this platform.`);
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: {
                            user: res.data
                        }
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: {
                        error: err
                    }
                });
                alert("Something went wrong!");
            });

        } else {

            //======login user==========================
            axios.post("/auth/login", {}, {
                headers: {
                    "Authorization": idToken
                }
            }).then(res => {
                if(res.status === 200) {
                    alert(`Welcome back ${profile.name}.\nHope you are enjoying here.`);
                    dispatch({
                        type: "LOGIN_SUCCESS",
                        payload: {
                            user: res.data
                        }
                    });
                }
            })
            .catch(err => {
                dispatch({
                    type: "LOGIN_FAILURE",
                    payload: {
                        error: err
                    }
                });
                alert("Something went wrong");
            });

        }
    })
    .catch( err => {
        dispatch({
            type: "LOGIN_FAILURE",
            payload: {
                error: err
            }
        });
    });
}

export const firebaseFbLogin = (dispatch) => {
    dispatch({
        type: "LOGIN_START"
    });
    const provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    .then(result => {
        console.log(result);
    })
    .catch( err => {
        dispatch({
            type: "LOGIN_FAILURE",
            payload: err
        });
    });
}