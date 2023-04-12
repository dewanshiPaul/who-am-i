const https = require('https');

const profile = (username) => `
    https://leetcode.com/graphql?query=query 
    { 
        matchedUser(username: "${username}") 
        {
            username
            submitStats: submitStatsGlobal 
            {
                acSubmissionNum 
                {
                    difficulty
                    count
                    submissions
                }
            }
    	  profile 
    	{
    		ranking
    		userAvatar
    		realName
    		aboutMe
    		school
    		websites
    		countryName
    		company
    		jobTitle
    		skillTags
    		postViewCount
    		postViewCountDiff
    		reputation
    		reputationDiff
    		solutionCount
    		solutionCountDiff
    		categoryDiscussCount
    		categoryDiscussCountDiff
    	}
    	languageProblemCount 
    	{
    		languageName
    		problemsSolved
    	}
    	badges
    	{
    		id
    		name
    		shortName
    		displayName
    		hoverText
    		icon
    		category
    		creationDate
    	}
    	userCalendar(year: 2022) 
    	{
    		activeYears
    		streak
    		totalActiveDays
    		dccBadges
    		{
    			timestamp
    			badge
    			{
    				name
    				icon
    			}
    		}
    		submissionCalendar
    	}
    	activeBadge
    	{
    		displayName
    		icon
    	}
    	tagProblemCounts 
    	{
    		advanced
    		{
    			tagName
    			tagSlug
    			problemsSolved
    		}
    		intermediate
    		{
    			tagName
    			tagSlug
    			problemsSolved
    		}
    		fundamental
    		{
    			tagName
    			tagSlug
    			problemsSolved
    		}
    	}
        }
    }
`

const contestRanking = (username) => `
    https://leetcode.com/graphql?query=query
    {
        userContestRanking(username: "${username}") {
            attendedContestsCount
            rating
            globalRanking
            totalParticipants
            topPercentage
            badge {
                name
            }
        }
    }
`

const allProblemsCount = () => `
	https://leetcode.com/graphql?query=query
	{
		allQuestionsCount {
			difficulty   
			count 
		}
	}
`
const getLeetcodeUserData = (username) => {
    let data='';
	return new Promise((resolve,reject) => {
		const request = https.get(profile(username), (response) => {
        	response.setEncoding('utf8');
        	response.on('data', (chunk) => {
            	data += chunk
       		});
        	response.on('end', () => {
				try {
					data = JSON.parse(data);
					console.log(data);
					resolve(data['data']);
				} catch(error) {
					reject(error);
				}
        	});
    	});
    	request.on('error', (error) => {
        	// console.log('error',error);
        	reject(error)
    	});
    	request.end();
	})
}

const getLeecodeUserContestData = (username) => {
	let data = '';
	return new Promise((resolve,reject) => {
		const request = https.get(contestRanking(username), (response) => {
        	response.setEncoding('utf8');
        	response.on('data', (chunk) => {
            	data += chunk
       		});
        	response.on('end', () => {
				try {
					data = JSON.parse(data);
					resolve(data['data']);
				} catch(error) {
					reject(error);
				}
        	});
    	});
    	request.on('error', (error) => {
        	console.log('error',error);
        	reject(error)
    	});
    	request.end();
	})
}

const getAllQuestionsCount = () => {
	let data = '';
	return new Promise((resolve,reject) => {
		const request = https.get(allProblemsCount(), (response) => {
        	response.setEncoding('utf8');
        	response.on('data', (chunk) => {
            	data += chunk
       		});
        	response.on('end', () => {
				try {
					data = JSON.parse(data);
					resolve(data['data']);
				} catch(error) {
					reject(error);
				}
        	});
    	});
    	request.on('error', (error) => {
        	console.log('error',error);
        	reject(error)
    	});
    	request.end();
	})
}
module.exports = {
	getLeetcodeUserData,
	getLeecodeUserContestData,
	getAllQuestionsCount
};

