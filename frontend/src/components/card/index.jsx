import { Avatar, Badge, Chip } from '@mui/material';
import './index.scss';

export function Card({children, userImage, username, platform, img}) {
    return (
        <div className='card-container'>
            <div className="card-container-content">
                <div className='card-header'>
                    <div className='card-header-platform'>
                        <Badge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            badgeContent={
                                <Avatar 
                                    src={userImage} 
                                    style={{'height': '3vh', 'width': '3vh'}}
                                />
                            }
                        >
                            <Avatar src={img} />
                        </Badge>
                        {platform}
                    </div>
                    <div className='card-header-username'>
                        <Chip label={username} className="username-chip" />
                    </div>
                </div>
                <div className='card-body'>
                    {children}
                </div>
            </div>
        </div>
    )
}