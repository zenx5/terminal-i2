import { exit } from "process";
import { createDialog } from "../index";

const dialog = createDialog({ title:"Saludo", description:`Hola mundo! en especial a Octavio` })
const { key, onAction } = await dialog
    .action({ key: 'key__ok', label: 'OK', onAction: () => console.log('hola ok') } )
    .action({ key: 'key_cancel', label: 'Cancel', onAction: () => console.log('hola cancel') })
    .action({ key: 'key__info', label: 'Info', onAction: () => console.log('hola info') })
    .action({ key: 'key__share', label: 'Share', onAction: () => console.log('hola share') })
    .moveTo(20, 2)
    .render()

console.log( `key selected is ${key}` )
onAction()

exit(0)