
import { createContext, useContext } from "react";
import { AuthStore } from "./authStore";
import { FriendshipStore } from "./friendshipStore";
import GameStore from "./gameStore";
import { MobileStore } from "./mobileStore";
import { PopupStore } from "./popupStore";
import { TileStore } from "./tileStore";
import { UserStore } from "./userStore";

type Store = {
    authStore: AuthStore,
    userStore: UserStore,
    friendshipStore: FriendshipStore,
    tileStore: TileStore,
    gameStore: GameStore,
    popupStore: PopupStore,
    mobileStore: MobileStore
}

export const store: Store = {
    tileStore: new TileStore(),
    authStore: new AuthStore(),
    userStore: new UserStore(),
    friendshipStore: new FriendshipStore(),
    gameStore: new GameStore(),
    popupStore: new PopupStore(),
    mobileStore: new MobileStore()
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
    return useContext(StoreContext);
}