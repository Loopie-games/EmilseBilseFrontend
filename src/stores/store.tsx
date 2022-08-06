
import {createContext, useContext} from "react";
import { AuthStore } from "./authStore";
import { FriendshipStore } from "./friendshipStore";
import { TileStore } from "./tileStore";
import { UserStore } from "./userStore";

type Store = {
    authStore: AuthStore,
    userStore: UserStore,
    friendshipStore: FriendshipStore,
    tileStore: TileStore
}

export const store: Store = {
    tileStore: new TileStore(),
    authStore: new AuthStore(),
    userStore: new UserStore(),
    friendshipStore: new FriendshipStore(),
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
    return useContext(StoreContext);
}