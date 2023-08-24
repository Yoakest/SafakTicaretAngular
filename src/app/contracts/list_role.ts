export class ListRole {
    id: string
    name: string
}

export class ListRoleSelect {
    id: string
    name: string
    endpoint: string
    selected?: boolean = false
}

export class ListRoleAll {
    datas: ListRoleSelect[]
    totalCount: number
}
