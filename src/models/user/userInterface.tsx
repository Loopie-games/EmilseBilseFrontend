export interface UserDTO {
    id: string
    username: string
    nickname: string
}

export interface CreateUserDTO{
    username: string
    password: string
    nickname: string
}