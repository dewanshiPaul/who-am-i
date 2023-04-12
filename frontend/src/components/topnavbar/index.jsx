import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import detailsSlice, { setSearch, setSearchUserDetails, userStore } from '../../redux/detailsSlice';
import { SimpleInput } from '../test/index';
import _ from "lodash";
import { Card, Typography } from '@mui/material';
import { Loading } from '../loader';
import './index.scss';
import { store } from '../../redux/authSlice';
import { useDispatch, useSelector } from "react-redux";


export function Topnavbar({children, user}) {

    const { userId } = useSelector(state => state.authSlice);
    const { username } = useSelector(state => state.detailsSlice);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const name = user === '' || user? user === null ? '':username:user;
    const dispatch = useDispatch();
    const { search } = useSelector(state => state.detailsSlice);

    const getSuggestion = useCallback(
        _.debounce(async (q) => {
            if(q.length > 2) {
                setLoading(true);
                await axios.post("http://localhost:5000/user/search", {
                    query: q
                })
                .then((res) => {
                    setResult(res.data.data);
                    // console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
                setLoading(false);
            } else {
                setResult([]);
            }
        }, 300),
        []
    )

    const handleClick = (d) => {
        dispatch(detailsSlice.actions.setSearchUserDetails({
            search_username: d.username,
            search_leetcode: d.leetcode,
            search_codeforces: d.codeforces,
            search_github: d.github,
            search_unstop: d.unstop,
        }));
    }

    useEffect(() => {
        if(!search)
            setQuery("");
    }, [search])

    return (
        <>
            <div className="top-navbar-container">
                <div className='logo'>
                    logo
                </div>
                {
                    name === '' || name === null || name === undefined ?
                    ''
                    :
                    <div 
                        className='search-box'
                        onClick={() => {
                            console.log('click');    
                            dispatch(detailsSlice.actions.setSearch({
                                search: true
                            }))
                            // handleSearch(true);
                        }}
                    >
                        <SimpleInput 
                            type={"text"}
                            value={query}
                            placeholder={"Search"}
                            id={"user-search"}
                            handleChange={(e) => {
                                setQuery(e.target.value);
                                setShow(true);
                                console.log(query);
                                if(query.length > 1) {
                                    setLoading(true);
                                    getSuggestion(e.target.value);
                                }
                                else {
                                    setResult([]);
                                }
                            }}
                        />
                        {
                            query && show && (
                                <Card
                                    className='suggestion-container'
                                    onClick={() => setShow(false)}
                                    tabIndex={0}
                                >
                                    {
                                        query && result.length !== 0 ? 
                                        (
                                            result.map((d,k) => {
                                                if(d._id !== userId)
                                                return (
                                                    <div
                                                        className='suggest'
                                                        onClick={() => {
                                                            handleClick(d);
                                                            // console.log('inside suggest');
                                                        }}
                                                        key={k}
                                                    >
                                                        <Typography variant='body1'>{d.username}</Typography>
                                                        <div className='info'>
                                                            <Typography variant='body1' style={{ fontSize: '12px'}}>{d.leetcode}</Typography>
                                                            <Typography variant='body1' style={{ fontSize: '12px'}}>{d.codeforces}</Typography>
                                                            <Typography variant='body1' style={{ fontSize: '12px'}}>{d.github}</Typography>
                                                            <Typography variant='body1' style={{ fontSize: '12px'}}>{d.unstop}</Typography>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                        : 
                                        query && (
                                            loading ? 
                                            <div className='loading'>
                                                <Loading h={'30'} w={'50'}/>
                                            </div>
                                            : 
                                            <div className='no-result'>
                                                <Typography variant='body1'>No Results</Typography>
                                            </div>
                                        )
                                        
                                    }
                                </Card>
                            )
                        }
                    </div>
                }
                <div className='user-profile'>
                    User Profile: {name}
                </div>
            </div>
            {children}
        </>
    )
}