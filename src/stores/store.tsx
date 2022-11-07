
import { createContext, useContext } from "react";
import { AuthStore } from "./authStore";
import { FriendshipStore } from "./friendshipStore";
import GameStore from "./gameStore";
import LobbyStore from "./lobbyStore";
import { MobileStore } from "./mobileStore";
import { PopupStore } from "./popupStore";
import { StripeStore } from "./stripeStore";
import { ThemeStore } from "./themeStore";
import { TileStore } from "./tileStore";
import { UserStore } from "./userStore";
import {gameModeStore} from "./gameModeStore";

type Store = {
    authStore: AuthStore,
    userStore: UserStore,
    friendshipStore: FriendshipStore,
    tileStore: TileStore,
    gameStore: GameStore,
    popupStore: PopupStore,
    mobileStore: MobileStore,
    themeStore: ThemeStore,
    stripeStore: StripeStore,
    lobbyStore: LobbyStore,
    gameModeStore: gameModeStore
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
    stripeStore: new StripeStore(),
    lobbyStore: new LobbyStore(),
    gameModeStore: new gameModeStore()
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
    return useContext(StoreContext);
}