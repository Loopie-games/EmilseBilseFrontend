import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { runInAction } from "mobx";

export default class LobbyStore{
    hubConnection: HubConnection | null = null;

    createHubConnection = async () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(process.env.REACT_APP_LOBBY_SOCKET !== undefined ? process.env.REACT_APP_LOBBY_SOCKET : "http://localhost:5121/", { accessTokenFactory: () => localStorage.getItem("token")!.toString() })
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

}