
import React, {createContext, useContext} from "react";

type Store = {

}

export const store: Store = {

};

export const StoreContext = createContext<Store>({} as Store);

export function useStore() {
    return useContext(StoreContext);
}