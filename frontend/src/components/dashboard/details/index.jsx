import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { logOut } from '../../../redux/authSlice';
import authAxios from "../../../middleware/authaxios";
import './index.scss'
import detailsSlice from '../../../redux/detailsSlice'
import { Sidebar } from '../sidebar';
import { Home } from '../home';
import { Resume } from '../resume';
import { UserDisplay } from '../userdisplay';
import { useDispatch, useSelector } from 'react-redux';

function Display({active}) {
    if(active === 'home')
        return <Home />
    if(active === 'resume')
        return <Resume />
    if(active === 'chat')
        return <Home />
    if(active === 'userprofile')
        return <UserDisplay />
}

export function Dashboard({handleName}) {
    const { userId } = useParams();
    const { accessToken } = useSelector(state => state.authSlice);
    const { search }  = useSelector(state => state.detailsSlice);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState('home');

    const fetchData = () => {
        if(data !== 'Auth Error') {
            authAxios(
                accessToken, 
                `http://localhost:5000/dashboard/${userId}`, 
                (data) => setData(data),
            );
        } else {
            console.log('data inside else:',data);
        }
    }

    useEffect(() => {
        if(search) {
            setActive("home");
        }
        console.log('change');
    }, [active, search])

    useEffect(() => {
        setLoading(true);
        fetchData();
        if(data !== null && data !== 'Auth Error') {
            const { username, email, leetcode, codeforces, github, unstop } = data; 
            console.log('inside details',username);
            handleName(username)
            dispatch(detailsSlice.actions.setDetails({
                username, email, leetcode, codeforces, github, unstop
            }));
        }
        setLoading(false);
    }, [active, loading])

    // useEffect(() => {
    //     if(active === 'logout' || accessToken === null) {
    //         dispatch(detailsSlice.actions.setSearch({
    //             search: false,
    //         }));
    //         dispatch(detailsSlice.actions.setDetails({
    //             username: null,
    //             email: null,
    //             leetcode: null,
    //             codeforces: null,
    //             github: null,
    //             unstop: null,
    //         }));
    //         dispatch(detailsSlice.actions.setSearchUserDetails({
    //             search_username: null,
    //             search_leetcode: null,
    //             search_codeforces: null,
    //             search_github: null,
    //             search_unstop: null,
    //         }));
    //         logOut();
    //         navigate('/login');
    //     }
    // }, [active,accessToken])
    
    return(
        <div className='dashboard-container'>
            <div className='sidebar'>
                <Sidebar setActive={setActive}/>
            </div>
            <div className='content-display'>
                {
                    loading ?
                    <div style={{display: 'flex',alignItems: 'center', justifyContent:'center'}}>Hang on</div>
                    :
                    <Display active={active}/>
                }
            </div>
        </div>
    )
}