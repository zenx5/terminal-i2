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
    .head("[green]Este es el encabezado del menu en verde[/green]")
    .input(" 1 - Saludo", true)
    .item(" 2 - Potencia.")
    .bool(" 3 - Toggle Test", ["[green]Si[/green]", "[red]No[/red]"])
    .item(" 4 - Salir.")
    .render()

if( option===1) {
    console.log(`Hola mundo!${value ? ' en especial a '+value  : ''}`)
}
else if( option===2) {
    const base = parseInt(await readTerminal("Ingrese la [red]base[/red]: ") as string)
    const exponente = parseInt(await readTerminal("Ingrese el [green]exponente[/green]: ") as string)
    await writeTerminal(`El resultado de [red]${base}[/red]^[green]${exponente}[/green] es: ${Math.pow(base, exponente)}`)
}
else if( option===3) {
    await writeTerminal(`Bool! ${value}`)
}
else if( option===4) {
    console.log("Adios!")
}
exit(0)
