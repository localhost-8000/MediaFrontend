import { useContext, useRef, useState } from "react"
import { useHistory } from "react-router"
import "./register.css"
import { registerCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
// import { firebaseRegister } from "../../firebase_app/firebase_auth";

export default function Register() {

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    const [username, setUsername] = useState("username");
    const [email, setEmail] = useState("example@mail.com");
    const [password, setPassword] = useState("password");
    const [passwordAgain, setPasswordAgain] = useState("password");
    const history = useHistory();

    const { user, isFetching, dispatch } = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // firebaseRegister(email, password);
        // if(passwordAgain.current.value !== password.current.value) {
        //     passwordAgain.current.setCustomValidity("Password didn't matched!")
        // } else {
        //     const userCredentials = {
        //         username: username.current.value,
        //         email: email.current.value,
        //         password: password.current.value
        //     }
        //     try {
        //         await axios.post("auth/register", userCredentials);
        //         history.push("/login")
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }
    }
    // console.log(user);
     
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AnkurMedia</h3>
                    <span className="loginDesc">Connect with friends around you.</span>
                </div>
                <div className="loginRight" style={{maxHeight: "550px"}}>
                    <div className="loginRightTop">
                        <form className="loginBox" onSubmit={handleSubmit}>
                            <TextField 
                                error={username.length < 6}
                                helperText={username.length < 6 ? "Minimum length should be 6" : ""}
                                id="username"
                                label="Username"
                                variant="standard"
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <TextField 
                                id="email"
                                label="Email"
                                variant="standard"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField 
                                error={!passwordRegex.test(password)}
                                helperText={!passwordRegex.test(password) ? "Password must contains atleast one letter, one number and one special character. Minimun length should be 8." : ""}
                                id="password"
                                label="Password"
                                variant="standard"
                                type="password"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <TextField 
                                error={passwordAgain !== password}
                                helperText={(passwordAgain !== password) ? "Password didn't matched" : ""}
                                id="passwordAgain"
                                label="Password again"
                                variant="standard"
                                type="password"
                                onChange={e => setPasswordAgain(e.target.value)}
                                required
                            />
                            <Button id="loginBtn" variant="contained" type="submit" style={{margin: "15px 0 10px 0"}}>
                                Sign Up
                            </Button>
                        </form>
                        <a href="/login" className="toRegisterBtn">Have an account?</a>
                    </div>
                    <div className="loginHr"></div>
                    <div className="loginRightBottom">
                        <Button id="gglBtn" variant="contained">Sign Up with Google</Button>
                        <Button id="fbBtn" variant="contained">Sign Up with Facebook</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
