import { createSlice } from "@reduxjs/toolkit";

export interface IState {
    openIssues: IssueInterface;
    closedIssues: IssueInterface;
    openIssuesLastVisitedPage: number;
    closedIssuesLastVisitedPage: number;
    issuePerPage: number;
    owner: string;
    reponame: string;
}

export interface IssueInterface {
    total_count: number;
    incomplete_results: boolean;
    items: ItemInterface[];
}

export interface ItemInterface {
    url: string;
    repository_url: string;
    labels_url: string;
    comments_url: string;
    events_url: string;
    html_url: string;
    id: number;
    node_id: string;
    number: number;
    title: string;
    user: UserInterface;
    labels: [];
    state: string;
    locked: boolean;
    assignee: null|string;
    assignees: [];
    milestone: null|string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at: null|string;
    author_association: string;
    active_lock_reason: null|string;
    body: string;
    reactions: ReactionsInterface;
    timeline_url: string;
    performed_via_github_app: null|string;
    score: number;
}

export interface UserInterface {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface ReactionsInterface {
    url: string;
    total_count: number;
    "+1": number;
    "-1": number;
    laugh: number;
    hooray: number;
    confused: number;
    heart: number;
    rocket: number;
    eyes: number;
}

const initialState: IState = {
    openIssues: {
        total_count: 0,
        incomplete_results: false,
        items: [],
    },
    closedIssues: {
        total_count: 0,
        incomplete_results: false,
        items: []
    },
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
            state.openIssues = {
                total_count: 0,
                incomplete_results: false,
                items: [],
            };
            state.closedIssues = {
                total_count: 0,
                incomplete_results: false,
                items: [],
            };
        }
    }
})

export const { setOpenIssues, setClosedIssues, resetState,
    incrementOpenIssuesLastVisitedPage, decrementOpenIssuesLastVisitedPage,
    incrementClosedIssuesLastVisitedPage, decrementClosedIssuesLastVisitedPage,
    setOwner, setReponame } = slices.actions;

export default slices.reducer;