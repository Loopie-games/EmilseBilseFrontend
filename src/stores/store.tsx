
import React, {createContext, useContext} from "react";
import { AuthStore } from "./authStore";
import { UserStore } from "./userStore";

type Store = {
    authStore: AuthStore,
    userStore: UserStore
}

export const store: Store = {
    authStore: new AuthStore(),
    userStore: new UserStore(),
};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
    return useContext(StoreContext);
}