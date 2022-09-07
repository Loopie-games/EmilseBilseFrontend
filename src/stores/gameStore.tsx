import { observable, makeAutoObservable, runInAction, toJS, action, observe, when } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { CloseLobbyDto, GameDTO, LeaveLobbyDto, Lobby, StartGameDto } from "../models/game/gameInterfaces";
import { SimplePlayerDTO, SimpleUserDTO, UserDTO } from "../models/user/userInterface";
import { useNavigate } from 'react-router-dom';
import { pendingPlayerDto } from "../models/player/playerInterface";
import boardService from "../services/boardService";
import gameService from "../services/gameService";
import {BoardDTO, BoardTileDTO } from "../models/tile/tileInterface";
import colorLookupService from "../services/colorLookupService";
import {POPUP_STATES} from "../components/shared/popups/popup";

export default class GameStore {
    @observable lobby: Lobby | undefined
    @observable tiles: BoardTileDTO[] = [];
    @observable players: SimpleUserDTO[] = [];
    @observable lobbyPlayers: pendingPlayerDto[] = [];
    @observable gameId: string | undefined;
    @observable game: GameDTO| undefined;
    @observable winner: SimpleUserDTO | undefined;
    hubConnection: HubConnection | null = null;
    testhashmap = new Map<string, string>();


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

        this.hubConnection.on('lobbyPlayerListUpdate', (players: pendingPlayerDto[]) => {
            runInAction(() => {
                this.lobbyPlayers = players;
            });
        })

        

        return;
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(error => { });
    }

    createLobby = async (func: Function) => {
        this.hubConnection?.on('receiveLobby', async (lobby) => {
            runInAction(async () => {
                this.lobby = await lobby;
                func()
            });
        });
        this.hubConnection?.invoke('CreateLobby');
    }

    startGame = async (lobbyId: string, callBack: Function) => {
        this.hubConnection?.invoke('StartGame', lobbyId);
        await this.gameStarting(callBack);
        return
    }

    connectToGame = async (gameId: string, callback: Function) => {
        this.hubConnection?.on('gameConnected', async (boardId: string) => {
            runInAction(async () => {
                this.game = await this.getGame(gameId);
                await this.getBoardByGameId();
                await this.getPlayers()
                await callback(boardId)
                return
            })
        });
        await this.hubConnection?.invoke('ConnectToGame', gameId)
    }

    listenWinnerClaimed = async(callback: Function) =>{
        this.hubConnection?.on('winnerClaimed', async (board: BoardDTO) => {
            runInAction(async () => {
                await callback(board)
            })
        });
    }

    listenWinnerFound = async(callback:Function) =>{
        this.hubConnection?.on('winnerFound', async (board: BoardDTO) => {
            runInAction(async () => {
                await callback(board)
            })
        });
    }

    listenGamePaused = async(callback:Function)=>{
        this.hubConnection?.on('pauseGame', async (board: BoardDTO) => {
            runInAction(async () => {
                await callback(board)
            })
        });
    }

    joinLobby = async (userId: string, lobbyPin: string, lobbyrecieved: Function) => {
        this.hubConnection?.on('receiveLobby', async (lobby: Lobby) => {
            this.lobby = lobby;
            lobbyrecieved();
        });
        this.hubConnection?.invoke('JoinLobby', lobbyPin)
    }

    lobbyClosing = async (callback: Function) => {
        this.hubConnection?.on('lobbyClosed', async () => {
            runInAction(async () => {
                await callback()
                this.lobbyPlayers = [];
                this.lobby = undefined;
                this.hubConnection?.stop();
                return
            });
        });
    }

    gameStarting = async (gameStarting: Function) => {
        this.hubConnection?.on('gameStarting', async (gameId: string) => {
            runInAction(async () => {
                this.gameId = gameId;
                gameStarting()
                return
            })
        })
        return
    }

    turnTile = async (boardtileId: string, tileTurned: Function) => {
        this.hubConnection?.on('TileTurned', async (boardTile: BoardTileDTO) => {
            runInAction(async () => {
                this.tiles.find((t: BoardTileDTO) => t.id === boardTile.id)!.isActivated = boardTile.isActivated
                tileTurned()
            })
        })
        this.hubConnection?.on('boardFilled', async (boardId: string) => {
            runInAction(async () => {
                tileTurned(POPUP_STATES.winClaim)
            })
        })
        this.hubConnection?.invoke('TurnTile', boardtileId)
    }

    claimWin = async (boardId:string) => {
        this.hubConnection?.invoke('ClaimWin', boardId)
        return
    }

    confirmWin = async (boardId:string) => {
        this.hubConnection?.invoke('ConfirmWin', boardId)
        return
    }

    closeLobby = async (lobbyId: string) => {
        this.hubConnection?.invoke('CloseLobby', lobbyId)
    }

    kickPlayer = async (userId: string) => {
        console.log(userId);
    }

    leaveLobby = async (lobbyId: string) => {
        this.hubConnection?.invoke('LeaveLobby', lobbyId)
        this.lobby = undefined
        this.hubConnection?.stop();
    }

    @action
    getByBoardId = async (boardId: string) => {
        const response = await boardService.getByBoardId(boardId)
        this.tiles = response.data
        return response.data;
    }
    @action
    getBoardByGameId = async () => {
        const response = await boardService.getBoard(this.gameId!)
        this.tiles = response.data;
        this.tiles.forEach(async (tile) => {
            if (!this.testhashmap.has(tile.aboutUser.id)) {
                tile.aboutUser.color = colorLookupService.lookupColor(tile.position)
                this.testhashmap.set(tile.aboutUser.id, tile.aboutUser.color)
            } else {
                tile.aboutUser.color = this.testhashmap.get(tile.aboutUser.id)
            }

        })
        return response.data;
    }

    @action
    getPlayers = async () => {
        const response = await gameService.getPlayers(this.gameId!);
        this.players = response.data

        return response.data
    }

    @action
    getGame = async (gameId: string) =>{
        const response = await gameService.getById(gameId);
        return response.data
    }


}
