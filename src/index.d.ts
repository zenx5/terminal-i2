declare module 'terminal-i2';

type typeOptionLabel = 0
type typeOptionInput = 1

type typeOption = {
    label: string
    type: typeOptionLabel|typeOptionInput
    value?: string
}