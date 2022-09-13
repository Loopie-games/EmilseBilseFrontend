
import { createContext, useContext } from "react";
import { AuthStore } from "./authStore";
import { FriendshipStore } from "./friendshipStore";
import GameStore from "./gameStore";
import LobbyStore from "./lobbyStore";
import { MobileStore } from "./mobileStore";
import { PopupStore } from "./popupStore";
import { ThemeStore } from "./themeStore";
import { TileStore } from "./tileStore";
import { UserStore } from "./userStore";

type Store = {
    authStore: AuthStore,
    userStore: UserStore,
    friendshipStore: FriendshipStore,
    tileStore: TileStore,
    gameStore: GameStore,
    popupStore: PopupStore,
    mobileStore: MobileStore,
    themeStore: ThemeStore,
    lobbyStore: LobbyStore
}

export const store: Store = {
    tileStore: new TileStore(),
    authStore: new AuthStore(),
    userStore: new UserStore(),
    friendshipStore: new FriendshipStore(),
    gameStore: new GameStore(),
    popupStore: new PopupStore(),
    mobileStore: new MobileStore(),
    themeStore: new ThemeStore(),
    lobbyStore: new LobbyStore()
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
    return useContext(StoreContext);
}