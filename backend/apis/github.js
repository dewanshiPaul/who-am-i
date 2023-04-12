const https = require('https');

const getMostUsedLanguages = (data) => {
    let languages = new Set();
    for(let i=0;i<data.length;i++) {
        if(data[i]['language'] != null)
            languages.add(data[i]['language'])
    }
    return Array.from(languages)
}

const getTopicsInvolvedInRepos = (data) => {
    let topics = new Set();
    for(let i=0;i<data.length;i++) {
        if(!data[i]['fork']) {
            for(let j=0;j<data[i]['topics'].length;j++) {
                topics.add(data[i]['topics'][j]);
            }
        }
    }

    return Array.from(topics)
}

const getMostStarredRepos = (data) => {
    let starred = [];
    const sortedData = data.sort(function(a,b) {
        return a.stargazers_count-b.stargazers_count
    })
    for(let i=sortedData.length-1;i>=sortedData.length-3;i--) {
        if(!sortedData[i]['fork'] && sortedData[i]['stargazers_count'] > 0)
            starred.push(sortedData[i]);
    }
    // console.log(starred.length);
    return starred;
}

const getMostForkedRepos = (data) => {
    let forked = [];
    const sortedData = data.sort(function(a,b) {
        return a.forks_count-b.forks_count
    })
    for(let i=sortedData.length-1;i>=sortedData.length-3;i--) {
        if(!sortedData[i]['fork'] && sortedData[i]['forks_count'] > 0)
            forked.push(sortedData[i]);
    }
    // console.log(forked.length);
    return forked;
}

const getUserInfo = (username) => {
    let data = '';
    const option = {
        hostname: 'api.github.com',
        path: '/users/'+username,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        auth: 'your-github-access-token'
    }
    return new Promise((resolve,reject) => {
        const request = https.get(option, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    resolve(data);
                } catch(error) {
                    reject(error);
                }
            });
        });
        request.on('error', (error) => {
            console.log('error', error);
            reject(error);
        });
        request.end();
    })
}

const getDetails = (username, page) => {
    let data='';
    const option = {
        hostname: 'api.github.com',
        path: '/users/'+username+'/repos?page='+page+'&per_page='+100,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        auth: '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'
    }
    return new Promise((resolve, reject) => {
        const request = https.get(option, (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    resolve(data);
                } catch(error) {
                    reject(error);
                }
            })
        })
        request.on('error', (error) => {
            console.log('error', error);
            reject(error);
        });
        request.end();
    })
}

const getUserWorkFlow = (username,repos_cnt) => {
    let data = [];
    let totalPage = Math.floor(repos_cnt/100);
    if(repos_cnt%100 > 0) 
        totalPage += 1;
    
    return new Promise(async (resolve,reject) => {
        for(let i=1;i<=totalPage;i++) {
            // console.log('start:',i);
            const request = await getDetails(username, i);
            try {
                for(let i=0;i<request.length;i++) {
                    data.push(request[i]);
                }
                if(i == totalPage) {
                    const language = getMostUsedLanguages(data);
                    const topics = getTopicsInvolvedInRepos(data);
                    const starred = getMostStarredRepos(data);
                    const forked = getMostForkedRepos(data);
                    resolve({
                        'languages': language,
                        'topics': topics,
                        'starred': starred,
                        'forked': forked
                    })
                }
            } catch(err) {
                reject(err);
            }
        }
    })
}

const getUserOrgs = (username) => {
    let data='';
    const option = {
        hostname: 'api.github.com',
        path: '/users/'+username+'/orgs',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        auth: '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'
    }
    return new Promise((resolve,reject) => {
        const request = https.get(option, (response) => {
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    resolve(data);
                } catch(err) {
                    reject(err);
                }
            });
        });
        request.on("error", (error) => {
            reject(error);
        });
        request.end();
    })
}

const getUserEvent = (username) => {
    let data = '';
    const option = {
        hostname: 'api.github.com',
        path: '/users/'+username+'/events/public',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'
        },
        auth: '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'
    }
    return new Promise((resolve, reject) => {
        const request = https.get(option, (response) => {
            response.on('data', (chunk) => {
                data += chunk
            })
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    const res=[];
                    var cnt=0;
                    for(let i=0;i<data.length;i++) {
                        if(cnt == 4)
                            break;
                        if(data[i]['type']!=='MemberEvent') {
                            cnt += 1;
                            res.push({
                                'event': data[i]['type'],
                                'repo': data[i]['repo']['name'],
                                'createdAt': data[i]['created_at']
                            })
                        }
                    }
                    resolve(res);
                } catch(err) {
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
    getUserInfo,
    getUserWorkFlow,
    getUserOrgs,
    getUserEvent
}