import ReactEcharts from "echarts-for-react";
import { Chip } from "@mui/material";
import './index.scss';
function ProblemPieChart({data}) {
    if(data === undefined)
        return <></>
    const td = [];
    data['advanced'].map((d,k) => {
        return td.push({
            value: d.problemsSolved,
            name: d.tagName,
        })
    });
    data['intermediate'].map((d,k) => {
        return td.push({
            value: d.problemsSolved,
            name: d.tagName,
        })
    });
    data['fundamental'].map((d,k) => {
        return td.push({
            value: d.problemsSolved,
            name: d.tagName,
        })
    });
    const options = {
        tooltip: {
            trigger: 'item'
        },
        // legend: {
        //     top: '5%',
        //     left: 'center'
        // },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 10,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    },
                },
                labelLine: {
                    show: true,
                },
                data: td,
            }
        ]
    };
    return <ReactEcharts option={options} />
}

function QuestionPieChart({data}) {
    if(data === undefined) {
        return <></>
    }
    const qd = [];
    data.slice(1).map((d,k) => {
            return qd.push({
                value: d.count,
                name: d.difficulty,
            })
    });
    // console.log('qd:',qd);
    const options = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderWidth: 2,
                    borderColor: '#fff',
                    borderRadius: 10,
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    },
                },
                labelLine: {
                    show: false,
                },
                data: qd,
            }
        ]
    };
    return <ReactEcharts option={options} />
}

export function Leetcode({leetcodeData, contestData, allProblemsCount}) {
    return (
        <div className="platform-details-container">
        <div>
            <span className="labels"> About me: </span>
            {leetcodeData['data']['matchedUser']['profile']['aboutMe'] === "" ? "-" : leetcodeData['data']['matchedUser']['profile']['aboutMe']}
        </div>
        <div>
            <span className="labels"> Real Name: </span>
            {leetcodeData['data']['matchedUser']['profile']['realName'] === "" ? "-": leetcodeData['data']['matchedUser']['profile']['realName']}
        </div>
        <div>
            <span className="labels"> Ranking: </span>
            {leetcodeData['data']['matchedUser']['profile']['ranking']}
        </div>
        <div className="community-stats">
            <div>
                <span className="labels"> Reputation: </span>
                {leetcodeData['data']['matchedUser']['profile']['reputation']}
            </div>
            <div>
                <span className="labels"> Views: </span>
                {leetcodeData['data']['matchedUser']['profile']['postViewCount']}
            </div>
            <div>
                <span className="labels"> Solution: </span>
                {leetcodeData['data']['matchedUser']['profile']['solutionCount']}
            </div>
        </div>
        <div className="community-stats-changes">
            <div>
                <span className="labels"> + Last week gain: </span>
                {leetcodeData['data']['matchedUser']['profile']['reputationDiff']}
            </div>
            <div>
                <span className="labels"> + Last week gain: </span>
                {leetcodeData['data']['matchedUser']['profile']['postViewCountDiff']}
            </div>
            <div>
                <span className="labels"> + Last week gain: </span>
                {leetcodeData['data']['matchedUser']['profile']['solutionCountDiff']}
            </div>
        </div>
        <div className="questions-languages-solved">
            <div>
                <span className="labels">Types of questions solved:</span>
                <div>
                    <QuestionPieChart data={leetcodeData['data']['matchedUser']['submitStats']['acSubmissionNum']} />
                </div>
            </div>
            <div>
                <span className="labels">Problem Tags Solved:</span>
                <div className="problem-container">
                    <ProblemPieChart data={leetcodeData['data']['matchedUser']['tagProblemCounts']} />
                </div>
            </div>
        </div>
        <div>
            <span className="labels">Languages Used:</span>
            <div className="language-container">
                {
                    leetcodeData['data']['matchedUser']['languageProblemCount'].map((d,k) => {
                        return <Chip className="chip" key={k} label={
                            <div style={{'display': 'flex','gap': '8px'}}>
                                <span>
                                    {d.languageName}:
                                </span>
                                <span>
                                    {d.problemsSolved}
                                </span>
                            </div>
                        }/>
                    })
                }
            </div>
        </div>
        <div className="total-question-top">
            <div>
                <span className="labels"> Total Questions Solved: </span>
                {leetcodeData['data']['matchedUser']['submitStats']['acSubmissionNum'] === "" ? 0:leetcodeData['data']['matchedUser']['submitStats']['acSubmissionNum'][0]['count']}/
                {allProblemsCount['data'] === undefined? "":allProblemsCount["data"]['allQuestionsCount'][0]['count']}
            </div>
            <div>
                <span className="labels"> Top Percentile: </span>
                {contestData['data'] === undefined ? '':contestData['data']['userContestRanking']['topPercentage']}
            </div>
        </div>
        <div className="contest-details">
            <div>
                <span className="labels"> Contest Rating: </span>
                {contestData['data'] === undefined ? '':Math.floor(contestData['data']['userContestRanking']['rating'])}
            </div>
            <div>
                <span className="labels"> Global Ranking: </span>
                {contestData['data'] === undefined ? '':contestData['data']['userContestRanking']['globalRanking']+'/'+contestData['data']['userContestRanking']['totalParticipants']}
            </div>
            <div>
                <span className="labels"> Contest Attended: </span>
                {contestData['data'] === undefined ? '':contestData['data']['userContestRanking']['attendedContestsCount']}
            </div>
        </div>
        <div>
            <span className="labels"> Badges: </span>
        </div>
        <div style={{'width': '45vw', 'justifyContent': 'center', 'display': 'flex', 'alignItems': 'center'}}>
            <div className="badges-display">
            {leetcodeData['data']['matchedUser']['badges']?.map((d,k) => {
                return <>
                    <div className="badge-container" key={k}>
                        {/* {console.log('log c:',d.icon)} */}
                        <img 
                            src={d?.icon.split('/')[0] === 'https:' ? d.icon: 'https://leetcode.com'+d.icon} 
                            alt={d.shortName} 
                            style={{ 'height': '50px', 'width': '50px' }}
                        />
                        <span>{d.displayName}</span>
                    </div>
                </>
            })}
            </div>
        </div>
    </div>
    )
}