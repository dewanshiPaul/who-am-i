const https = require('https');

const userProfile = (username) => {
    return `https://unstop.com/api/gamification/get-user-widget-data/${username}/21/global`
}

const badges = (username) => {
    return `https://unstop.com/api/gamification/get-user-badges/global/0/3/${username}`
}

const certificates = (username) => {
    return `https://unstop.com/api/${username}/certificates?page=1&per_page=10&undefined=true`
}

const getUserProfile = (username) => {
    let data = '';

    return new Promise((resolve,reject) => {
        const request = https.get(userProfile(username), (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    const recentEvent = [];
                    data['certificates'].map((d,k) => {
                        recentEvent.push({
                            type: d['certData']['event'],
                            eventName: d['certData']['parentEvent'],
                            teamName: d['certData']['team'],
                            rank: d['rank'],
                            updated_at: d['updated_at'],
                        })
                    })
                    resolve({
                        avatar: data['user']['avatar'],
                        name: data['user']['name'],
                        summary: data['user']['user_summary'],
                        stats: data['streak']['stats'][0],
                        rank: data['perks']['rank'],
                        points: data['perks']['points'],
                        participations: data['participations'],
                        username: data['user']['username'],
                        recentHackathonsParticipated: recentEvent
                    });
                } catch(err) {
                    console.log(err);
                    reject(err);
                }
            })
        })
        request.on('error', (err) => {
            reject(err);
        })
        request.end();
    })
}

const getBadgesAchieved = (username) => {
    let data='';
    const result = [];
    return new Promise((resolve,reject) => {
        const request = https.get(badges(username), (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    for(let i=0;i<data['data'].length;i++) {
                        if(data['data'][i]['allocated'] === 'A') {
                            result.push({
                                badge_name: data['data'][i]['badge_trigger']['badge_name'],
                                description: data['data'][i]['badge_trigger']['description'],
                                badge_url: 'https://d8it4huxumps7.cloudfront.net/'+data['data'][i]['badge_trigger']['badges']['badge_slug']+'?d=200x200',
                            })
                        }
                    }
                    resolve(result)
                } catch(err) {
                    console.log(err);
                    reject(err);
                }
            })
        })
        request.on('error', (err) => {
            reject(err);
        })
        request.end();
    })
}

module.exports = {
    getUserProfile,
    getBadgesAchieved,
};