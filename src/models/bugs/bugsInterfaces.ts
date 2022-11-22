import {SimpleUserDTO} from "../user/userInterface";
export interface BugReport {
    id: string;
    title: string;
    description?: string;
    reportingUser: SimpleUserDTO;

}

export interface UserBugDto{
    title: string;
    description?: string;
}
