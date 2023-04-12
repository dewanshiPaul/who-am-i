import { useEffect, useState } from "react";
import { Input, RippleButton } from "../test";
import { Loading } from "../loader/index";
import './index.scss';
import axios from "axios";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import authSlice from "../../redux/authSlice";
import authAxios from "../../middleware/authaxios";
import detailsSlice, { setDetails, userStore } from "../../redux/detailsSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export function ForgotPassword () {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [verifyLoading, setVerifyLoading] = useState(false);
    const [flg, setFlag] = useState(false);
    const [timeLeft, settimeLeft] = useState();
    const {userId} = useSelector(state => state.authSlice);
    const [otp, setOtp] = useState({
        'dig1': '',
        'dig2': '',
        'dig3': '',
        'dig4': '',
        'dig5': '',
        'dig6': ''
    });
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    //event handler
    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleChange = (val, e) => {
        setOtp({ ...otp, [val]: e.target.value});
        console.log(otp);
    }

    const clearOtp = () => {
        setOtp({dig1: '',dig2: '',dig3: '',dig4: '',dig5: '',dig6: ''});
    }

    const handleGenOtpClick = async () => {
        setLoading(true);
        await axios.post('http://localhost:5000/user/getotp', {
            email: email
        })
        .then(() => {
            setLoading(false);
            setFlag(true);
            settimeLeft(180);
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            if(err.response.status === 400) {
                NotificationManager.error("Please enter a valid email", "Wrong email", 3000);
            } else if (err.response.data.msg === 'User doesnot exist') {
                NotificationManager.error('Requested email is not registered', 'Sign up first', 3000);
            } else {
                NotificationManager.error("Something went wrong", "Ooops Error!", 3000);
            }
        })
    }

    const handleVerify = async () => {
        if(otp.dig1 === '' || otp.dig2 === '' || otp.dig3 === '' || otp.dig4 === '' || otp.dig5 === '' || otp === '') {
            document.getElementById('submit-button').disabled = true;
            NotificationManager.warning('Enter otp sent to your mail', 'Otp missing!!', 3000);
        } else {
            setVerifyLoading(true);
            const otpnumber = otp.dig1+otp.dig2+otp.dig3+otp.dig4+otp.dig5+otp.dig6;
            await axios.post('http://localhost:5000/user/verifyotp', {
                email: email,
                otp: otpnumber
            })
            .then((res) => {
                const userId = res.data.userid;
                const accessToken = res.data.token;

                // console.log(userId);

                dispatch(authSlice.actions.setCredentials({
                    userId,
                    accessToken
                }))
                
                NotificationManager.success('Successfully logged in', 'Welcome', 3000);
                setVerifyLoading(false);
                authAxios(
                    accessToken,
                    `http://localhost:5000/dashboard/${userId}`,
                    (data) => setData(data)
                );
            })
            .catch((err) => {
                setVerifyLoading(false);
                clearOtp();
                if(err.response.data.msg === 'Code has expired') {
                    NotificationManager.error('Code got expired. Generate a new one', 'OTP Expired', 3000);
                } else if(err.response.status === 404) {
                    NotificationManager.error('Either otp is passed or otp is not generated', 'Failed', 3000);
                }else if(err.response.status === 403) {
                    NotificationManager.error('Wrong otp', 'Failed Validation', 3000);
                } else {
                    NotificationManager.error('Something went wrong', 'Ooops Error!', 3000);
                }
            })
        }
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    useEffect(() => {
        const timer = timeLeft>0 && setInterval(() => {
            settimeLeft((timeLeft) => timeLeft-1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft])

    useEffect(() => {
        if(data != null) {
            const username = data.username;
            const email = data.email;
            const leetcode = data.leetcode;
            const codeforces = data.codeforces;
            const github = data.github;
            const unstop = data.unstop;
            console.log(data);
            dispatch(detailsSlice.actions.setDetails({
                username,
                email,
                leetcode,
                codeforces,
                github,
                unstop
            }))
            navigate(`/dashboard/${userId}`);
        }
    }, [data, navigate])

    return (
        <div className="forgot-password-container">
            <div>
                <Input 
                    handleChange={handleEmail}
                    value={email}
                    type={"email"}
                    placeholder={"Enter your register email"}
                    text={"Enter your register email"}
                    id={"fp_email"}
                />
                <div className="button">
                    <RippleButton 
                        children={
                            loading ?
                            <Loading 
                                h={"30"}
                                w={"50"}
                            />
                            :
                            <div style={{fontSize: '1rem'}}>
                                Generate OTP
                            </div>
                        }
                        onClick={handleGenOtpClick}
                    />
                </div>
                {
                    flg ?
                    <div>
                        <div className="timer">
                            <span>The otp is sent to your registered email. Fill up the otp in the below space.</span>
                            <br />
                            <span>Time Left: <b>{timeLeft == null ? '-':timeLeft}</b> secs</span>
                        </div>
                        <div className="otp">
                            <input 
                                name={'otp1'}
                                type={'text'}
                                autoComplete="off"
                                value={otp.dig1}
                                onChange={(e) => handleChange('dig1',e)}
                                tabIndex='1'
                                maxLength='1'
                            />
                            <input 
                                name={'otp2'}
                                type={'text'}
                                autoComplete="off"
                                value={otp.dig2}
                                onChange={(e) => handleChange('dig2',e)}
                                tabIndex='1'
                                maxLength='1'
                            />
                            <input 
                                name={'otp3'}
                                type={'text'}
                                autoComplete="off"
                                value={otp.dig3}
                                onChange={(e) => handleChange('dig3',e)}
                                tabIndex='1'
                                maxLength='1'
                            />
                            <input 
                                name={'otp4'}
                                type={'text'}
                                autoComplete="off"
                                value={otp.dig4}
                                onChange={(e) => handleChange('dig4',e)}
                                tabIndex='1'
                                maxLength='1'
                            />
                            <input 
                                name={'otp5'}
                                type={'text'}
                                autoComplete="off"
                                value={otp.dig5}
                                onChange={(e) => handleChange('dig5',e)}
                                tabIndex='1'
                                maxLength='1'
                            />
                            <input 
                                name={'otp6'}
                                type={'text'}
                                autoComplete="off"
                                value={otp.dig6}
                                onChange={(e) => handleChange('dig6',e)}
                                tabIndex='1'
                                maxLength='1'
                            />
                        </div>
                        <div id="submit-button">
                            <RippleButton 
                                children={
                                    verifyLoading ?
                                    <Loading h={"30"} w={"50"}/>
                                    :
                                    <div style={{fontSize: '1rem'}}>
                                        Submit
                                    </div>
                                }
                                onClick={handleVerify}
                            />    
                        </div>
                    </div>
                    :
                    ''
                }
                <div className="login">
                    <span onClick={handleLoginClick}>
                        Login?
                    </span>
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}