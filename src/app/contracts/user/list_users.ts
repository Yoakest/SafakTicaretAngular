export class ListUsers {
    userId: string
    email: string
    userName: string
    nameSurname: string
    twoFactorEneble: boolean
}

export class GetUsers {
    users: ListUsers[]
    totalUsersCount: number
}