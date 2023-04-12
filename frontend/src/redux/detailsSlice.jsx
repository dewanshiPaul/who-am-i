import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
    name: 'userdetails',
    initialState: {
        username: null,
        email: null,
        leetcode: null,
        codeforces: null,
        github: null,
        unstop: null,
        search_username: null,
        search_leetcode: null,
        search_codeforces: null,
        search_github: null,
        search_unstop: null,
        search: false
    },
    reducers: {
        setDetails: (state, action) => {
            const { username, email, leetcode, codeforces, github, unstop } = action.payload;
            state.username = username;
            state.email = email;
            state.leetcode = leetcode;
            state.codeforces = codeforces;
            state.github = github;
            state.unstop = unstop;
            // console.log('state: ',state.username,state.email,state.leetcode,state.codeforces,state.github);
        },
        setSearchUserDetails: (state, action) => {
            const { search_username, email, search_leetcode, search_codeforces, search_github, search_unstop } = action.payload;
            state.search_username = search_username;
            state.email = email;
            state.search_leetcode = search_leetcode;
            state.search_codeforces = search_codeforces;
            state.search_github = search_github;
            state.search_unstop = search_unstop;
            // console.log('state: ',state.search_username,state.email,state.search_leetcode,state.search_codeforces,state.search_github,state.search_unstop);
        },
        setSearch: (state, action) => {
            const { search } = action.payload;
            state.search = search;
            // console.log('state: ',state.search);
        }
    }
})

export const { setDetails,setSearchUserDetails,setSearch } = detailsSlice.actions;
export default detailsSlice;

export const userStore = configureStore({reducer: detailsSlice.reducer});