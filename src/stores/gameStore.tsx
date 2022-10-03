import {observable, makeAutoObservable, runInAction, toJS, action, observe, when} from "mobx";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {CloseLobbyDto, GameDTO, LeaveLobbyDto, Lobby, StartGameDto, TopPlayer} from "../models/game/gameInterfaces";
import {SimplePlayerDTO, SimpleUserDTO, UserDTO} from "../models/user/userInterface";
import {useNavigate} from 'react-router-dom';
import {pendingPlayerDto} from "../models/player/playerInterface";
import boardService from "../services/boardService";
import gameService from "../services/gameService";
import {BoardDTO, BoardTileDTO} from "../models/tile/tileInterface";
import colorLookupService from "../services/colorLookupService";
import {POPUP_STATES} from "../components/shared/popups/popup";
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

    /**
     * @Description Creates the socket connection to the game and handles the respones it gets from the server
     * @returns out of the function
     */
    private createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_GAME_SOCKET !== undefined ? process.env.REACT_APP_GAME_SOCKET : "http://localhost:5121/", {accessTokenFactory: () => localStorage.getItem("token")!.toString()})
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        await this.hubConnection.start()
            .then(result => console.log("connected game"))
            .catch(error => {
                console.log(error)
            });

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
                this.tiles.find((t: BoardTileDTO) => t.id === boardTile.id)!.isActivated = boardTile.isActivated
            })
        })
        this.hubConnection?.on('boardFilled', async (boardId: string) => {
            runInAction(async () => {
                this.boardFilled = true
            })
        })
        return;
    }

    /**
     * @Description Stops the socket connection to the game
     */
    stopConnection = async () => {
        await this.hubConnection?.stop()
        return
    }

    /**
     * @Description Create a hub connection and invoke the connectToGame method on the server
     * @param gameId the id of the game
     */
    connectToGame = async (gameId: string) => {
        this.game = await this.getGame(gameId);
        await this.createHubConnection()
        await this.hubConnection?.invoke('ConnectToGame', gameId)
        return
    }

    /**
     * @Description Invoke turnTile on the server, whenever a tile is clicked
     * @param boardtileId the id of the tile
     */
    turnTile = async (boardtileId: string) => {
        this.hubConnection?.invoke('TurnTile', boardtileId)
    }

    /**
     * @Description Invoke ClaimWin on the server, whenever a player has filled out the board and confirmed the popup
     * @returns out of the function
     */
    claimWin = async () => {
        this.hubConnection?.invoke('ClaimWin', this.board!.id)
        return
    }

    /**
     * @Description Invoke ConfirmWin on the server, whenever the host has confirmed the claimed win
     * @returns out of the function
     */
    confirmWin = async () => {
        this.hubConnection?.invoke('ConfirmWin', this.game!.id)
        return
    }

    /**
     * @Description Invoke DenyWin on the server, whenever the host has denied the claimed win
     * @returns out of the function
     */
    denyWin = async () => {
        this.hubConnection?.invoke('DenyWin', this.game!.id)
        return
    }

    /**
     * @Description Invoke LeaveLobby on the server, whenever a player leaves the lobby
     * @param boardId the id of the board
     * @returns out of the function
     */
    @action
    getByBoardId = async (boardId: string) => {
        const response = await boardService.getByBoardId(boardId)
        response.data.forEach(async (tile) => {
            if (!this.testhashmap.has(tile.aboutUser.id)) {
                tile.aboutUser.color = colorLookupService.lookupColor(tile.position)
                this.testhashmap.set(tile.aboutUser.id, tile.aboutUser.color)
            } else {
                tile.aboutUser.color = this.testhashmap.get(tile.aboutUser.id)
            }
        })
        return response.data;
    }

    /**
     * @Description Gets the players of the game
     * @returns the players of the game
     */
    @action
    getPlayers = async () => {
        const response = await gameService.getPlayers(this.game!.id);
        return response.data
    }

    /**
     * @Description Gets the game by id
     * @param gameId the id of the game
     * @returns the game
     */
    @action
    getGame = async (gameId: string) => {
        const response = await gameService.getById(gameId);
        return response.data
    }

    /**
     * @Description Gets the top ranked players
     * @param gameId the id of the game
     * @returns the top ranked players
     */
    @action
    getTop3 = async (gameId: string) => {
        const response = await TopPlayerService.getTop3(gameId);
        this.topRanked = response.data
        return response.data
    }

    /**
     * @Description get the ended games
     */
    @action
    getEnded = async () => {
        const response = await gameService.getEndedGames();
        return response.data
    }

}
