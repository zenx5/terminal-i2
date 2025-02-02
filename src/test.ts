import { exit } from "process";
import { readTerminal, writeTerminal } from "./terminal";
import { createDialog, createMenu } from "./index";

const dialog = createDialog({ title:"Saludo", description:`Hola mundo! en especial a Octavio` })
dialog.render()
exit(0)

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
    .select(" 4 - Prueba select", ["Opcion 1", "Opcion 2", "Opcion 3", "Opcion 4", "Opcion 5"])
    .number(" 5 - Ingresa tu edad", {
        value:5,
        step: 0.5,
        min: 0,
        max:10
    })
    .item(" 6 - Salir.")
    .render()

if( option===1) {
    const dialog = createDialog({ title:"Saludo", description:`Hola mundo!${value ? ' en especial a '+value  : ''}` })
    dialog.render()
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
    console.log("Select: ", value.slice(1)[value[0]])
}
else if( option===5) {
    console.log("Edad: ", value.value)
}
else if( option===6) {
    console.log("Adios! ", value)
}
exit(0)
