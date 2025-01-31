declare module 'terminal-i2'

export type typeOptionLabel = 0
export type typeOptionInput = 1
export type typeOptionBool = 2
export type typeOptionSelect = 3

export type typeOptionGeneral = typeOptionLabel | typeOptionInput | typeOptionBool | typeOptionSelect

export type typeOption = {
    label: string
    type: typeOptionGeneral
    value?: any
}