import { typeOptionBool, typeOptionInput, typeOptionLabel, typeOptionNumber, typeOptionSelect } from "./index.d"

export const KEYS = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
    RETURN: "return",
    BACKSPACE: 'backspace'
}

export const TYPE_OPTION = {
    LABEL: 0 as typeOptionLabel,
    INPUT: 1 as typeOptionInput,
    BOOL: 2 as typeOptionBool,
    SELECT: 3 as typeOptionSelect,
    NUMBER: 4 as typeOptionNumber
}