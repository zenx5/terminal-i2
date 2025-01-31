declare module 'terminal-i2'

export type typeOptionLabel = 0
export type typeOptionInput = 1
export type typeOptionBool = 2
export type typeOptionSelect = 3
export type typeOptionNumber = 4

export type typeOptionGeneral = typeOptionLabel | typeOptionInput | typeOptionBool | typeOptionSelect | typeOptionNumber

export type typeOption = {
    label: string
    type: typeOptionGeneral
    value?: any
}