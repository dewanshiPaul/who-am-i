const axios = require('axios');
const cheerio = require('cheerio');

const scrapeActivityCodeforces = (username) => {
    const url = `https://codeforces.com/profile/${username}/`
    return new Promise(async (resolve, reject) => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const res = [];
            const scrappedProblemsData = $("._UserActivityFrame_footer").find("._UserActivityFrame_counterValue").toArray()
            scrappedProblemsData.map((d,k) => {
               res.push($(d).text().split(' ')[0]);
            })
            resolve(res)
        } catch(err) {
            console.log(err);
            reject(err)
        }
    })
}

const scraperAchievementGithub = (username) => {
    const url = `https://github.com/${username}?tab=achievements`
    return new Promise(async (resolve,reject) => {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);
            const scrappedAchievementData = $("summary").toArray();
            const res = [];
            scrappedAchievementData.map((d,k) => {
                let imgsrc = $(d).find('img').attr('src');
                if(imgsrc !== undefined) {
                    let name = $(d).find("div").text().trim();
                    res.push({imgsrc,name});
                }
            })
            resolve(res);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    scrapeActivityCodeforces,
    scraperAchievementGithub,
}