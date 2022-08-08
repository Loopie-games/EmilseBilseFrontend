export interface UserDTO {
    id: string
    username: string
    nickname: string
    profilePicture?: string
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
    isValid: boolean
    userId: string
}