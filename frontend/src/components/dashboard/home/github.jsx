import { Chip, Typography } from '@mui/material';
import './index.scss';

export function Github({ userInfo, stats, achievement, orgs }) {
    return (
        <div className="platform-details-container">
            <div>
                <span className="labels"> Real Name: </span>
                {userInfo['name']}
            </div>
            <div>
                <span className="labels"> About me: </span>
                {userInfo['bio']}
            </div>
            <div className="counts">
                <div>
                    <span className="labels"> Public Repos: </span>
                    {userInfo['public_repos']}
                </div>
                <div>
                    <span className="labels"> Public gists: </span>
                    {userInfo['public_gists']}
                </div>
            </div>
            <div className="account">
                <div>
                    <span className="labels"> Created At: </span>
                    {userInfo['created_at'].split('T')[0]}
                </div>
                <div>
                    <span className="labels"> Updated At: </span>
                    {userInfo['updated_at'].split('T')[0]}
                </div>
            </div>
            <div>
                <span className='labels'> Most Language Used: </span>
                <div 
                    className='language-container'
                    style={{
                        maxHeight: '25vh',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        stats['languages'].map((d,k) => {
                            return (
                                <Chip label={d} className="chip" key={k}/>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <span className='labels'> Most Topics Worked: </span>
                <div 
                    className='topics-container'
                    style={{
                        maxHeight: '25vh',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        stats['topics'].map((d,k) => {
                            return (
                                <Chip label={d} className="chip" key={k}/>
                            )
                        })
                    }
                </div>
            </div>
            <div
                style={{marginTop: '2vh'}}
            >
                <span className='labels'> Most Starred Repos: </span>
                <div 
                    className='starred-container'
                    style={{
                        maxHeight: '50vh',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        stats['starred'].map((d,k) => {
                            return (
                                <div
                                    style={{
                                        border: '2px solid #DCE9FE',
                                        borderRadius: '4px',
                                        padding: '1.5vh',
                                        margin: '0.5vh'
                                    }}
                                >
                                    <Typography variant='subtitle1' style={{'fontSize': '20px'}}>{d['name']}</Typography>
                                    <Typography variant='body1'>{d['description']}</Typography>
                                    <Typography variant='body1'>Stars: {d['stargazers_count']}</Typography>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div
                style={{marginTop: '2vh'}}
            >
                <span className='labels'> Most Forked Repos: </span>
                <div 
                    className='forked-container'
                    style={{
                        maxHeight: '50vh',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        stats['forked'].map((d,k) => {
                            return (
                                <div
                                    key={k}
                                    style={{
                                        border: '2px solid #DCE9FE',
                                        borderRadius: '4px',
                                        padding: '1.5vh',
                                        margin: '0.5vh',
                                        width: '100%'
                                    }}
                                >
                                    <Typography variant='subtitle1' style={{'fontSize': '20px'}}>{d['name']}</Typography>
                                    <Typography variant='body1'>{d['description']}</Typography>
                                    <Typography variant='body1'>Forks: {d['forks_count']}</Typography>
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
                    {achievement?.map((d,k) => {
                        return <>
                            <div className="badge-container">
                                <img 
                                    src={d.imgsrc} 
                                    alt={d.name} 
                                    style={{ 'height': '50px', 'width': '50px' }}
                                />
                            <span>{d.description}</span>
                        </div>
                        </>
                    })}
                </div>
            </div>
            <div>
                <span className="labels"> Organizations: </span>
                <div 
                    className='orgs-container'
                    style={{
                        maxHeight: '25vh',
                        overflowY: 'scroll'
                    }}
                >
                    {
                        orgs.map((d,k) => {
                            return (
                                <Chip className="chip" label={
                                    <div
                                        style={{'display': 'flex','gap': '8px','alignItems': 'center'}}
                                    >
                                        <span>
                                            <img src={d['avatar_url']} style={{'height': '20px', 'width': '20px', 'borderRadius': '50%'}}/>
                                        </span>
                                        <span>
                                            {d['login']}
                                        </span>
                                    </div>
                                }/>
                            )
                        })
                    }
                </div>
            </div>
            
        </div>
    )
}