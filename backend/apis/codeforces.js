const https = require('https')

const info = (username) => {
    return `https://codeforces.com/api/user.info?handles=${username}`
}

const contest = (username) => {
    return `https://codeforces.com/api/user.rating?handle=${username}`
}

const getUserInfo = (username) => {
    let data='';
    return new Promise((resolve,reject) => {
        const request = https.get(info(username), (response) => {
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    console.log(data);
                    data = JSON.parse(data);
                    // console.log(data);
                    resolve(data);
                } catch(error) {
                    reject(error);
                }
            });
        });
        request.on('error', (error) => {
            reject(error);
        })
        request.end();
    });
};

const getContestInfo = (username) => {
    let data='';
    return new Promise((resolve,reject) => {
        const request = https.get(contest(username), (response) => {
            response.on('data', (chunk) => {
                data += chunk;
            });
            response.on('end', () => {
                try {
                    data = JSON.parse(data);
                    // console.log(data);
                    resolve(data);
                } catch(error) {
                    reject(error);
                }
            });
        });
        request.on('error', (error) => {
            reject(error);
        });
        request.end();
    })
}

module.exports = {
    getUserInfo,
    getContestInfo
};