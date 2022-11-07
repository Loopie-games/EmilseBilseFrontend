import {action} from "mobx";
import gameModeService from "../services/gameModeService";

export class gameModeStore {
    @action
    getAll = async () => {
        const response = await gameModeService.getAll();
        return response.data
    }
}