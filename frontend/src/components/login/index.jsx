import axios from "axios";
import { useEffect, useState } from "react";
import LOGIN_IMG from "../../images/login.avif";
import { Input, RippleButton } from "../test";
import { useNavigate } from "react-router-dom";
import { Dna } from 'react-loader-spinner';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './index.scss';
import authSlice from "../../redux/authSlice";

import detailsSlice from "../../redux/detailsSlice";
import authAxios from "../../middleware/authaxios";
import { useDispatch, useSelector } from "react-redux";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.authSlice);
   
    const handleEmail = (e) => {
        setEmail(e.target.value)
        // console.log(email)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
        // console.log(password);
    }

    const handleSubmit = async () => {
        setLoading(true);
        await axios.post('http://localhost:5000/user/login', {
            email: email,
            password: password
        })
        .then((res) => {
            const userId = res.data.userid;
            const accessToken = res.data.token;
            dispatch(authSlice.actions.setCredentials({userId, accessToken}));
            setLoading(false);
            NotificationManager.success('Successfully logged in', 'Welcome', 3000);
            authAxios(accessToken, `http://localhost:5000/dashboard/${userId}`, (data) => setData(data));
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            if(err.response.data.msg === 'Incorrect Password') {
                NotificationManager.error('Check your password', 'Incorrect Password!', 3000);    
            } else if (err.response.data.msg === 'User does not exist') {
                NotificationManager.error('Register yourself first', 'Not Registerd!', 3000);
            } else {
                NotificationManager.error('Something went wrong', 'Ooops Error!', 3000);
            }
        })
    } 

    const handleForgotPasswordClick = () => {
        console.log('forgot password');
        navigate('/forgotpassword')
    }

    const handleRegisterClick = () => {
        console.log('register');
        navigate('/signup');
    }

    useEffect(() => {
        if(data !== null) {
            const username = data.username;
            const email = data.email;
            const leetcode = data.leetcode;
            const codeforces = data.codeforces;
            const github = data.github;
            const unstop = data.unstop;
            dispatch(detailsSlice.actions.setDetails({username, email, leetcode, codeforces, github, unstop}))
            navigate(`/dashboard/${userId}`);
            console.log('inside login use effect');
        }
    }, [data, navigate])

    return (
        <div className="login-container">
            <div className="login-image-container">
                <img src={LOGIN_IMG} alt="login" className="login-img"/>
            </div>
            <div className="login-container_form">
                <Input 
                    handleChange={handleEmail}
                    value={email}
                    type={"email"}
                    placeholder={"Enter your email"}
                    text={"Email"}
                    id={'l_email'}
                    validate={true}
                />
                <Input 
                    handleChange={handlePassword}
                    value={password}
                    type={"password"}
                    placeholder={"Enter Password"}
                    autocomplete="false"
                    text={"Password"}
                    id={"l_password"}
                    validate={true}
                />
                <div className="forgot-password">
                    <span
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot Password?
                    </span>
                </div>
                <RippleButton 
                    children={
                        loading ?
                        <Dna
                            visible={true}
                            height="30"
                            width="50"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                        :
                        <div style={{fontSize: '1rem'}}>
                            Login
                        </div>
                    }
                    onClick={handleSubmit}
                />
                <div className="register">
                    <span>
                        Do you have an account?
                    </span>
                    <span
                        onClick={handleRegisterClick}
                    >
                        Register
                    </span>
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}