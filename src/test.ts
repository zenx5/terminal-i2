import { exit } from "process";
import { readTerminal, writeTerminal } from "./terminal";
import createMenu from "./menu";

const menu = createMenu({
    colorTitle: 'white',
    bgColorOption: '',
    colorOption: 'white',
    bgColorOptionHover: 'bgYellow',
    colorOptionHover: 'black',
})
const [option, value] = await menu
    .head("Este es el encabezado del menu en verde")
    .item(" 1 - Saludo:_", true)
    .item(" 2 - Potencia.")
    .item(" 3 - Salir.")
    .renderInput()

if( option===1) {
    console.log(`Hola mundo!${value ? ' en especial a '+value  : ''}`)
}
else if( option===2) {
    const base = parseInt(await readTerminal("Ingrese la [red]base[/red]: ") as string)
    const exponente = parseInt(await readTerminal("Ingrese el [green]exponente[/green]: ") as string)
    await writeTerminal(`El resultado de [red]${base}[/red]^[green]${exponente}[/green] es: ${Math.pow(base, exponente)}`)
}
else if( option===3) {
    console.log("Adios!")
}
exit(0)
