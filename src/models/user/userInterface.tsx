export interface UserDTO {
    id: string
    username: string
    nickname: string
    profilePicture?: string
}

export interface CreateUserDTO{
    username: string
    password: string
    salt: string
    nickname: string
}

export interface LoginDTO{
    username: string
    password: string
}

export interface LoginResponseDTO{
    isValid: boolean
    userId: string
}