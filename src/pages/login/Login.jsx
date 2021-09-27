import { useRef, useContext } from "react";
import "./login.css"
import { loginCall } from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from '@material-ui/core'

export default function Login() {

    const email = useRef();
    const password = useRef();
    const { user, isFetching, dispatch } = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch)
    }
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">AnkurMedia</h3>
                    <span className="loginDesc">Connect with friends around you.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            required
                            className="loginInput" 
                            ref={email} 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            minLength="6"
                            className="loginInput" 
                            ref={password}
                        />
                        <button className="loginButton" type="submit" disabled={isFetching}>
                                {isFetching ? <CircularProgress color="white" size="25px" /> : "Log In"}
                            </button>
                        <span className="loginForgot">Forgot Passsword</span>
                        <button className="loginRegisterButton">
                            {isFetching ? <CircularProgress color="white" size="25px" /> : "Register here"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
