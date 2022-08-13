import { observable, makeAutoObservable, runInAction, toJS, action } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { GameRoom, Lobby } from "../models/game/gameInterfaces";
import { UserDTO } from "../models/user/userInterface";
import { useNavigate } from 'react-router-dom';

export default class GameStore {
    @observable gameRoom: GameRoom | undefined;
    @observable lobby: Lobby | undefined;
    @observable tiles: any[] = [{ id: 1, action: 'test action', to: 'test to', by: 'test by', shown: false }]
    @observable players: any[] = [{ username: 'Test', nickname: 'Hovedskovasddasdas' }]
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_GAME_SOCKET !== undefined ? process.env.REACT_GAME_SOCKET : "http://localhost:5121/game")
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        await this.hubConnection.start()
            .then(result => console.log("connected"))
            .catch(error => {
                console.log(error)
            });

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
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => { });
    }

    createLobby = async (userId: string) => {
        this.hubConnection?.invoke('CreateLobby', userId);
        this.hubConnection?.on('receiveLobby', async (lobby) => {
            runInAction(async () => {
                this.lobby = await lobby;
                console.log(this.lobby);
            });
        });
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

    kickPlayer = async (userId: string) => {
        console.log(userId);

    }
}