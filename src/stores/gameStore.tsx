import {observable, makeAutoObservable, runInAction, toJS, action, observe, when} from "mobx";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {
    CloseLobbyDto,
    GameDTO,
    GameNameChangeDto,
    LeaveLobbyDto,
    Lobby,
    StartGameDto,
    TopPlayer
} from "../models/game/gameInterfaces";
import {SimplePlayerDTO, SimpleUserDTO, UserDTO} from "../models/user/userInterface";
import {useNavigate} from 'react-router-dom';
import {pendingPlayerDto} from "../models/player/playerInterface";
import boardService from "../services/boardService";
import gameService from "../services/gameService";
import {BoardDTO, BoardTileDTO} from "../models/tile/tileInterface";
import colorLookupService from "../services/colorLookupService";
import TopPlayerService from "../services/topPlayerService";

export default class GameStore {
    @observable tiles: BoardTileDTO[] = [];
    @observable players: SimpleUserDTO[] = [];
    @observable game: GameDTO | undefined;
    @observable board: BoardDTO | undefined;
    @observable topRanked: TopPlayer[] = [];
    @observable boardFilled: boolean = false;
    hubConnection: HubConnection | null = null;
    testhashmap = new Map<string, string>();

    constructor() {
        makeAutoObservable(this);
    }

    private createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_GAME_SOCKET !== undefined ? process.env.REACT_APP_GAME_SOCKET : "http://localhost:5121/", {accessTokenFactory: () => localStorage.getItem("token")!.toString()})
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        await this.hubConnection.start()

        this.hubConnection.on('gameConnected', async (board: BoardDTO) => {
            runInAction(async () => {
                this.board = board;
                this.tiles = await this.getByBoardId(board.id);
                this.players = await this.getPlayers()
                return
            })
        });
        this.hubConnection.on('updateGame', async (game: GameDTO) => {
            runInAction(async () => {
                this.game = game
            })
        });
        this.hubConnection.on('winnerClaimed', async (board: BoardDTO) => {
            runInAction(async () => {
                //Todo show host winner board
                //this.board = board;
            })
        });
        this.hubConnection?.on('TileTurned', async (boardTile: BoardTileDTO) => {
            runInAction(async () => {
                this.tiles.find((t: BoardTileDTO) => t.id === boardTile.id)!.ActivatedBy = boardTile.ActivatedBy
            })
        })
        this.hubConnection?.on('boardFilled', async (boardId: string) => {
            runInAction(async () => {
                this.boardFilled = true
            })
        })
        return;
    }

    stopConnection = async () => {
        await this.hubConnection?.stop()
        return
    }

    connectToGame = async (gameId: string) => {
        this.game = await this.getGame(gameId);
        await this.createHubConnection()
        await this.hubConnection?.invoke('ConnectToGame', gameId)
        return
    }

    turnTile = async (boardtileId: string) => {
        this.hubConnection?.invoke('TurnTile', boardtileId)
    }

    claimWin = async () => {
        this.hubConnection?.invoke('ClaimWin', this.board!.id)
        return
    }

    confirmWin = async () => {
        this.hubConnection?.invoke('ConfirmWin', this.game!.id)
        return
    }

    denyWin = async () => {
        this.hubConnection?.invoke('DenyWin', this.game!.id)
        return
    }

    @action
    getByBoardId = async (boardId: string) => {
        const response = await boardService.getByBoardId(boardId)
        return response.data;
    }

    @action
    getPlayers = async () => {
        const response = await gameService.getPlayers(this.game!.id);
        return response.data
    }

    @action
    updateGameName = async (gn: GameNameChangeDto) => {
        const response = await gameService.setName(gn);
        return response.data
    }

    @action
    deleteGame = async (gameId: string) => {
        const response = await gameService.delete(gameId);
        return response.data
    }

    @action
    getGame = async (gameId: string) => {
        const response = await gameService.getById(gameId);
        return response.data
    }

    @action
    getTop3 = async (gameId: string) => {
        const response = await TopPlayerService.getTop3(gameId);
        this.topRanked = response.data
        return response.data
    }

    @action
    getEnded = async () => {
        const response = await gameService.getEndedGames();
        return response.data
    }

    @action
    getSaved = async () =>{
        const response = await gameService.getSavedGames();
        return response.data
    }

}
