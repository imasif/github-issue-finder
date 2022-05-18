import { createSlice } from "@reduxjs/toolkit";

export interface IState {
    openIssues: object;
    closedIssues: object;
    openIssuesLastVisitedPage: number;
    closedIssuesLastVisitedPage: number;
    issuePerPage: number;
    owner: string;
    reponame: string;
}

const initialState: IState = {
    openIssues: {},
    closedIssues: {},
    openIssuesLastVisitedPage: 1,
    closedIssuesLastVisitedPage: 1,
    issuePerPage: 10,
    owner: "",
    reponame: ""
}

export const slices = createSlice({
    name: "issues",
    initialState,
    reducers: {
        setOpenIssues: (state:IState, action: {
            payload: any;
            type: string;
        }) => {
            state.openIssues = action.payload;
        },
        setClosedIssues: (state:IState, action: {
            payload: any;
            type: string;
        }) => {
            state.closedIssues = action.payload;
        },
        setOwner: (state:IState, action: {
            payload: any;
            type: string;
        }) => {
            state.owner = action.payload;
        },
        setReponame: (state:IState, action: {
            payload: any;
            type: string;
        }) => {
            state.reponame = action.payload;
        },
        incrementOpenIssuesLastVisitedPage: (state:IState) => {
            state.openIssuesLastVisitedPage++;
        },
        decrementOpenIssuesLastVisitedPage: (state:IState) => {
            state.openIssuesLastVisitedPage--;
        },
        incrementClosedIssuesLastVisitedPage: (state:IState) => {
            state.closedIssuesLastVisitedPage++;
        },
        decrementClosedIssuesLastVisitedPage: (state:IState) => {
            state.closedIssuesLastVisitedPage--;
        },
        resetState: (state:IState) => {
            state.openIssues = {};
            state.closedIssues = {};
        }
    }
})

export const { setOpenIssues, setClosedIssues, resetState,
    incrementOpenIssuesLastVisitedPage, decrementOpenIssuesLastVisitedPage,
    incrementClosedIssuesLastVisitedPage, decrementClosedIssuesLastVisitedPage,
    setOwner, setReponame } = slices.actions;

export default slices.reducer;