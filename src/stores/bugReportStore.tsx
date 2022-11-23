import {action, makeAutoObservable} from "mobx";
import {UserBugDto} from "../models/bugs/bugsInterfaces";
import bugReportService from "../services/bugReportService";

export class bugReportStore {

    
    constructor() {
        makeAutoObservable(this);
    }

    @action
    create = async (ubr: UserBugDto) => {
        const response = await bugReportService.create(ubr);
        return response.data
    }

}