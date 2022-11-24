import { action, makeAutoObservable, observable } from "mobx";
import { useHref } from "react-router-dom";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, SimpleUserDTO, UserDTO, admin } from "../models/user/userInterface";
import cloudinaryService from "../services/cloudinaryService";
import securityService from "../services/securityService";
import userService from "../services/userService";

export class GamesStore {

    @observable games: any = [
        {
            id: 1,
            title: 'Game 1',
            status: 'In Progress',
        },
        {
            id: 2,
            title: 'Game 2',
            status: 'In Progress',
        },
        {
            id: 3,
            title: 'Game 3',
            status: 'In Progress',
        },
    ]; //TODO Lav interface til games

    @action
    getAllGames = async () => {
        /*
        const response = await userService.getAllGames();
        this.games = response.data;
        return response.data;
        */
    }

    @action
    deleteGame = async (id: number) => {
        this.games = this.games.filter((game: any) => game.id !== id);
    }

    constructor() {
        makeAutoObservable(this);
    }


}