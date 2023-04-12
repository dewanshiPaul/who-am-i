import axios from "axios";
import { useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import { setDetails, userStore } from "../../../redux/detailsSlice";
import { Loading } from "../../loader";
import { Input, RippleButton } from "../../test";
import 'react-notifications/lib/notifications.css';
import "./index.scss";
import { useSelector } from "react-redux";

export function UserDisplay() {
    // const { username, email, password, leetcode, codeforces, github } = userStore.getState()
    const { username, email, leetcode, codeforces, github, unstop } = useSelector(state => state.detailsSlice);
    const [uname, setUserName] = useState(username);
    const [pwd, setPassword] = useState('');
    const [lc, setLeetcode] = useState(leetcode);
    const [cf, setCodeforces] = useState(codeforces);
    const [gh, setGithub] = useState(github);
    const [us, setUnstop] = useState(unstop);
    const [loading, setLoading] = useState(false);
 
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleUsername = (e) => {
        setUserName(e.target.value)
    }

    const handleLeetcode = (e) => {
        setLeetcode(e.target.value)
    }

    const handleCodeforces = (e) => {
        setCodeforces(e.target.value)
    }

    const handleGithub = (e) => {
        setGithub(e.target.value)
    }

    const handleUnstop = (e) => {
        setUnstop(e.target.value)
    }

    const handleUpdate = async () => {
        setLoading(true);
        await axios.post(`http://localhost:5000/user/update/${email}`, {
            leetcode: lc,
            codeforces: cf,
            github: gh,
            password: pwd,
            username: uname
        })
        .then(() => {
            NotificationManager.success('Successfully updated', 'Done', 3000);
            const email = userStore.getState().email;
            console.log(uname, email, lc, cf, gh, us);
            userStore.dispatch(setDetails({
                username: uname, 
                email: email, 
                leetcode: lc, 
                codeforces: cf, 
                github: gh,
                unstop: us
            }))
            setLoading(false)
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            NotificationManager.error('Something went wrong', 'Ooops Error!', 3000);
        })
    }

    return (
        <div className="user-details">
            <div className="user-details-container">
                <Input 
                    handleChange={() => {}}
                    value={email}
                    type={"email"}
                    placeholder={"Email"}
                    text={"Email"}
                    id={'d_email'}
                    validate={true}
                />
                <Input 
                    handleChange={handleUsername}
                    value={uname}
                    type={"text"}
                    placeholder={"Username"}
                    text={"Username"}
                    id={'d_username'}
                    validate={true}
                />
                <Input 
                    handleChange={handlePassword}
                    value={pwd}
                    type={"text"}
                    placeholder={"Password"}
                    text={"Password"}
                    id={'d_password'}
                    validate={true}
                />
                <Input 
                    handleChange={handleLeetcode}
                    value={lc}
                    type={"text"}
                    placeholder={"Leetcode"}
                    text={"Leetcode"}
                    id={'d_leetcode'}
                    validate={true}
                />
                <Input 
                    handleChange={handleCodeforces}
                    value={cf}
                    type={"text"}
                    placeholder={"Codeforces"}
                    text={"Codeforces"}
                    id={'d_cf'}
                    validate={true}
                />
                <Input 
                    handleChange={handleGithub}
                    value={gh}
                    type={"text"}
                    placeholder={"Github"}
                    text={"Github"}
                    id={'d_gh'}
                    validate={true}
                />
                <Input 
                    handleChange={handleUnstop}
                    value={us}
                    type={"text"}
                    placeholder={"Unstop"}
                    text={"Unstop"}
                    id={'d_us'}
                    validate={true}
                />
                <div className="footer">
                    <RippleButton
                        children={
                            loading ?
                            <Loading h={"30"} w={"50"}/>
                            :
                            <div style={{fontSize: '1rem'}}>
                                Update
                            </div>
                        }
                        onClick={handleUpdate}
                    />
                </div>
            </div>
            <NotificationContainer />
        </div>
    )
}