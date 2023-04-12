import axios from "axios";
import { useState } from "react";
import SIGNUP_IMG from '../../images/sign-up.jpg'
import { Input, RippleButton } from "../test";
import { useNavigate } from "react-router-dom";
import { Dna } from 'react-loader-spinner';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './index.scss';

export function SignUp() {
    const [username, setUserName] = useState("");
    const [s_email, set_SEmail] = useState("");
    const [password, setPassword] = useState("");
    const [lurl, setLURL] = useState("");
    const [cfurl, setCFRL] = useState("");
    const [gurl, setGURL] = useState("");
    const [uurl, setUURL] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUsername = (e) => {
        setUserName(e.target.value)
    }

    const handleEmail = (e) => {
        set_SEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLeetcodeURL = (e) => {
        setLURL(e.target.value);
    }

    const handleCodeforcesURL = (e) => {
        setCFRL(e.target.value);
    }

    const handleGithubURL = (e) => {
        setGURL(e.target.value);
    }

    const handleUnstopURL = (e) => {
        setUURL(e.target.value);
    }

    const handleSubmit = async () => {
        setLoading(true);
        await axios.post('http://localhost:5000/user/signup', {
            username: username,
            email: s_email,
            password: password,
            leetcode: lurl,
            codeforces: cfurl,
            github: gurl,
            unstop: uurl
        })
        .then((res) => {
            console.log(res.data.msg);
            setLoading(false);
            NotificationManager.success('Successfully created account', 'Success', 3000);
            navigate('/login');
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            if(err.response.status === 400) {
                NotificationManager.error('Password should have minimum 6 letter', 'Oops Error!', 3000);
            } else {
                NotificationManager.error('Something went worng', 'Oops Error!', 3000);
            }
        })
    }

    const handleLoginClick = () => {
        console.log('login');
        navigate('/login');
    }

    return (
        <div className="signup-container">
            <div className="signup-container-form">
                <Input 
                    type={"text"}
                    value={username}
                    placeholder={"Enter your username"}
                    handleChange={handleUsername}
                    id={'username'}
                    text={'Username'}
                    validate={true}
                />
                <Input 
                    type={"email"}
                    value={s_email}
                    placeholder={"Enter your email"}
                    handleChange={handleEmail}
                    id={'s_email'}
                    text={'Email'}
                    validate={true}
                />
                <Input 
                    type={"password"}
                    value={password}
                    placeholder={"Enter Password"}
                    handleChange={handlePassword}
                    id={'s_password'}
                    text={'Password'}
                    validate={true}
                />
                <Input 
                    type={"text"}
                    value={lurl}
                    placeholder={"Enter Leetcode username"}
                    handleChange={handleLeetcodeURL}
                    id={'leetcode_url'}
                    text={'Leetcode-Url'}
                    validate={true}
                />
                <Input 
                    type={"text"}
                    value={cfurl}
                    placeholder={"Enter Codeforces username"}
                    handleChange={handleCodeforcesURL}
                    id={'codeforces_url'}
                    text={'Codeforces-Url'}
                    validate={true}
                />
                <Input 
                    type={"text"}
                    value={gurl}
                    placeholder={"Enter Github username"}
                    handleChange={handleGithubURL}
                    id={'github_url'}
                    text={'Github-Url'}
                    validate={true}
                />
                <Input 
                    type={"text"}
                    value={uurl}
                    placeholder={"Enter Unstop username"}
                    handleChange={handleUnstopURL}
                    id={'unstop_url'}
                    text={'Unstop-Url'}
                    validate={true}
                />
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
                            Register
                        </div>
                    }
                    onClick={handleSubmit}
                />
                <div className="login">
                    <span>
                        Do you already have an account?
                    </span>
                    <span
                        onClick={handleLoginClick}
                    >
                        Login
                    </span>
                </div>
            </div>
            <div className="signup-image-container">
                <img src={SIGNUP_IMG} alt="signup" className="signup-image"/>
            </div>
            <NotificationContainer />
        </div>
    )
}