import { SimpleUserDTO } from "../user/userInterface";

export interface Friend {
    id?: string
    user: SimpleUserDTO
    isAccepted: boolean
}