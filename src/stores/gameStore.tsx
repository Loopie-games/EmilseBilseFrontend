import { observable, makeAutoObservable, runInAction, toJS, action } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { GameRoom, Lobby, CloseLobbyDto } from "../models/game/gameInterfaces";
import { UserDTO, SimpleUser } from "../models/user/userInterface";
import { useNavigate } from 'react-router-dom';

export default class GameStore {
    @observable gameRoom: GameRoom | undefined;
    @observable lobby: Lobby | undefined;
    @observable lobbyPlayers: SimpleUser[] = [];
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

        this.hubConnection.on('lobbyPlayerListUpdate', (players :SimpleUser[]) =>{
            runInAction(() => {
                this.lobbyPlayers = players;
            });
        })

        this.hubConnection.on('lobbyClosed', () => {
            runInAction(async () => {
                this.lobby = undefined;
                console.log('lobby is Closed');
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

    joinLobby = async (userId: string, lobbyPin: string, func: Function) => {
        this.hubConnection?.invoke('JoinLobby', userId, lobbyPin)
        this.hubConnection?.on('receiveLobby', async (lobby: Lobby)=>{
            this.lobby = await lobby;
            func();
        });
    }

    closeLobby = async (lobbyId: string, hostId:string) => {
        let cl: CloseLobbyDto = {lobbyID: lobbyId, hostID: hostId}
        this.hubConnection?.invoke('CloseLobby', cl)
    }

    kickPlayer = async (userId: string) => {
        console.log(userId);

    }

}
