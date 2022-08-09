import { observable, makeAutoObservable, runInAction, toJS } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { GameRoom, Lobby } from "../models/game/gameInterfaces";
import { UserDTO } from "../models/user/userInterface";

export default class GameStore {
    @observable gameRoom: GameRoom | undefined;
    @observable lobby: Lobby | undefined;
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_GAME_SOCKET !== undefined ? process.env.REACT_GAME_SOCKET : "http://localhost:5000/game")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => { });

        this.hubConnection.on('server_StartGame', (game) => {
            runInAction(() => {
                this.gameRoom = game;
            });
        });

        this.hubConnection.on('server_JoinLobby', (lobby) => {
            runInAction(() => {
                this.lobby = lobby;
            });
        });

        this.hubConnection.on('server_CreateLobby', (lobby) => {
            runInAction(() => {
                this.lobby = lobby;
            });
        });
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => { });
    }

    createLobby = async () => {
        this.hubConnection?.invoke('client_CreateLobby');
    }

    startGame = async (user: UserDTO) => {
        if (this.lobby?.host.id !== user.id) { return }
        this.hubConnection?.invoke('client_StartGame')
    }

    joinLobby = async (LobbyPin: string) => {
        this.hubConnection?.invoke('client_JoinLobby', LobbyPin).then(() => {
        }).catch(error => {
            console.log(error);
        });
    }
}