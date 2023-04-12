const searchUser = async (User, username) => {
    results = await User.aggregate([
        {
            $search: {
                index: "userSearch",
                autocomplete: {
                    query: username,
                    path: "username",
                    fuzzy: {
                        maxEdits: 1,
                    },
                    // tokenOrder: "sequential",
                },
            },
        }, {
            $project: {
                _id: 1,
                username: 1,
                leetcode: 1,
                github: 1,
                codeforces: 1,
                unstop: 1
            },
        }
    ]);
    // console.log(results);
    return results;
}

module.exports = searchUser;