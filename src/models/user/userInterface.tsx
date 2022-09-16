export interface UserDTO {
    id: string
    username: string
    nickname: string
    profilePicture?: string
}

export interface SimpleUserDTO {
    id: string
    username: string
    nickname: string
    profilePicUrl?: string
}

export interface admin extends SimpleUserDTO{
    adminId: string
    id: string
    username: string
    nickname: string
    profilePicUrl?: string
}

export interface SimplePlayerDTO extends SimpleUserDTO {
    color?: string
    id: string
    username: string
    nickname: string
    profilePicUrl?: string
}

export interface CreateUserDTO {
    userName: string
    nickName: string
    password: string
    salt: string
    profilePicUrl?: string
}

export interface LoginDTO {
    username: string
    password: string
}

export interface LoginResponseDTO {
    jwt: string
    uuid: string
}