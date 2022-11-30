import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import { CreateGameDto, Lobby } from "../models/game/gameInterfaces";
import { pendingPlayerDto } from "../models/player/playerInterface";
import lobbyService from "../services/lobbyService";

export default class LobbyStore {
    hubConnection: HubConnection | null = null;
    @observable lobby: Lobby | undefined;
    @observable players: pendingPlayerDto[] = [];
    @observable gameId: string | undefined;

    constructor() {
        makeAutoObservable(this)
    }

    reset = () => {
        this.lobby = undefined;
        this.players = [];
        this.gameId = undefined;
    }

    private createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_LOBBY_SOCKET !== undefined ? process.env.REACT_APP_LOBBY_SOCKET : "http://localhost:5121/", { accessTokenFactory: () => localStorage.getItem("token")!.toString() })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        await this.hubConnection.start()

        this.hubConnection.on('receiveLobby', async (lobby: Lobby) => {
            runInAction(() => {
                this.lobby = lobby;
                return
            })
        });
        this.hubConnection.on('lobbyClosed', async () => {
            runInAction(() => {
                this.reset()
                return
            })
        });
        this.hubConnection.on('playerList', (players: pendingPlayerDto[]) => {
            runInAction(() => {
                this.players = players;
                return
            });
        })
        this.hubConnection.on('gameStarting', (gameId: string) => {
            runInAction(() => {
                this.gameId = gameId;
                return
            });
        })
        return;
    }

    stopConnection = async () => {
        await this.hubConnection?.stop()
        return
    }

    joinLobby = async (lobbyPin: string) => {
        this.reset();
        await this.createHubConnection()
        await this.hubConnection?.invoke('JoinLobby', lobbyPin)
        return
    }

    kickPlayer = async (userId: string) => {
        //TODO
    }

    @action
    createlobby = async () => {
        this.reset();
        const response = await lobbyService.create();
        //this.lobby = response.data
        return response.data
    }

    @action
    closeLobby = async () => {
        if (this.lobby !== undefined) {
            const response = await lobbyService.closeLobby(this.lobby.id);
            if (response.data) {
                this.lobby = undefined
            }
            return response.data
        }
        throw new Error("ERROR in close lobby. lobby is undefined")
    }

    @action
    startGame = async (cDto: CreateGameDto) => {
        if (this.lobby === undefined) throw new Error("Game cannot be created without a lobby")
        if (this.players.length < 2) throw new Error("You need to be at least to players to start a game")
        const response = await lobbyService.startGame(cDto);
        let gameId = response.data
        await this.hubConnection!.invoke('StartGame', this.lobby.id, gameId)
        return response.data
    }

    @action
    startFFA = async (cDto: CreateGameDto) => {
        if (this.lobby === undefined) throw new Error("Game cannot be created without a lobby")
        const response = await lobbyService.startFFA(cDto);
        let gameId = response.data
        await this.hubConnection!.invoke('StartGame', this.lobby.id, gameId)
        return response.data
    }

    @action
    startShared = async (cDto: CreateGameDto) => {
        if (this.lobby === undefined) throw new Error("Game cannot be created without a lobby")
        const response = await lobbyService.startShared(cDto);
        let gameId = response.data
        await this.hubConnection!.invoke('StartGame', this.lobby.id, gameId)
        return response.data
    }

    @action
    changeLobbyTitle = async (title: string) => {
        if (this.lobby === undefined) throw new Error("Cannot update lobby title without a lobby")
        await this.hubConnection!.invoke('ChangeLobbyTitle', this.lobby.id, title)
    }

}