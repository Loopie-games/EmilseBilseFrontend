import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {action, makeAutoObservable, observable, runInAction} from "mobx";
import {Lobby} from "../models/game/gameInterfaces";
import {pendingPlayerDto} from "../models/player/playerInterface";
import lobbyService from "../services/lobbyService";

export default class LobbyStore {
    hubConnection: HubConnection | null = null;
    @observable lobby: Lobby | undefined;
    @observable players: pendingPlayerDto[] = [];

    constructor() {
        makeAutoObservable(this)
    }


    createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_LOBBY_SOCKET !== undefined ? process.env.REACT_APP_LOBBY_SOCKET : "http://localhost:5121/", {accessTokenFactory: () => localStorage.getItem("token")!.toString()})
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        await this.hubConnection.start()
            .then(result => console.log("connected lobby"))
            .catch(error => {
                console.log(error)
            });
        return;
    }

    joinLobby = async (lobbyPin: string) => {
        await this.createHubConnection()
        this.hubConnection?.on('receiveLobby', async (lobby: Lobby) => {
            this.lobby = lobby;
            console.log(lobby)
            return
        });
        this.hubConnection?.on('playerList', (players: pendingPlayerDto[]) => {
            runInAction(() => {
                this.players = players;
                console.log("players in lobby " + players.length);
                //callBack()
                return
            });
        })
        await this.hubConnection?.invoke('JoinLobby', lobbyPin)
        return
    }

    @action
    createlobby = async () => {
        const response = await lobbyService.create();
        this.lobby = response.data
        return response.data
    }


}