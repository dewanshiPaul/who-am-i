import { Typography } from '@mui/material';
import './index.scss';

export function Unstop({ userInfo, badgesInfo }) {
    return (
        <div className="platform-details-container">
            <div>
                <span className="labels"> Real Name: </span>
                {userInfo['name']}
            </div>
            <div>
                <span className="labels"> About me: </span>
                {userInfo['summary'] === null ? '-':userInfo['summary']}
            </div>
            <div className='profile-stats'>
                <div>
                    <span className='labels'> Rank: </span>
                    {userInfo['rank']}
                </div>
                <div>
                    <span className='labels'> Points: </span>
                    {userInfo['points']}
                </div>
                <div>
                    <span className='labels'> participations: </span>
                    {userInfo['participations']}
                </div>
            </div>
            <div className='streak-stats'>
                <div>
                    <span className='labels'> Current Streak: </span>
                    {userInfo['stats']['current_streak']}
                </div>
                <div>
                    <span className='labels'> Max Streak: </span>
                    {userInfo['stats']['longest_streak']}
                </div>
            </div>
            <div
                style={{marginTop: '2vh'}}
            >
                <span className='labels'> Recent Events Participated: </span>
                <div 
                    className='recent-hackathon-container'
                    style={{
                        maxHeight: '50vh',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        userInfo['recentHackathonsParticipated'].map((d,k) => {
                            return (
                                <div 
                                    key={k}
                                    style={{
                                        border: '2px solid #DCE9FE',
                                        borderRadius: '4px',
                                        padding: '1.5vh',
                                        margin: '0.5vh',
                                        // width: '100%'
                                    }}
                                >
                                    <Typography variant='body1'>Event Type: {d['type']}</Typography>
                                    <Typography variant='subtitle1' style={{'fontSize': '16px'}}>Event: {d['eventName']}</Typography>
                                    <Typography variant='body1'>Team Name: {d['teamName']}</Typography>
                                    <Typography variant='body1'>Rank: {d['rank']}</Typography>
                                    <Typography variant='body1' style={{'fontSize': '12px', 'color': '#726d6d'}}>
                                        {new Date(d['updated_at']).getDate()}
                                        -
                                        {new Date(d['updated_at']).getMonth()}
                                        -
                                        {new Date(d['updated_at']).getUTCFullYear()}
                                    </Typography>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <span className="labels"> Badges: </span>
            </div>
            <div style={{'width': '45vw', 'justifyContent': 'center', 'display': 'flex', 'alignItems': 'center'}}>
                <div className="badges-display">
                    {badgesInfo?.map((d,k) => {
                        return <>
                            <div className="badge-container" key={k}>
                        {/* {console.log('log c:',d.icon)} */}
                                <img 
                                    src={d.badge_url} 
                                    alt={d.badge_name} 
                                    style={{ 'height': '50px', 'width': '50px' }}
                                />
                            <span>{d.description}</span>
                        </div>
                    </>
                    })}
                </div>
            </div>
        </div>
    )
}