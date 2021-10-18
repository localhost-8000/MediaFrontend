import "./login.css";
import { Button, CircularProgress } from '@material-ui/core';

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext"
import { firebaseFbLogin, firebaseGoogleLogin } from "../../firebase_app/firebase_auth";


export default function Login() {

    const { user, isFbLoading, isGglLoading, dispatch } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        
        firebaseGoogleLogin(dispatch);
        
    }
    const handleFbLogin = () => {
       
        firebaseFbLogin(dispatch);
       
    }
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">CollegeMedia</h3>
                    <span className="loginDesc">Connect with friends around you.</span>
                </div>
                <div className="loginRight">
                    <div className="loginRightBottom">
                        <Button id="gglBtn" variant="contained" onClick={handleGoogleLogin}>
                            {isGglLoading ? <CircularProgress size="25px" style={{color: "white"}}/> : "Sign in with Google"}
                        </Button>
                        <Button id="fbBtn" variant="contained" onClick={handleFbLogin}>
                            {isFbLoading ? <CircularProgress size="25px" style={{color: "white"}}/> : "Sign in with Facebook"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
