import http from "../http-common"
import {BugReport, UserBugDto} from "../models/bugs/bugsInterfaces";

class tilePackService {

    create = async (ubr: UserBugDto) => {
        return await http.post<BugReport[]>("/BugReport/Create", ubr)
    }

    getById = async (id:string) =>{
        return await http.get<BugReport>("/BugReport/" + id)
    }

}

export default new tilePackService();