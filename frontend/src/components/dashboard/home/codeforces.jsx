export function Codeforces({ codeforcesData, activityData, contestData }) {

    return (
        <div className="platform-details-container">
            <div>
                <span className="labels"> Real Name: </span>
                {codeforcesData['firstName']}&nbsp;{codeforcesData['lastName']}
            </div>
            <div className="other-details">
                <div>
                    <span className="labels"> Friends: </span>
                    {codeforcesData['friendOfCount']}
                </div>
                <div>
                    <span className="labels"> Contributions: </span>
                    {codeforcesData['contribution']}
                </div>
            </div>
            <div className="current-rank">
                <div>
                    <span className="labels"> Rating: </span>
                    {codeforcesData['rating']}
                </div>
                <div>
                    <span className="labels"> Rank: </span>
                    {codeforcesData['rank']}
                </div>
            </div>
            <div className="max-rank">
                <div>
                    <span className="labels"> Max Rating: </span>
                    {codeforcesData['maxRating']}
                </div>
                <div>
                    <span className="labels"> Max Rank: </span>
                    {codeforcesData['maxRank']}
                </div>
            </div>
            <div className="activity">
                <div>
                    {activityData[0]}
                    <span className="labels">problems solved till time</span>
                </div>
                <div>
                    {activityData[1]}
                    <span className="labels">problems solved last year</span>
                </div>
                <div>
                    {activityData[2]}
                    <span className="labels">problems solved last month</span>
                </div>
                <div>
                    {activityData[3]}
                    <span className="labels">problems solved in a row max</span>
                </div>
                <div>
                    {activityData[4]}
                    <span className="labels">problems solved in a row last year</span>
                </div>
                <div>
                    {activityData[5]}
                    <span className="labels">problems solved in a row for last month</span>
                </div>
            </div>
            <div className="contest">
                <table>
                    <thead>
                        <tr>
                            <th className="labels">Contest Id</th>
                            <th className="labels">Contest Name</th>
                            <th className="labels">Rank</th>
                            <th className="labels">Old Rating</th>
                            <th className="labels">New Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            [...contestData].reverse().map((d,k) => {
                                return (
                                    <tr key={k}>
                                        <td>{d.contestId}</td>
                                        <td>{d.contestName}</td>
                                        <td>{d.rank}</td>
                                        <td>{d.oldRating}</td>
                                        <td>{d.newRating}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}