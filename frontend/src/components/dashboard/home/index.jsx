import { useEffect, useState } from "react";
import { Card } from "../../card";
import authAxios from "../../../middleware/authaxios";
import './index.scss';

import { Leetcode } from "./leetcode";
import { Codeforces } from "./codeforces";
import { Github } from "./github";
import { Unstop } from "./unstop";
import LEETCODE from '../../../images/leetcode.svg';
import CODEFORCES from '../../../images/codeforces.svg';
import GITHUB from '../../../images/github.svg';
import UNSTOP from '../../../images/unstop.svg';
import { Loading } from "../../loader";
// import authSlice from "../../../redux/authSlice";
// import detailsSlice from "../../../redux/detailsSlice";
import { userStore } from "../../../redux/detailsSlice";
import { useSelector } from "react-redux";


export function Home() {
    const [leetcodeData, setLeetcodeData] = useState(undefined);
    const [allProblemsCount, setAllProblemsCount] = useState(undefined);
    const [contestData, setContestData] = useState(undefined);
    const [codeforcesData, setCodeforcesData] = useState(undefined);
    const [activityData, setActivityData] = useState(undefined);
    const [cfContestData, setCFContestData] = useState(undefined);
    const [githubData, setGithubData] = useState(undefined);
    const [githubStatsData, setGithubStatsData] = useState(undefined);
    const [achievementData, setAchievementData] = useState(undefined);
    const [orgsData, setOrgsData] = useState(undefined);
    const [unstopData, setUnstopData] = useState(undefined);
    const [unstopBadges, setUnstopBadgesData] = useState(undefined);

    const {accessToken} = useSelector(state => state.authSlice);
    const { 
        leetcode, 
        codeforces, 
        github, 
        unstop, 
        search, 
        search_leetcode,
        search_codeforces,
        search_github,
        search_unstop
    } = useSelector(state => state.detailsSlice); 

    useEffect(() => {
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/leetcode/user/${search ? search_leetcode === null ? leetcode:search_leetcode: leetcode}`
            , (data) => setLeetcodeData(data));
        authAxios(
           accessToken
            , `http://localhost:5000/dashboard/leetcode/problemscount`
            , (data) => setAllProblemsCount(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/leetcode/contest/${search ? search_leetcode === null ? leetcode:search_leetcode: leetcode}`
            , (data) => setContestData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/codeforces/info/${search ? search_codeforces === null ? codeforces:search_codeforces: codeforces}`
            , (data) => setCodeforcesData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/codeforces/activity/${search ? search_codeforces === null ? codeforces:search_codeforces: codeforces}`
            , (data) => setActivityData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/codeforces/contest/${search ? search_codeforces === null ? codeforces:search_codeforces: codeforces}`
            , (data) => setCFContestData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/github/info/${search ? search_github === null ? github:search_github: github}`
            , (data) => setGithubData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/github/achievements/${search ? search_github === null ? github:search_github: github}`
            , (data) => setAchievementData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/github/orgs/${search ? search_github === null ? github:search_github:github}`
            , (data) => setOrgsData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/unstop/info/${search ? search_unstop === null ? unstop:search_unstop:unstop}`
            , (data) => setUnstopData(data));
        authAxios(
            accessToken
            , `http://localhost:5000/dashboard/unstop/badges/${search ? search_unstop === null ? unstop:search_unstop:unstop}`
            , (data) => setUnstopBadgesData(data));
    },[ search,
        search_leetcode,
        search_codeforces,
        search_github,
        search_unstop])

    useEffect(() => {
        if(githubData !== undefined)
            authAxios(
                accessToken
                , `http://localhost:5000/dashboard/github/details/${search ? search_github : github}/${githubData['data']['public_repos']}`
                , (data) => setGithubStatsData(data));
    }, [githubData, search])

    return (
        <div className='home-container'>
            <div className="home-container-content">
                <div className="home-container-cards">
                    <Card
                        userImage={leetcodeData === undefined ? '':leetcodeData['data']['matchedUser']['profile']['userAvatar']}
                        username={leetcodeData === undefined ? null:leetcodeData['data']['matchedUser']['username']}
                        platform={'Leetcode'}
                        img={LEETCODE}
                    >
                        {
                            leetcodeData === undefined ?
                                <Loading h={"100"} w={"100"}/>
                            :
                            <Leetcode 
                                leetcodeData={leetcodeData}
                                allProblemsCount={allProblemsCount}
                                contestData={contestData}
                            />
                        }
                    </Card>
                    <Card
                        userImage={codeforcesData === undefined ? '':codeforcesData['data']['result'][0]['avatar']}
                        username={codeforcesData === undefined ? '':codeforcesData['data']['result'][0]['handle']}
                        img={CODEFORCES}
                        platform={"Codeforces"}
                    >
                        {
                            codeforcesData === undefined || activityData === undefined || cfContestData === undefined ?
                                <Loading h={"100"} w={"100"}/>
                            :
                            <Codeforces 
                                codeforcesData={codeforcesData['data']['result'][0]}
                                activityData={activityData['data']}
                                contestData={cfContestData['data']['result']}
                            />
                        }
                    </Card>
                </div>
                <div className="home-container-cards">
                    <Card
                        username={githubData === undefined ? '':githubData['data']['login']}
                        userImage={githubData === undefined ? '':githubData['data']['avatar_url']}
                        img={GITHUB}
                        platform={"Github"}
                    >
                        {
                            githubData === undefined || githubStatsData === undefined || achievementData === undefined || orgsData === undefined?
                                <Loading h={"100"} w={"100"}/>
                            :
                            <Github 
                                userInfo={githubData['data']}
                                stats={githubStatsData['data']}
                                achievement={achievementData['data']}
                                orgs={orgsData['data']}
                            />
                        }
                    </Card>
                    <Card
                        username={unstopData === undefined ? '':unstopData['data']['username']}
                        userImage={unstopData === undefined ? '':unstopData['data']['avatar']}
                        img={UNSTOP}
                        platform={"Unstop"}
                    >
                        {
                            unstopData === undefined || unstopBadges === undefined ?
                                <Loading h={"100"} w={"100"} />
                            :
                                <Unstop 
                                    userInfo={unstopData['data']}
                                    badgesInfo={unstopBadges['data']}
                                />    
                        }
                    </Card>
                </div>
            </div>
        </div>
    )
}