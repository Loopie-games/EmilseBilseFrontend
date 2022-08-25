import { observable, makeAutoObservable, runInAction, toJS, action, observe, when } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { GameRoom, Lobby, CloseLobbyDto, LeaveLobbyDto, StartGameDto } from "../models/game/gameInterfaces";
import { SimpleUserDTO, UserDTO } from "../models/user/userInterface";
import { useNavigate } from 'react-router-dom';
import { pendingPlayerDto } from "../models/player/playerInterface";
import boardService from "../services/boardService";
import gameService from "../services/gameService";
import { BoardTileDTO } from "../models/tile/tileInterface";
import colorLookupService from "../services/colorLookupService";

export default class GameStore {

    @observable gameRoom: GameRoom | undefined;
    @observable lobby: Lobby | undefined;
    @observable tiles: BoardTileDTO[] = [];
    @observable players: SimpleUserDTO[] = [{ id: '0', username: 'Test', nickname: 'Hovedskovasddasdas', color: '#000000' }];
    @observable lobbyPlayers: pendingPlayerDto[] = [];
    @observable gameId: string | undefined;
    hubConnection: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_GAME_SOCKET !== undefined ? process.env.REACT_APP_GAME_SOCKET : "http://localhost:5121/", { accessTokenFactory: () => localStorage.getItem("token")!.toString() })
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

        this.hubConnection.on('lobbyPlayerListUpdate', (players: pendingPlayerDto[]) => {
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
        return;
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => { });
    }

    createLobby = async (userId: string, func: Function) => {
        this.hubConnection?.invoke('CreateLobby', userId);
        this.hubConnection?.on('receiveLobby', async (lobby) => {
            runInAction(async () => {
                this.lobby = await lobby;
                func()
            });
        });
    }

    startGame = async (sg: StartGameDto, callBack: Function) => {
        this.hubConnection?.invoke('StartGame', sg)
        await this.gameStarting(callBack);
        return
    }

    joinLobby = async (userId: string, lobbyPin: string, lobbyrecieved: Function) => {
        this.hubConnection?.invoke('JoinLobby', lobbyPin)
        this.hubConnection?.on('receiveLobby', async (lobby: Lobby) => {
            this.lobby = await lobby;
            lobbyrecieved();
        });
    }

    gameStarting = async (gameStarting: Function) => {
        this.hubConnection?.on('gameStarting', async (gameId: string) => {
            runInAction(async () => {
                this.gameId = await gameId;
                gameStarting()
                return
            })
        })
        return
    }

    closeLobby = async (lobbyId: string, hostId: string) => {
        let cl: CloseLobbyDto = { lobbyID: lobbyId, hostID: hostId }
        this.hubConnection?.invoke('CloseLobby', cl)
    }

    kickPlayer = async (userId: string) => {
        console.log(userId);
    }

    leaveLobby = async (lobbyId: string, userId: string) => {
        let ll: LeaveLobbyDto = { lobbyID: lobbyId, userID: userId }
        this.hubConnection?.invoke('LeaveLobby', ll)
    }

    @action
    getByBoardId = async (boardId: string) => {
        const response = await boardService.getByBoardId(boardId)
        this.tiles = await response.data
        return response.data;
    }
    @action
    getBoardByGameId = async () => {
        const response = await boardService.getBoard(this.gameId!)
        this.tiles = await response.data
        return response.data;
    }

    @action
    getPlayers = async () => {
        const response = await gameService.getPlayers(this.gameId!);
        this.players = await response.data
        this.players.forEach(async (player) => {
            player.color = colorLookupService.generateRandomAppropriateColor();
        });
        return response.data
    }
}
