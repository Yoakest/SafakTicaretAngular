export class AuthorizeMenu {
    name: string
    actions: {
        actionType: string
        httpType: string
        definition: string
        code: string
    }[]
}

export class Action {
    actionType: string
    httpType: string
    definition: string
    code: string
}