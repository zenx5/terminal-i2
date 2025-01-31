declare module 'terminal-i2'

type typeOptionLabel = 0
type typeOptionInput = 1
type typeOptionBool = 2

type typeOptionGeneral = typeOptionLabel | typeOptionInput | typeOptionBool

type typeOption = {
    label: string
    type: typeOptionLabel|typeOptionInput|typeOptionBool
    value?: string|string[]
}