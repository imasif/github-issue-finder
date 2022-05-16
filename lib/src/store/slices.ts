import { createSlice } from "@reduxjs/toolkit";

export interface IState {
    openedIssues: object;
    closedIssues: object;
    openedIssuesLastVisitedPage: number;
    closedIssuesLastVisitedPage: number;
    issuePerPage: number;
}

const initialState: IState = {
    openedIssues: {},
    closedIssues: {},
    openedIssuesLastVisitedPage: 1,
    closedIssuesLastVisitedPage: 1,
    issuePerPage: 10,
}

export const slices = createSlice({
    name: "issues",
    initialState,
    reducers: {
        setOpenedIssues: (state:IState, action: {
            payload: any;
            type: string;
        }) => {
            state.openedIssues = action.payload;
        },
        setClosedIssues: (state:IState, action: {
            payload: any;
            type: string;
        }) => {
            state.closedIssues = action.payload;
        },
        resetState: (state:IState) => {
            state.openedIssues = {};
            state.closedIssues = {};
        }
    }
})

export const { setOpenedIssues, setClosedIssues, resetState } = slices.actions;

export default slices.reducer;