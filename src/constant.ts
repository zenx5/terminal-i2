import { typeOptionCustom, typeOptionBool, typeOptionInput, typeOptionLabel, typeOptionNumber, typeOptionSelect } from "./index.d"

export const KEYS = {
    UP: "up",
    DOWN: "down",
    LEFT: "left",
    RIGHT: "right",
    RETURN: "return",
    BACKSPACE: 'backspace'
}

export const TYPE_OPTION = {
    CUSTOM: 0 as typeOptionCustom,
    LABEL: 1 as typeOptionLabel,
    INPUT: 2 as typeOptionInput,
    BOOL: 3 as typeOptionBool,
    SELECT: 4 as typeOptionSelect,
    NUMBER: 5 as typeOptionNumber
}