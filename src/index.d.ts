declare module 'terminal-i2'

export type typeOptionCustom = 0
export type typeOptionLabel = 1
export type typeOptionInput = 2
export type typeOptionBool = 3
export type typeOptionSelect = 4
export type typeOptionNumber = 5

export type typeOptionGeneral = typeOptionCustom | typeOptionLabel | typeOptionInput | typeOptionBool | typeOptionSelect | typeOptionNumber

export type typeOption = {
    label: string
    type: typeOptionGeneral
    value?: any
    name?: string
    defaultSelection?: boolean
    clickable?: boolean
    compat?: boolean
}

export type RenderFunction = (option:typeOption) => string
export type ActionFunction = (option:typeOption, key:string) => typeOption

export type typeCustomOption = {
    name: string
    render: RenderFunction
    action: ActionFunction
}