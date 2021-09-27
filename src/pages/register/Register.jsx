import { useContext, useRef } from "react"
import { useHistory } from "react-router"
import "./register.css"
import { registerCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory()

    const { user, isFetching, dispatch } = useContext(AuthContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('p ', password.current.value);
        console.log('pa ', passwordAgain.current.value);
        if(passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password didn't matched!")
        } else {
            const userCredentials = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("auth/register", userCredentials);
                history.push("/login")
            } catch (err) {
                console.log(err);
            }
        }
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
                            required
                            placeholder="Username"
                            minLength="5" 
                            className="loginInput"
                            ref={username}
                        />
                        <input 
                            type="email"
                            placeholder="Email" 
                            className="loginInput"
                            required
                            ref={email}
                        />
                        <input 
                            type="password"
                            placeholder="Password" 
                            className="loginInput"
                            required
                            minLength="6"
                            ref={password}
                        />
                        <input 
                            type="password"
                            placeholder="Password Again" 
                            className="loginInput"
                            required
                            minLength="6"
                            ref={passwordAgain}
                        />
                        <button type="submit" className="loginButton">Sign Up</button>
                        <Link to="/login">
                            <button className="loginRegisterButton">Have an account</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
