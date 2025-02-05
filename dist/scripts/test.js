import { exit } from "process";
import { readTerminal, writeTerminal } from "../tools/terminal.js";
import { createMenu } from "../index.js";
const menu = createMenu({
    colorTitle: 'white',
    bgColorOption: '',
    colorOption: 'white',
    bgColorOptionHover: 'bgYellow',
    colorOptionHover: 'black',
});
const [option, , value] = await menu
    .head("[green]Este es el encabezado del menu en verde[/green]")
    .input(" 1 - Saludo", { clickable: true, defaultSelection: true })
    .item(" 2 - Potencia.")
    .bool(" 3 - Toggle Test", { clickable: true, value: ["[green]Si[/green]", "[red]No[/red]"] })
    .select(" 4 - Prueba select", { clickable: true, value: ["Opcion 1", "Opcion 2", "Opcion 3", "Opcion 4", "Opcion 5"] })
    .number(" 5 - Ingresa tu edad", {
    value: 5,
    step: 0.5,
    min: 0,
    max: 10
})
    .item(" 6 - Salir.")
    .render();
if (option === 0) {
    console.log(`Hola mundo!${value ? ' en especial a ' + value : ''}`);
}
else if (option === 1) {
    const base = parseInt(await readTerminal("Ingrese la [red]base[/red]: "));
    const exponente = parseInt(await readTerminal("Ingrese el [green]exponente[/green]: "));
    await writeTerminal(`El resultado de [red]${base}[/red]^[green]${exponente}[/green] es: ${Math.pow(base, exponente)}`);
}
else if (option === 2) {
    await writeTerminal(`Bool! ${value}`);
}
else if (option === 3) {
    console.log("Opcion seleccionada: ", value.slice(1)[value[0]]);
}
else {
    console.log('Bye');
}
exit(0);
