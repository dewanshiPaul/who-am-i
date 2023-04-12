import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import './index.scss';
import detailsSlice from '../../../redux/detailsSlice';
import { useDispatch, useSelector } from 'react-redux';

export function Sidebar({setActive}) {
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.detailsSlice)

    return (
        <div className="sidebar-container">
            <div className='top'>
                <div className="icon" id="home">
                    <HomeRoundedIcon 
                        className='home-icon' 
                        onClick={() => {
                            dispatch(detailsSlice.actions.setSearch({
                                search: false,
                            }));
                            dispatch(detailsSlice.actions.setSearchUserDetails({
                                search_username: null,
                                email: email,
                                search_leetcode: null,
                                search_codeforces: null,
                                search_github: null,
                                search_unstop: null,
                            }))
                            setActive('home')
                        }}
                    />
                    <div className='ptr' />
                </div>
                <div className="icon" id="resume">
                    <WebRoundedIcon 
                        className='resume-icon'
                        onClick={() => {
                            dispatch(detailsSlice.actions.setSearch({
                                search: false,
                            }));
                            dispatch(detailsSlice.actions.setSearchUserDetails({
                                search_username: null,
                                email: email,
                                search_leetcode: null,
                                search_codeforces: null,
                                search_github: null,
                                search_unstop: null,
                            }))
                            setActive('resume')
                        }}
                    />
                    <div className='ptr' />
                </div>
                <div className="icon" id="chat">
                    <MessageRoundedIcon 
                        className='chat-icon'
                        onClick={() => {
                            dispatch(detailsSlice.actions.setSearch({
                                search: false,
                            }));
                            dispatch(detailsSlice.actions.setSearchUserDetails({
                                search_username: null,
                                email: email,
                                search_leetcode: null,
                                search_codeforces: null,
                                search_github: null,
                                search_unstop: null,
                            }))
                            setActive('chat')
                        }}
                    />
                    <div className='ptr' />
                </div>
                <div className="icon" id="user-profile">
                    <PersonPinRoundedIcon 
                        className='userprofile-icon'
                        onClick={() => {
                            dispatch(detailsSlice.actions.setSearch({
                                search: false,
                            }));
                            dispatch(detailsSlice.actions.setSearchUserDetails({
                                search_username: null,
                                email: email,
                                search_leetcode: null,
                                search_codeforces: null,
                                search_github: null,
                                search_unstop: null,
                            }))
                            setActive('userprofile')
                        }}
                    />
                    <div className='ptr' />
                </div>
            </div>
            <div className='bottom'>
                <div className='icon' id='log-out'>
                    <ExitToAppRoundedIcon 
                        className='logout-icon' 
                        onClick={() => {
                            setActive('logout')
                        }}
                    />
                    <div className='ptr' />
                </div>
            </div>
        </div>
    )
}