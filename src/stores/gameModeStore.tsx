import { action, makeAutoObservable, observable } from "mobx";
import { GameMode, GameModeSetting } from "../models/gameMode/gameModeInterfaces";
import gameModeService from "../services/gameModeService";

export class gameModeStore {
    @observable
    gameModes: GameModeSetting[] = [];



    @action
    getAll = async () => {
        await gameModeService.getAll().then((res) => {
            let gmSetList: GameModeSetting[] = []
            res.data.forEach(((gm: GameMode) => {
                let gmSetting = { gameMode: gm, isActivated: false }
                gmSetList.push(gmSetting)
            }));

            gmSetList[0].isActivated = true;
            this.gameModes = gmSetList;
        });
    }

    @action
    toggleGameMode = (id: string) => {
        this.gameModes.map(gameMode => {
            if (gameMode.gameMode.id === id) {
                gameMode.isActivated = true;
            } else {
                gameMode.isActivated = false;
            }
        }) 
    }

    constructor() {
        makeAutoObservable(this);
    }
}